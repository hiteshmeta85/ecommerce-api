import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CartItem from 'App/Models/CartItem'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import Order from 'App/Models/Order'
import Status from 'Contracts/Enums/Status'
import Address from 'App/Models/Address'

export default class OrdersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const trx = await Database.transaction()

    try {
      const addressId = request.input('address_id')

      const address = await Address.query({ client: trx })
        .where({ id: addressId, userId: auth.use('api').user!.id })
        .firstOrFail()

      // get cart items
      const cartItems = await CartItem.query({ client: trx }).where({
        userId: auth.use('api').user!.id,
      })

      // add cart items to order
      const order = await Order.createMany(
        cartItems.map((cartItem) => {
          return {
            userId: cartItem.userId,
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            status: Status.PENDING,
            address: address.address,
          }
        }),
        { client: trx }
      )

      // update product quantity
      cartItems.map(async (cartItem: CartItem) => {
        const product = await Product.findOrFail(cartItem.productId, { client: trx })

        if (product.quantity < cartItem.quantity) {
          throw new Error('Not enough quantity')
        }

        await Product.query({ client: trx })
          .where('id', cartItem.productId)
          .update({ quantity: product.quantity - cartItem.quantity })
      })

      // delete cart items
      await CartItem.query({ client: trx })
        .where({ userId: auth.use('api').user!.id })
        .delete()

      await trx.commit()
      return response.send({ data: order, message: 'Order Placed' })
    } catch (error) {
      await trx.rollback()
      return response.send({ data: null, message: 'Update Failed' })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

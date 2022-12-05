import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Status from 'Contracts/Enums/Status'
import CartItem from 'App/Models/CartItem'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'

export default class OrdersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ response, auth }: HttpContextContract) {
    const trx = await Database.transaction()

    try {
      const cartItems = await CartItem.query({ client: trx })
        .where({ userId: auth.use('api').user!.id, status: Status.IDLE })
        .update({ status: Status.SHIPPING })

      cartItems.map(async (cartItem: CartItem) => {
        const product = await Product.findOrFail(cartItem.productId)

        if (product.quantity < cartItem.quantity) {
          throw new Error('Not enough quantity')
        }

        await Product.query({ client: trx })
          .where('id', cartItem.productId)
          .update({ quantity: product.quantity - cartItem.quantity })
      })

      await trx.commit()
      return response.send({ data: cartItems, message: 'Order Placed' })
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

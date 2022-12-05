import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CartItem from 'App/Models/CartItem'
import Product from 'App/Models/Product'
import Status from 'Contracts/Enums/Status'

export default class CartItemsController {
  public async index({ response, auth }: HttpContextContract) {
    const cartItems = await CartItem.query()
      .where({ userId: auth.use('api').user!.id, status: Status.IDLE })
      .preload('product')

    return response.send({ data: cartItems, message: 'Cart items' })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const product = await Product.find(request.input('product_id'))

    if (request.input('quantity') <= product!.quantity) {
      const cartItem = await CartItem.updateOrCreate(
        {
          userId: auth.use('api').user!.id,
          productId: request.input('product_id'),
        },
        {
          quantity: request.input('quantity'),
        }
      )

      return response.send({ data: cartItem, message: 'Cart updated' })
    } else {
      return response.send({ data: null, message: 'Not enough quantity' })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const cartItem = await CartItem.find(request.input('id'))

    if (cartItem!.status !== Status.IDLE) {
      return response.json({ message: 'You can not update this item' })
    }

    const product = await Product.find(request.input('product_id'))

    if (request.input('quantity') <= product!.quantity) {
      const cartItem = await CartItem.query()
        .where({ id: request.input('id') })
        .update({ quantity: request.input('quantity') })
        .returning('*')

      return response.send({ data: cartItem, message: 'Cart item updated' })
    } else {
      return response.send({ data: null, message: 'Not enough quantity' })
    }
  }

  public async destroy({}: HttpContextContract) {}

  public async count({ response, auth }: HttpContextContract) {
    const count = await CartItem.query()
      .count('id')
      .where({ status: 'IDLE', userId: auth.use('api').user!.id })

    return response.send({
      data: parseInt(count[0].$extras.count),
      message: `Cart items count is ${count[0].$extras.count}`,
    })
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CartItem from 'App/Models/CartItem'

export default class CartItemsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ response }: HttpContextContract) {
    const cartItem = await CartItem.createMany([
      {
        quantity: 2,
        productId: 1,
        userId: 1,
      },
      {
        quantity: 2,
        productId: 1,
        userId: 1,
      },
    ])

    return response.json(cartItem)
  }

  public async show({ request, response }: HttpContextContract) {
    const cartItem = await CartItem.query()
      .where('userId', '=', request.param('id'))
      .preload('product')

    return response.json(cartItem)
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

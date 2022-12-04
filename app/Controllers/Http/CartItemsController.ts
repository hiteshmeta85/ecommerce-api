import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CartItem from 'App/Models/CartItem'
import Product from 'App/Models/Product'

export default class CartItemsController {
  public async index({ response, auth }: HttpContextContract) {
    const cartItems = await CartItem.query()
      .where({ userId: auth.use('api').user!.id })
      .preload('product')

    return response.json(cartItems)
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const availableProductQuantity = await Product.find(request.input('product_id'))

    if (request.input('quantity') <= availableProductQuantity!.quantity) {
      const cartItem = await CartItem.create({
        userId: auth.use('api').user!.id,
        productId: request.input('product_id'),
        quantity: request.input('quantity'),
      })

      return response.json(cartItem)
    } else {
      return response.json({ message: 'Not enough quantity' })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const product = await Product.find(request.input('product_id'))

    if (request.input('quantity') <= product!.quantity) {
      await CartItem.query()
        .where('id', request.input('id'))
        .update({ quantity: request.input('quantity') })

      return response.json({ message: 'Cart item updated' })
    } else {
      return response.json({ message: 'Not enough quantity' })
    }
  }

  public async destroy({}: HttpContextContract) {}
}

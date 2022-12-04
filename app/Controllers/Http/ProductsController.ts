import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    const products = await Product.all()

    return response.json(products)
  }

  public async create({}: HttpContextContract) {}

  public async store({ response }: HttpContextContract) {
    const products = await Product.createMany([
      {
        name: 'Product A',
        description: 'Description of Product A',
        price: 23.52,
        quantity: 5,
      },
      {
        name: 'Product B',
        description: 'Description of Product B',
        price: 18.52,
        quantity: 8,
      },
    ])

    return response.json(products)
  }

  public async show({ response }: HttpContextContract) {
    const product = await Product.findBy('id', 1)

    return response.json(product)
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

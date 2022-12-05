import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Status from 'Contracts/Enums/Status'
import CartItem from 'App/Models/CartItem'

export default class OrdersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ auth }: HttpContextContract) {
    await CartItem.query()
      .where({ user_id: auth.use('api').user!.id, status: Status.IDLE })
      .update({ status: Status.SHIPPING })

    return { message: 'Order created' }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ response }: HttpContextContract) {
    const doesUserExits = await User.findBy('username', 'hiteshmeta')

    if (doesUserExits) {
      return response.send({ message: 'user exists' })
    }

    const user = await User.create({
      username: 'hiteshmeta',
      email: 'meta.hitesh@gmail.com',
      password: 'abc@123',
    })

    return response.json(user)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

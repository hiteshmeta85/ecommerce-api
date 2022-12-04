import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'

export default class AddressesController {
  public async index({ response, auth }: HttpContextContract) {
    const addresses = await Address.query().where({ userId: auth.use('api').user!.id })

    return response.json(addresses)
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const address = await Address.create({
      userId: auth.use('api').user!.id,
      address: request.input('address'),
    })

    return response.json(address)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request, response, auth }: HttpContextContract) {
    await Address.query()
      .where({ id: request.param('id'), userId: auth.use('api').user!.id })
      .update({ address: request.input('address') })

    return response.json({ message: 'Address Updated' })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const address = await Address.findOrFail(request.param('id'))
    await address.delete()

    return response.json({ message: 'Address Deleted' })
  }
}

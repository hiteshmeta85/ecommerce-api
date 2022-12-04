import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        username: 'user1',
        email: 'user1@mail.com',
        password: 'secret',
      },
      {
        username: 'user2',
        email: 'user2@mail.com',
        password: 'secret',
      },
    ])
  }
}

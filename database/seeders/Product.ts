import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class extends BaseSeeder {
  public async run() {
    await Product.createMany([
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
      {
        name: 'Product C',
        description: 'Description of Product C',
        price: 1.05,
        quantity: 0,
      },
      {
        name: 'Product D',
        description: 'Description of Product D',
        price: 2,
        quantity: 20,
      },
      {
        name: 'Product E',
        description: 'Description of Product E',
        price: 10,
        quantity: 2,
      },
    ])
  }
}

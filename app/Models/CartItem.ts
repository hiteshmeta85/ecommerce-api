import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from 'App/Models/Product'
import { belongsTo } from '@adonisjs/lucid/build/src/Orm/Decorators'
import User from 'App/Models/User'
import Status from 'Contracts/Enums/Status'

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public status: Status

  @column()
  public productId: number

  @column()
  public userId: number

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}

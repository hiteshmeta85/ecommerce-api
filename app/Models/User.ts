import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import CartItem from 'App/Models/CartItem'
import Address from 'App/Models/Address'
import { beforeSave } from '@adonisjs/lucid/build/src/Orm/Decorators'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({
    serializeAs: null,
  })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => CartItem)
  public cartItems: HasMany<typeof CartItem>

  @hasMany(() => Address)
  public addresses: HasMany<typeof Address>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}

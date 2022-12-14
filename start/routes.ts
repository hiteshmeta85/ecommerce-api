/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for the majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout').middleware('auth')
  Route.get('/validate', 'AuthController.show').middleware('auth')
}).prefix('/auth')
Route.resource('users', 'UsersController')
Route.resource('products', 'ProductsController')
Route.get('cart-items/count', 'CartItemsController.count').middleware('auth')
Route.resource('cart-items', 'CartItemsController').middleware({ '*': ['auth'] })
Route.resource('orders', 'OrdersController').middleware({ '*': ['auth'] })
Route.resource('addresses', 'AddressesController').middleware({ '*': ['auth'] })

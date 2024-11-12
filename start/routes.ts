/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'


//router.get('/','').as('index')

router.get('/login','#controllers/auth_controller.login').as('auth.login').use(middleware.guest())

router.post('/login','#controllers/auth_controller.logUser').use(middleware.guest())

router.post('/logout','#controllers/auth_controller.logOutUser').as('auth.logout').use(middleware.auth())

router.group(()=> {

    router.get('/','#controllers/blog_controller.index').as('index')

    router.post('/upload','#controllers/blog_controller.upload').as('upload')

    router.get('/show/:slug/:post','#controllers/blog_controller.show').where('id', /^[0-9]+$/).as('show')

    router.get('/create','#controllers/blog_controller.create').as('create')

    router.post('/create','#controllers/blog_controller.store').as('create.post')

    router.get('/edit/:post','#controllers/blog_controller.edit').as('edit')

    router.patch('/edit/:post','#controllers/blog_controller.update').as('update')

    router.post('/delete/:post','#controllers/blog_controller.delete').as('delete')


}).as('blog')

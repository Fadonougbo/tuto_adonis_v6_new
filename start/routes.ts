/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'


//router.on('/').render('pages/home').as('home')

router.group(()=> {

    router.get('/','#controllers/blog_controller.index').as('index')

    router.get('/show/:slug/:id','#controllers/blog_controller.show').where('id', /^[0-9]+$/).as('show')

    router.get('/create','#controllers/blog_controller.create').as('create')

    router.post('/create','#controllers/blog_controller.store').as('create.post')

    router.get('/edit/:id','#controllers/blog_controller.edit').as('edit')

    router.post('/edit/:id','#controllers/blog_controller.update').as('update')

    router.post('/delete/:id','#controllers/blog_controller.delete').as('delete')


}).as('blog')

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


    const blogController=()=>import('#controllers/blog_controller');

    router.get('/',[blogController,'index']).as('index')

    router.get('/show/:slug/:id','#controllers/blog_controller.show').where('id', /^[0-9]$/).as('show')

}).as('blog')

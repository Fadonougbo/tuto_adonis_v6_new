import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'
import hash from '@adonisjs/core/services/hash'
import vine from '@vinejs/vine'
import User from '#models/user'
import { loginValidator } from '#validators/login'

export default class AuthController {
  /**
   * Display a list of resource
   */
  async login({view}: HttpContext) {

    return view.render('auth/login')
  }

  /**
   * Display form to create a new record
   */
  async logUser({request,response,session,auth}: HttpContext) {
    
    const {password,email}=await request.validateUsing(loginValidator)

    const user=await User.verifyCredentials(email,password)
    
    await auth.use('web').login(user,true)

    session.regenerate()

    session.flash('success','your are log in')
    
    return response.redirect().toRoute('blog.index')
  }

  /**
   * Handle form submission for the create action
   */
  async logOutUser({ response,auth,session }: HttpContext) {

    await auth.use('web').logout()

    session.regenerate()
    
    return response.redirect().toRoute('blog.index')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
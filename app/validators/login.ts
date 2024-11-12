import { dd } from '@adonisjs/core/services/dumper'
import vine from '@vinejs/vine'
import User from '#models/user'

export const loginValidator = vine.compile(
    vine.object({
     email:vine.string().email().exists(async (db,value,field)=> {

        const emailExist=await User.findBy({email:value})
        //dd([emailExist,emailExist?false:true])
        return emailExist?true:false
     }),
     password:vine.string()
    }).bail(true)
) 


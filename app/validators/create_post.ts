import vine from '@vinejs/vine'
import Post from '#models/post'

export const createPostValidator = vine.compile(
    vine.object({
      title: vine.string().trim().minLength(2),
      slug:vine.string().trim().minLength(2).unique(async (db,value,field)=> {
      
       return await Post.findBy({slug:value})?false:true
       
      }),
      content:vine.string().minLength(2)
    }).bail(true)
)

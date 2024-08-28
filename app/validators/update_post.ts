import vine from '@vinejs/vine'

export const updatePostValidator = vine.compile(
    vine.object({

      title: vine.string().trim().minLength(2),

      slug:vine.string().trim().minLength(2).unique(async (db,value,field)=> {

        const res=await db.from('posts').where('slug',value).andWhereNot('id',field.meta.id);

        return  res.length===0?true:false
       
      }),

      content:vine.string().minLength(2)
      
    }).bail(true)
)
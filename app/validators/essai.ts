import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
    vine.object({
      title: vine.string().trim(),
      slug:vine.string(),
      content:vine.string()
      

    })
  )
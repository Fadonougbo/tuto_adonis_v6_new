import stringHelpers from "@adonisjs/core/helpers/string";
import type { HttpContext } from "@adonisjs/core/http";
import Post from "#models/post";
import { createPostValidator } from "#validators/create_post";

export default class BlogController {

	async index({ view }: HttpContext) {

		

		const posts = await Post.query().paginate(1, 15);

		return view.render("blog/blog", { posts });
	}

	/**
	 * 
	 * @param param0 http_context
	 * @returns 
	 */
	async show({params,view}:HttpContext) {

		
		const post=await Post.findByOrFail({id:params.id});

        return view.render('blog/show',{post})
	}

	/**Create new post form
	 * 
	 * @param param0 http_context
	 * @returns 
	 */
	async create({view,session}:HttpContext) {

		return view.render('blog/create');
	}

	async store({request,response,session}:HttpContext) {

		const {title,content,slug}=await request.validateUsing(createPostValidator,
			{
				meta: {
					slug:request.input('slug')
				}
			}
		)

		const {slug:post_slug,id}=await Post.create({
			content:content,
			slug:stringHelpers.slug(slug,{trim:true}),
			title:title
		})
		
		session.flash('success',"L'element a bien été créé");

		return  response.redirect().toRoute('blog.show',{slug:post_slug,id});
	}
}

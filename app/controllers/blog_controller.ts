import type { HttpContext } from "@adonisjs/core/http";
import Post from "#models/post";

export default class BlogController {



	async index({ view }: HttpContext) {

		const posts = await Post.query().paginate(1, 4);

		return view.render("blog/blog", { posts });
	}

	async show({params,view}:HttpContext) {

		const post=await Post.findByOrFail({id:params.id});

        return view.render('blog/show',{post})
	}
}

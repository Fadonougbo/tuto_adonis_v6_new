import stringHelpers from "@adonisjs/core/helpers/string";
import type { HttpContext } from "@adonisjs/core/http";
import { dd } from "@adonisjs/core/services/dumper";
import Post from "#models/post";
import { createPostValidator } from "#validators/create_post";
import { updatePostValidator } from "#validators/update_post";

export default class BlogController {

	async index({ view,request }: HttpContext) {

		const page=request.input('p1',1);

		const {p1,...rest}=request.qs()

		const posts = (await Post.query().paginate(page, 2)).queryString(rest);
	
		return view.render("blog/blog",{ posts });
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
	async create({view}:HttpContext) {

		const post=new Post()
		return view.render('blog/create',{post});
	}

	async store({request,response,session}:HttpContext) {

		const {title,content,slug}=await request.validateUsing(createPostValidator)

		const {slug:post_slug,id}=await Post.create({
			content:content,
			slug:stringHelpers.slug(slug,{trim:true}),
			title:title
		})
		
		session.flash('success',"L'element a bien été créé");

		return  response.redirect().toRoute('blog.show',{slug:post_slug,id});
	}

	async edit({params,view}:HttpContext) {

		const post=await Post.findByOrFail({id:params.id});

		return view.render('blog/create',{post})
	}

	async update({params,session,response,request}:HttpContext) {

		const post=await Post.findByOrFail({id:params.id});

		const data=await request.validateUsing(updatePostValidator,{
			meta:{id:params.id}
		})

		const {slug,id}=await post.merge(data).save();

		session.flash('success',"Les modifications ont été effectué avec success");

		return response.redirect().toRoute('blog.show',{slug,id})
	}

	async delete({params,session,response}:HttpContext) {

		
		const post=await Post.findByOrFail({id:params.id});

		await post.delete();

		session.flash('success',"Le poste a bien été supprimer");

		return response.redirect().toRoute('blog.index')
	}
}

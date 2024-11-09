import stringHelpers from "@adonisjs/core/helpers/string";
import type { HttpContext } from "@adonisjs/core/http";
import { dd } from "@adonisjs/core/services/dumper";
import { bind } from "@adonisjs/route-model-binding";
import Comment from "#models/comment";
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

	@bind()
	async show({view}:HttpContext,slug:string,post:Post) {

		/* const posts=await Post.query().preload('comments',(commentQuery)=> {
			
		}).has('comments')
		
		const res=posts.map(p => {
			return p.comments.length;
		}); */

		await post?.load('comments')

		await post.loadCount('comments')

		const c=new Comment()

		c.commentaire="save com test"

		//const res=await post.related('comments').save(c)

		const firstCom=(await Comment.find(1))
		await firstCom?.load('post')
		await firstCom?.related('post').associate(post)
		dd(firstCom?.post)

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

		return  response.redirect().toRoute('blog.show',{slug:post_slug,post:id});
	}

	@bind()
	async edit({view}:HttpContext,post:Post) {
		return view.render('blog/create',{post})
	}

	@bind()
	async update({params,session,response,request}:HttpContext,post:Post) {
	
		const data=await request.validateUsing(updatePostValidator,{
			meta:{id:params.post}
		})

		const {slug,id}=await post.merge(data).save();

		session.flash('success',"Les modifications ont été effectué avec success");

		return response.redirect().toRoute('blog.show',{slug,post:id})
	}

	@bind()
	async delete({session,response}:HttpContext,post:Post) {
		
		await post.delete();

		session.flash('success',"Le poste a bien été supprimer");

		return response.redirect().toRoute('blog.index')
	}
}

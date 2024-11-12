import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import type { DateTime } from "luxon";
import Comment from "./comment.js";

export default class Post extends BaseModel {

	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare title: string;

	@column()
	declare content: string;

	@column()
	declare slug: string;

	@hasMany(() => Comment)
	declare comments: HasMany<typeof Comment>;

	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime;
}

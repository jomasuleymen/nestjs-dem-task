import { Exclude } from "class-transformer";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: "users",
})
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", length: 30, nullable: false })
	username: string;

	@Index()
	@Column({ type: "varchar", nullable: false })
	email: string;

	@Column({ type: "boolean", default: false })
	@Exclude()
	status: boolean;

	@Column({ type: "varchar", nullable: false, select: false })
	@Exclude()
	password: string;
}

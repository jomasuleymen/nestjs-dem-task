import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
	name: "users",
})
export class User {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", length: 30, unique: true, nullable: false })
	username: string;

	@Index()
	@Column({ type: "varchar", nullable: false })
	email: string;

	@Column({ type: "boolean", default: false })
	status: Date;

	@Column({ type: "varchar", nullable: false, select: false })
	password: string;
}

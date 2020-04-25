import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: number

	@Column()
	name: string

	@Column()
	birthdate: string
}

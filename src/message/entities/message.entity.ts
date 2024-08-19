import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    content: string 

    @ManyToOne(() => User, (user) => user.messages)
    @JoinColumn()
    user: User

    @CreateDateColumn()
    createdAt: Date
}

import { Column, Entity, ObjectId, ObjectIdColumn, Unique } from "typeorm";

@Entity("users")
export class UserEntity{
    @ObjectIdColumn()
    _id:ObjectId;
    @Column({type:'varchar'})
    name:string;
    @Column({type:'varchar'})
    email:string;
    @Column({type:'varchar'})
    password:string;
}
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity
} from "typeorm";
import bcrypt from "bcrypt";
import { ObjectType, Field, ID } from "type-graphql";

export enum RoleTypes {
  Manager = "manager",
  Operator = "operator",
  Vendor = "vendor",
  Technician = "technician",
  Assessor = "assessor"
}
@Entity()
@ObjectType()
export default class User extends BaseEntity {

  @Field(type => ID)
  @PrimaryGeneratedColumn({type: "bigint"})
  id: number;

  @Field(type => String)
  @Column()
  name: string;

  @Field(type => String)
  @Column({
    type: "varchar"
  })
  role: RoleTypes;

  @Field(type => String)
  @Column({
    unique: true
  })
  email: string

  @Field(type => String)
  @Column()
  password: string;

  @Field(type => String)
  @Column()
  phone: string;

  @Field(type => String, { nullable: true })
  @Column({
    nullable: true,
    type: "text"
  })
  address: string;

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  
  @Field(type => Date)
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);
  }
}

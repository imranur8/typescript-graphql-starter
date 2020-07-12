import { InputType, Field } from "type-graphql";
import {RoleTypes} from "../entities/User";
@InputType()
export class UserInput {
  @Field()
  name: string;
  
  @Field()
  role: RoleTypes;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phone: string;

  @Field({nullable: true})
  address?: string;

}

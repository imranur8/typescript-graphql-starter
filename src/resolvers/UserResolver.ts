import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import User, { RoleTypes } from "../entities/User";
import { UserInput } from "../inputs/UserInput";
import { Context } from "vm";

@Resolver()
export default class UserResolver {
  @Authorized("manager")
  @Query(() => [User], {
    description: "Fetch users list"
  })
  async users(@Ctx() context: Context) {
    console.log(context.user.email);
    return await User.find()
  }

  @Authorized("manager")
  @Mutation(() => User, {
    description: "Create a new user"
  })
  async createUser(@Arg("data") data: UserInput) {
    try {
      const { role } = data;
      if (!Object.values(RoleTypes).includes(role)) {
        throw new Error("Role not found");
      }
      return await User.create(data).save();
    } catch (error) {
      throw new Error(error);
    }
  }
}
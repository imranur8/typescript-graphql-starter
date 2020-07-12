import { buildSchema } from "type-graphql";
import UserResolver from "./UserResolver";
import { isAuthorized } from "../middlewares/auth";

export default async () => {
  return await buildSchema({
    resolvers: [
      UserResolver
    ],
    emitSchemaFile: true,
    validate: false,
    authChecker: isAuthorized
  });
}




import BookResolver from "./BookResolver";
import { buildSchema } from "type-graphql";

export default async () => {
  return await buildSchema({
    resolvers: [
      BookResolver
    ],
    emitSchemaFile: true,
    validate: false,
  });
}




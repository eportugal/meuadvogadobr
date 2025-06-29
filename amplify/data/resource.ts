import { a, defineData, type ClientSchema } from "@aws-amplify/backend";
import { askMistral } from "../functions/ask-mistral/resource";

const schema = a.schema({
  askMistral: a
    .query()
    .arguments({ question: a.string() })
    .returns(a.string())
    .authorization((allow) => [allow.guest()])
    .handler(a.handler.function(askMistral)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});

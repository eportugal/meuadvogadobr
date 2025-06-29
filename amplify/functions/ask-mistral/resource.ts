// Em: amplify/functions/ask-mistral/resource.ts
import { defineFunction } from "@aws-amplify/backend";

export const askMistral = defineFunction({
  entry: "./handler.ts", // Verifique se o caminho para o handler está correto
  environment: {
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY!,
  },
});

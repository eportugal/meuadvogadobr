// Em: amplify/backend.ts

import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { askMistral } from "./functions/ask-mistral/resource";

// Deixe o backend.ts simples como antes
export const backend = defineBackend({
  auth,
  data,
  askMistral,
});

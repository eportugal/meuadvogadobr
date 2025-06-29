import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";

// Deixe o backend.ts simples como antes
export const backend = defineBackend({
  auth,
  data,
  askMistral,
});

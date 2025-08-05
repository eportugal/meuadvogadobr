import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  accountRecovery: "EMAIL_ONLY",
  multifactor: {
    mode: "OPTIONAL",
    totp: false,
  },
});

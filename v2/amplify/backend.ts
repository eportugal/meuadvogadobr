import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

const backend = defineBackend({
  auth,
  data,
});

// Add custom user attributes for profile types
backend.auth.resources.cfnResources.cfnUserPool.schema = [
  {
    name: "profileType",
    attributeDataType: "String",
    mutable: true,
  },
  {
    name: "cognitoSub",
    attributeDataType: "String",
    mutable: true,
  },
];

// Add permissions for Lambda functions to access DynamoDB
const authenticatedUserIamRole =
  backend.auth.resources.authenticatedUserIamRole;
authenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: ["dynamodb:*"],
    resources: ["*"],
  })
);

import { defineData } from "@aws-amplify/backend";

const schema = `
  type User @model @auth(rules: [{ allow: owner }, { allow: private }]) {
    id: ID!
    email: String! @index(name: "byEmail")
    name: String!
    profileType: String!
    phone: String
    oab: String
    area: String
    iaCredits: Int @default(value: "0")
    consultoriaCredits: Int @default(value: "0")
    createdAt: AWSDateTime!
    updatedAt: AWSDateTime!
  }

  type Ticket @model @auth(rules: [{ allow: owner }, { allow: private }]) {
    id: ID!
    userId: String! @index(name: "byUser")
    lawyerId: String @index(name: "byLawyer")
    area: String! @index(name: "byArea")
    question: String!
    classification: String!
    answer: String
    status: String!
    appointmentDate: AWSDateTime
    appointmentId: String
    createdAt: AWSDateTime!
    updatedAt: AWSDateTime!
  }

  type Appointment @model @auth(rules: [{ allow: owner }, { allow: private }]) {
    id: ID!
    ticketId: String!
    userId: String!
    lawyerId: String!
    date: AWSDateTime!
    meetingUrl: String!
    status: String!
    reminderSent: Boolean @default(value: "false")
    createdAt: AWSDateTime!
    updatedAt: AWSDateTime!
  }

  type LawyerAvailability @model @auth(rules: [{ allow: owner }, { allow: private }]) {
    id: ID!
    lawyerId: String! @index(name: "byLawyer")
    dayOfWeek: Int!
    startTime: String!
    endTime: String!
    isActive: Boolean!
    createdAt: AWSDateTime!
    updatedAt: AWSDateTime!
  }

  type Counter @model @auth(rules: [{ allow: private }]) {
    id: ID!
    name: String! @primaryKey
    value: Int!
    createdAt: AWSDateTime!
    updatedAt: AWSDateTime!
  }
` as const;

// export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

import { SCOMPONENTModel } from './SCOMPONENT.service';
// Schema
export const gQCCOMPONENTSchema = `

type CCOMPONENT {
  _id: ID!,
  name: String!,
  age: Int,
  email: String,
  createdAt: String
}

input SCOMPONENTInput{
  name: String!,
  age: Int!,
  email: String!
}

type RootQuery{
  SCOMPONENTs: [CCOMPONENT!]!
}

type RootMutation{
  createCCOMPONENT(SCOMPONENT: SCOMPONENTInput): CCOMPONENT
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`;


// ------------------ Resolver ---------------------------

export const gQUserResolver = {
  SCOMPONENTs: async () => {
    return  SCOMPONENTModel.fetchAll();
  },

  createUser: async (args: any) => {
    return  SCOMPONENTModel.add(args.user);
  }
}

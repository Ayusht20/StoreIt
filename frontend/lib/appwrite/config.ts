// import { Client, Databases, Account, Storage } from "node-appwrite";

// export async function createAdminClient() {
//   const client = new Client()
//     .setEndpoint()
//     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
//     .setKey(process.env.APPWRITE_API_KEY!);

//   return {
//     get account() {
//       return new Account(client);
//     },
//     get databases() {
//       return new Databases(client);
//     },
//     get storage() {
//       return new Storage(client);
//     },
//   };
// }

export const appwriteConfig={
    endpointUrl:process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId:process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId:process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    usersCollectionId:process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
    filesCollectionId:process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
    bucketId:process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
    secretKey:process.env.NEXT_APPWRITE_KEY!,
}
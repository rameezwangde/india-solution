import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '6ffd0ffc6f1e064ad6a0f572fe1259e4b1ac0590', queries,  });
export default client;
  
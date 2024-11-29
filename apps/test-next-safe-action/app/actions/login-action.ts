"use server";

import { z } from "zod";
import { actionClient } from "../clients/actionclient";
import { exit } from "process";

// This schema is used to validate input from client.
const schema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(4).max(100),
});

console.log(`schema: ${schema}`);
export const loginUser = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username, password } }) => {
    console.log(`parse input: ${username}`);
    if (username === "johndoe" && password === "123456") {
      console.log("Successfully logged in");
      return {
        success: "Successfully logged in",
      };
    }

    console.log("Incorrect credentials");
    return { failure: "Incorrect credentials" };
  });

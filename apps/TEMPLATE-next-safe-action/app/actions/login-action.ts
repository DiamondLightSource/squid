"use server";

import { z } from "zod";
import { actionClient } from "../clients/actionclient";
import { exit } from "process";

const schema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(4).max(100),
});

export const loginUser = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { username, password } }) => {
    if (username === "johndoe" && password === "123456") {
      return {
        success: "Successfully logged in",
      };
    }

    return { failure: "Incorrect credentials" };
  });

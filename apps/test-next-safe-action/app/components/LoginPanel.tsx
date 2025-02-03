"use client";

import { loginUser } from "../actions/login-action";

export function LoginPanel() {
  return <button
    onClick={async () => {
      const values = {
        username: "johndoe",
        password: "123456",
      };
      console.log("Logging in with", values);
      // Typesafe action called from client.
      const res = await loginUser(values);
      console.log(res);

      // Result keys.
      res?.data;
      res?.validationErrors;
      res?.bindArgsValidationErrors;
      res?.serverError;
    }}>
    Log in
  </button>;
}

import { actionClient } from "../clients/actionclient";

export const simpleAction = actionClient.action(async () => {
  return { success: "Simple action executed" };
});

export const simpleActionWithParams = actionClient.action(
  async ({ parsedInput }) => {
    return { success: `Simple action executed with params: ${parsedInput}` };
  }
);


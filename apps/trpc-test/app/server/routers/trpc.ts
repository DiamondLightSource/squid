import { createReactQueryHooks } from "@trpc/react-query";
import { router } from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import { circleRouter } from "./circle";

export const appRouter = router().merge("circle.", circleRouter);

export type AppRouter = typeof appRouter;

export const trpc = createReactQueryHooks<AppRouter>();

import { createTRPCRouter } from "@/server/api/trpc";
import { championRouter } from "./routers/champions";
import { draftRouter } from "./routers/draft";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  champion: championRouter,
  draft: draftRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

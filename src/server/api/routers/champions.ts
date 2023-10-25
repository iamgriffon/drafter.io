import { createTRPCRouter, publicProcedure } from "../trpc";

export const championRouter = createTRPCRouter({
  fetchChampions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.champion.findMany();
  }),
});

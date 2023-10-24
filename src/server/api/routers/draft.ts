import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const draftRouter = createTRPCRouter({
  export: publicProcedure
    .input(
      z.object({
        user_id: z.string().min(1),
        draft: z.record(z.any()),
        link: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user_id, draft, link, name } = input;

      const findUnique = await ctx.db.draft.findFirst({
        where: {
          name: name
        }
      });

      if (findUnique) return { error: "Name already in use" };

      const newRegistry = await ctx.db.draft.create({
        data: {
          data: draft,
          link: link,
          userId: user_id,
          name: name,
        },
      });

      const selectedRegistry = await ctx.db.draft.findUnique({
        where: {
          id: newRegistry.id,
        },
      });
      return { data: selectedRegistry };
    }),
  import: publicProcedure
    .input(
      z.object({
        link: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { link } = input;
      const res = await ctx.db.draft.findFirst({
        where: {
          link: link,
        },
      });
      if (res){
        return { data: res};
      } else {
        return { error: "No Draft Found" };
      }
    }),
  fetch: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { user_id } = input;
      const res = await ctx.db.draft.findMany({
        where: {
          userId: user_id,
        },
      });
      return res;
    }),
  update: publicProcedure
    .input(
      z.object({
        link: z.string(),
        name: z.string(),
        draft: z.record(z.any()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { link, draft, name } = input;
      const getDraft = await ctx.db.draft.findFirst({
        where: {
          link: link,
        },
      });

      if (!getDraft) {
        return {
          message:
						"We were not able to find your draft, please try again later",
          success: false,
        };
      }

      const res = await ctx.db.draft.update({
        where: {
          id: getDraft.id,
        },
        data: {
          data: draft,
          name: name,
        },
      });
      return {
        message: `${res.name} has been successfuly updated!`,
        success: true,
      };
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
        user_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, user_id } = input;

      const selectedDraft = await ctx.db.draft.findFirstOrThrow({
        where: {
          id: id,
        },
      });

      const isDraftOwner = selectedDraft.id === id;

      if (selectedDraft && isDraftOwner) {
        const deleteDraft = await ctx.db.draft
          .delete({
            where: {
              id: selectedDraft.id,
            },
          })
          .then((res) => res.data);

        if (deleteDraft) return { message: "Draft Deleted Successfully" };
      } else if (!isDraftOwner){
        return { message: "Error when deleting draft, Insufficient permissions" };
      } else if (!selectedDraft) {
        return { message: "Error when deleting draft, No draft found" };
      }
    }),
  checkOwner: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
        link: z.string(),
      })
    )
    .mutation(async ({ctx, input}) => {
      const { link, user_id } = input;

      const checkForOwner = await ctx.db.draft.findFirst({
        where: {
          link: link
        }
      });

      if (!checkForOwner) return {
        message: "Internal Server Error",
        success: false
      };

      if (checkForOwner.userId === user_id){
        return {
          message: "Successfully Updated!",
          success: true
        };
      }
      else if (checkForOwner.userId !== user_id){
        return {
          message: "Insufficient Permissions",
          success: false
        };
      }
    })
});

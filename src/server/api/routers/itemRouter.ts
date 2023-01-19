import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.shoppingList.create({
        data: { name: input.name },
      });
      return item;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.shoppingList.findMany();
  }),
});

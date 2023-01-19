import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

// import type { ShoppingList } from "@prisma/client";

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
    return ctx.prisma.shoppingList.findMany({ orderBy: { createdAt: "asc" } });
  }),
  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.shoppingList.delete({ where: input });
      return item;
    }),
  checkItem: publicProcedure
    .input(z.object({ id: z.string(), checked: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.shoppingList.update({
        data: { checked: !input.checked },
        where: { id: input.id },
      });
      return item;
    }),
});

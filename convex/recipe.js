import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createRecipe = mutation({
  args: {
    jsonData: v.any(),
    uid: v.id('users'),
    recipeName: v.string(),
    imageUrl: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const doc = {
      jsonData: args.jsonData,
      uid: args.uid,
      recipeName: args.recipeName
    };

    if (args.imageUrl !== undefined) {
      doc.imageUrl = args.imageUrl;
    }

    const result = await ctx.db.insert('recipes', doc);
    return result;
  }
});

export const GetRecipeById = query({
  args: {
    id: v.id('recipes')
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id)
    return result;
  }
})

export const GetAllRecipes=query({
  handler: async(ctx,args)=>{
    const result=await ctx.db.query('recipes').collect();
    return result;
  }
})
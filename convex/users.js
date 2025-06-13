import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async ({ db }, args) => {
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length === 0) {
      const data = {
        name: args.name,
        email: args.email,
        credits: 10,
      };
      const result = await db.insert("users", data);
      return { ...data, _id: result };
    }


    return { ...user[0], _id: user[0]._id };
  },
});


export const GetUser = query({
  args: {
    email: v.string()
  },
  handler: async ({ db }, args) => {
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length > 0) {
      return {
        ...user[0],
        _id: user[0]._id,
      };
    }

    return null;
  }
});

export const UpdateUserPref = mutation({
  args: {
    uid: v.id("users"),
    height: v.string(),
    weight: v.string(),
    gender: v.string(),
    goal: v.string(),
    calories: v.optional(v.number()),
    proteins: v.optional(v.number())
  },
  handler: async ({ db }, args) => {
    const result = await db.patch(args.uid, {
      height: args.height,
      weight: args.weight,
      goal: args.goal,
      gender: args.gender,
      calories: args.calories,
      proteins: args.proteins
    });
    return result;
  },
});
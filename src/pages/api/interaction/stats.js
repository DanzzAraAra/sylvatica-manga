import dbConnect from "../../../lib/db";
import Reaction from "../../../models/Reaction";

export const GET = async ({ request }) => {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const mangaId = searchParams.get("mangaId");
  const userId = searchParams.get("userId");

  const likes = await Reaction.countDocuments({ mangaId, type: "like" });
  const dislikes = await Reaction.countDocuments({ mangaId, type: "dislike" });
  let userReaction = null;

  if (userId) {
    const r = await Reaction.findOne({ mangaId, userId });
    if(r) userReaction = r.type;
  }

  return new Response(JSON.stringify({ likes, dislikes, userReaction }), { status: 200 });
};

export const POST = async ({ request }) => {
  await dbConnect();
  const { mangaId, userId, action } = await request.json();
  const existing = await Reaction.findOne({ mangaId, userId });

  if (existing) {
    if (existing.type === action) await Reaction.deleteOne({ _id: existing._id });
    else {
      existing.type = action;
      await existing.save();
    }
  } else {
    await Reaction.create({ mangaId, userId, type: action });
  }
  return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
};
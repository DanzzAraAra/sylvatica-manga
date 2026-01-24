import dbConnect from "../../../lib/db";
import Comment from "../../../models/Comment";
import User from "../../../models/User";

export const GET = async ({ request }) => {
  await dbConnect();
  const mangaId = new URL(request.url).searchParams.get("mangaId");
  const comments = await Comment.find({ mangaId }).sort({ createdAt: -1 }).populate("userId", "username avatar level");
  return new Response(JSON.stringify(comments), { status: 200 });
};

export const POST = async ({ request }) => {
  await dbConnect();
  const { mangaId, userId, text } = await request.json();
  await Comment.create({ mangaId, userId, text });
  
  // Award XP for commenting
  await User.findByIdAndUpdate(userId, { $inc: { exp: 5 } });
  
  return new Response(JSON.stringify({ msg: "Posted" }), { status: 201 });
};

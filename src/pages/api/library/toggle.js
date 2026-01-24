import dbConnect from "../../../lib/db";
import Favorite from "../../../models/Favorite";

export const POST = async ({ request }) => {
  await dbConnect();
  const { userId, mangaId, title, image } = await request.json();
  const existing = await Favorite.findOne({ userId, mangaId });
  
  if (existing) {
    await Favorite.deleteOne({ _id: existing._id });
  } else {
    await Favorite.create({ userId, mangaId, title, image });
  }
  return new Response(JSON.stringify({ status: "done" }), { status: 200 });
};
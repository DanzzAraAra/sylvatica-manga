import dbConnect from "../../../lib/db";
import Favorite from "../../../models/Favorite";

export const GET = async ({ request }) => {
  await dbConnect();
  const userId = new URL(request.url).searchParams.get("userId");
  const list = await Favorite.find({ userId }).sort({ addedAt: -1 });
  return new Response(JSON.stringify(list), { status: 200 });
};
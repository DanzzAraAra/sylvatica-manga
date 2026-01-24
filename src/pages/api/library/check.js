import dbConnect from "../../../lib/db";
import Favorite from "../../../models/Favorite";

export const GET = async ({ request }) => {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const exists = await Favorite.exists({ userId: searchParams.get("userId"), mangaId: searchParams.get("mangaId") });
  return new Response(JSON.stringify({ isFavorite: !!exists }), { status: 200 });
};
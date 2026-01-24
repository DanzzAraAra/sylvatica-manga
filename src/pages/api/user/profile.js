import dbConnect from "../../../lib/db";
import User from "../../../models/User";

export const GET = async ({ request }) => {
  const userId = new URL(request.url).searchParams.get("userId");
  await dbConnect();
  const user = await User.findById(userId).select("-password");
  return new Response(JSON.stringify(user || {}), { status: 200 });
};
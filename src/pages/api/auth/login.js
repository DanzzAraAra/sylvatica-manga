import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export const POST = async ({ request }) => {
  await dbConnect();
  const { email, password } = await request.json();
  const user = await User.findOne({ email });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response(JSON.stringify({ msg: "Invalid credentials" }), { status: 400 });
  }

  return new Response(JSON.stringify({ msg: "Success", userId: user._id }), { status: 200 });
};
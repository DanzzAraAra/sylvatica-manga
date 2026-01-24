import dbConnect from "../../../lib/db";
import User from "../../../models/User";

export const POST = async ({ request }) => {
  try {
    await dbConnect();
    const { email, otp } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ msg: "User not found" }), { status: 404 });
    }

    if (user.otp !== otp) {
      return new Response(JSON.stringify({ msg: "Invalid OTP" }), { status: 400 });
    }

    user.otp = null; 
    user.otpExpiry = null;
    user.isVerified = true; 
    await user.save();

    return new Response(JSON.stringify({ msg: "Verified" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), { status: 500 });
  }
};

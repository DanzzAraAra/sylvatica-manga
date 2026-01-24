import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const POST = async ({ request }) => {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!password || password.length < 8) {
      return new Response(JSON.stringify({ msg: "Password must be at least 8 characters" }), { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ msg: "Email already registered" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await User.create({ email, password: hashedPassword, otp, otpExpiry });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: import.meta.env.MAIL_USER,
        pass: import.meta.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: import.meta.env.MAIL_USER,
      to: email,
      subject: "Sylvatica Code",
      text: `Your Verification Code: ${otp}`,
    });

    return new Response(JSON.stringify({ msg: "Success" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), { status: 500 });
  }
};

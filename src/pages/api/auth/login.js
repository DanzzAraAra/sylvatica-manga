import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async ({ request, cookies }) => {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    // 1. Cek User
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ msg: "User not found" }), { status: 404 });
    }

    // 2. Cek Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ msg: "Invalid credentials" }), { status: 401 });
    }

    // 3. Buat Token (JWT)
    // Pastikan kamu punya JWT_SECRET di file .env
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      import.meta.env.JWT_SECRET || "rahasia_negara_api", // Ganti dengan env variable
      { expiresIn: "7d" }
    );

    // 4. SIMPAN TOKEN KE COOKIES (Ini kuncinya!)
    cookies.set("token", token, {
      path: "/",          // Wajib: agar bisa dibaca di semua halaman
      httpOnly: true,     // Aman: JavaScript gak bisa baca (anti XSS)
      secure: import.meta.env.PROD, // True kalau sudah deploy (HTTPS)
      maxAge: 60 * 60 * 24 * 7, // 7 Hari
    });

    return new Response(JSON.stringify({ msg: "Login Success" }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), { status: 500 });
  }
};

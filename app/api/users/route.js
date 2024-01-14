'use server'
const bcrypt = require("bcrypt");
const User = require("../../../models/user");
import connectDB from "../../../lib/dbConnect";

export async function POST(request) {
  await connectDB();

  const { username, password } = await request.json();

  if (!username || !password) {
    return Response.json({message: "Username or password missing"}, { status: 400 });
    // return response.status(400).end();
  } else if (username.length < 3) {
    return Response.json({message: "Username must be at least 3 characters long"}, { status: 400 });
  } else if (password.length < 3) {
    return Response.json({message: "Password must be at least 3 characters long"}, { status: 400 });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash,
    });

    const savedUser = await user.save();

    return Response.json({ savedUser }, { status: 200 });
  }
}

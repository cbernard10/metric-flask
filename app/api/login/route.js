import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../../models/user");
import connectDB from "../../../lib/connectDB";

export async function POST(request) {
  const { username, password } = await request.json();

  await connectDB();

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return Response.json({ error: "invalid username or password" }, { status: 401 });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 3600,
  });

  return Response.json({ token, username }, { status: 200 });
}

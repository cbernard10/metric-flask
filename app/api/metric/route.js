const Metric = require("../../../models/metric");
import dbConnect from "../../../lib/dbConnect";
const jose = require("jose");

export async function POST(request) {
  await dbConnect();
  const { name, value } = await request.json();
  
  console.log(request.headers)
  const token = request.headers.get("token");
  console.log(token);

  const secret = new TextEncoder().encode(process.env.SECRET);
  const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
  console.log(payload, protectedHeader);

  if (!payload.id)
    return Response.json({ error: "invalid token" }, { status: 401 });

  const user = User.findById(payload.id);
  request.user = user;

  const newMetric = new Metric({
    name,
    value: JSON.parse(value),
  });

  const savedMetric = await newMetric.save();

  return Response.json({ savedMetric }, { status: 200 });
}

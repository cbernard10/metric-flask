const Metric = require("../../../models/metric");
import dbConnect from "../../../lib/dbConnect";
const User = require("../../../models/user");
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {

  const session = await getServerSession(authOptions);
  
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  
  await dbConnect();
  const { name, metric, userEmail } = await request.json();

  const user = await User.findOne({ email: userEmail });

  const newMetric = new Metric({
    name,
    value: metric,
  });

  console.log(metric, newMetric)

  const newUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    emailVerified: user.emailVerified,
    metrics: user.metrics.concat(newMetric.id),
  };

  await User.findByIdAndUpdate(user.id, newUser, { new: false });
  const savedMetric = await newMetric.save();

  return Response.json({ savedMetric }, { status: 200 });
}

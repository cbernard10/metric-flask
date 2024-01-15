const Metric = require("../../../models/metric");
import dbConnect from "../../../lib/dbConnect";
const User = require("../../../models/user");

export async function POST(request) {
  await dbConnect();
  const { name, metric, userEmail } = await request.json();

  const user = await User.findOne({ email: userEmail });

  const newMetric = new Metric({
    name,
    value: JSON.stringify(metric),
  });

  const newUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    emailVerified: user.emailVerified,
    metrics:
      user.metrics.concat(newMetric.id),
  };

  await User.findByIdAndUpdate(user.id, newUser, { new: false })
  const savedMetric = await newMetric.save();

  return Response.json({ savedMetric }, { status: 200 });
}

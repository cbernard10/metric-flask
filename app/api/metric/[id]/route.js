import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
const Metric = require("../../../../models/metric");
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";

export async function GET(req, { params }) {
  console.log("ok............", params.id);
  const session = await getServerSession(authOptions);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  try {
    const metric = await Metric.findById(params.id);
    console.log(metric);
    return NextResponse.json({ metric }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  try {
    const newMetric = await req.json();
    console.log("new metric", newMetric);
    const metric = await Metric.findByIdAndUpdate(
      params.id,
      {
        name: newMetric.name,
        value: newMetric.metric,
        coordinates: newMetric.coordinates,
      },
      {
        new: true,
      }
    );
    console.log(metric);
    return NextResponse.json({ metric }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  try {
    await Metric.findByIdAndDelete(params.id);
    return Response.json(
      { message: `metric ${params.id} successfully deleted` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

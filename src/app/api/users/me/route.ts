import { getDataFromtokens } from "@/helpers/getDataFromTokens";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(requset: NextRequest) {
  try {
    const userId = await getDataFromtokens(requset);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

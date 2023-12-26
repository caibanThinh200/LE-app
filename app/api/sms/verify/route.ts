import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: Request) {
  // Do whatever you want
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  console.log(await request.json());

  client.verify.v2
    .services("VA2b0d83e95be31144b2f4f68491804bac" as string)
    .verificationChecks.create({
      to: "+84364373104",
      code: "099344",
    })
    .then((verification) => console.log(verification));
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

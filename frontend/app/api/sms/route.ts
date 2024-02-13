import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: Request) {
  const req = await request.json();
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const formattedPhoneNumber =
    req?.phone?.charAt(0) !== "+"
      ? req?.phone?.replace(/^.{1}/g, "+84")
      : req?.phone;

  const result = await client.verify.v2
    .services(process.env.TWILIO_SERVICE as string)
    .verifications.create({ to: formattedPhoneNumber, channel: "sms" });

  return NextResponse.json({ result }, { status: 200 });
}

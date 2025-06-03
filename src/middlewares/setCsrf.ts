import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export default async function main<R extends Response>(req: NextRequest, res: R): Promise<R> {
  // create a jwt with user IP as payload
  // sign the jwt and set it as XSRF-TOKEN

  const ip = req.headers.get("x-forwarded-for") || "";
  const key = new TextEncoder().encode(process.env.CSRF_SECRET);

  const csrf_jwt = await new SignJWT({ ip }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("6 hours").sign(key);

  let newRes: any;
  if (res instanceof Response) newRes = new Response(res.body, res);
  if (res instanceof NextResponse) newRes = new NextResponse(res.body, res);

  const Secure = process.env.SECURE_COOKIES === "true" ? "Secure;" : "";

  newRes.headers.append("Set-Cookie", `XSRF-TOKEN=${csrf_jwt}; Path=/; ${Secure} HttpOnly; SameSite=lax`);
  return newRes;
}

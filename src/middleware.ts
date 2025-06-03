import { NextResponse, NextRequest } from "next/server";
import setCsrf from "@/middlewares/setCsrf";

export async function middleware(req: NextRequest) {
  let res = new NextResponse();
  res = NextResponse.rewrite(new URL(req.nextUrl.pathname + req.nextUrl.search, req.url));

  if (req.method === "GET") res = await setCsrf<NextResponse>(req, res);

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)"],
};

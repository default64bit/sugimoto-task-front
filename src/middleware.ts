import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let res = new NextResponse();
  res = NextResponse.rewrite(new URL(req.nextUrl.pathname + req.nextUrl.search, req.url));

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)"],
};

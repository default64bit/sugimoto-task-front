import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const _GD = async (request: NextRequest, { params }: { params: { slug: string } }): Promise<Response> => {
  // csrf checks
  if (!(await checkCsrf(request))) {
    return new NextResponse("Expired", { status: 419 });
  }

  const arrBuffer = await request
    .arrayBuffer()
    .then((b) => b)
    .catch((e) => console.error(e));
  const data = arrBuffer || null;

  const headers = new Headers();
  headers.set("content-type", request.headers.get("content-type") || "");
  headers.set("accept", "application/json");
  headers.set("x-forwarded-for", request.headers.get("x-forwarded-for") || "");
  // headers.set("serversecret", process.env.SERVER_SECRET || "");
  // headers.set("tt", Date.now().toString());

  // set Authorization header if there is any
  // headers.set("Authorization", `Bearer ${request.cookies.get("AuthToken")?.value}`);

  const url = `${process.env.API_BASE_URL}${request.nextUrl.pathname}${request.nextUrl.search}`.replaceAll("/api/", "/");
  const res = await fetch(url, {
    method: request.method,
    body: request.method === "GET" ? null : data,
    headers: headers,
  })
    .then((response) => response)
    .catch((error) => {
      console.error({ error });
      return new Response(error, { status: 500, statusText: "Internal Error" });
    });

  if (res.status >= 500) {
    console.error({ status: res.status, statusText: res.statusText, err: await res.text() });
    return new Response(null, { status: 500, statusText: "Internal Server Error" });
  }

  return res;
};

export const checkCsrf = async (req: NextRequest) => {
  // in GET method we don't need csrf checks
  if (req.method == "GET") return true;

  const ip = req.headers.get("x-forwarded-for") || "";
  const key = new TextEncoder().encode(process.env.CSRF_SECRET);
  const XSRF: string = req.cookies.get("XSRF-TOKEN")?.value || "";

  const { payload } = await jwtVerify<{ ip: string | undefined }>(XSRF, key, { algorithms: ["HS256"] }).catch(() => ({ payload: undefined }));

  if (!payload) return false;
  if (payload.ip === ip) return true;

  return false;
};

export const addServerHeaders = async (requestInit: RequestInit): Promise<RequestInit> => {
  // const { cookies: Cookies } = await import("next/headers");
  // const AuthToken: string = (await Cookies()).get("AuthToken")?.value || "";

  const headers: any = { Accept: "application/json" };
  // headers["Authorization"] = `Bearer ${AuthToken}`;
  // headers["serversecret"] = process.env.SERVER_SECRET || "";
  // headers["tt"] = Date.now().toString();

  requestInit.headers = headers;
  return requestInit;
};

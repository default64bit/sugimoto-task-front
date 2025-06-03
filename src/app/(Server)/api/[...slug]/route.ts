import { _GD } from "@/lib/utils.server";
import { NextRequest } from "next/server";

// this is a proxy for api routes to pass all api request through Default Gateway function (GD for short)

export const GET = async (request: NextRequest, { params }: any) => await _GD(request, { params });
export const POST = async (request: NextRequest, { params }: any) => await _GD(request, { params });
export const PUT = async (request: NextRequest, { params }: any) => await _GD(request, { params });
export const DELETE = async (request: NextRequest, { params }: any) => await _GD(request, { params });
export const OPTIONS = async (request: NextRequest, { params }: any) => await _GD(request, { params });

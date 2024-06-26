import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "./iron-config";

export function withSessionRoute(handler:any) {
    return withIronSessionApiRoute(handler, ironOptions as any);
}

export function withSessionSsr(handler:any) {
    return withIronSessionSsr(handler, ironOptions as any);
}
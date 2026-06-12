import type { Context } from "./context";

export type Handler = (c: Context) => Response; 

export type Route = {
    method: string;
    path: string;
    handler: Handler;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
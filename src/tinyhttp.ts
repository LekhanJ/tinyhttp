import { Context } from "./context";
import { Router } from "./router";
import type { Handler, HttpMethod } from "./types";
import { isHttpMethod } from "./utils";

export class TinyHttp {
    private router = new Router();
    
    public get(path: string, handler: Handler): void {
        this.addRoute("GET", path, handler);
    }

    public post(path: string, handler: Handler): void {
        this.addRoute("POST", path, handler);
    }

    public fetch(req: Request): Response {
        const method = req.method;
        const pathname = new URL(req.url).pathname;

        if (!isHttpMethod(method)) {
            return new Response(
                "Method Not Allowed",
                { status: 405 }
            );
        }

        const handler = this.router.match(method, pathname);
                
        if (handler === undefined) {
            return new Response(
                "Not Found",
                { status: 404 }
            );
        }

        const context = new Context(req);

        return handler(context);
    }

    private addRoute(method: HttpMethod, path: string, handler: Handler) {
        validatePath(path);
        this.router.addRoute(method, path, handler);
    }
}

const validatePath = (path: string) => {
    if (!path.startsWith("/")) 
        throw new Error(`Path should start with '/'. Received ${path}`);
}
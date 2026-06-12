import { Context } from "./context";
import { Router } from "./router";
import type { Handler } from "./types";
import { isHttpMethod } from "./utils";

export class TinyHttp {
    private router = new Router();
    
    public get(path: string, handler: Handler): void {
        if (!path.startsWith("/")) 
            throw new Error(`Path should start with '/'. Received ${path}`);

        this.router.addRoute("GET", path, handler);
    }

    public listen(port: number): void {
        Bun.serve({
            port,
            fetch: (req) => {
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
        });
    }
}
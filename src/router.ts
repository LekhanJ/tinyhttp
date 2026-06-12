import type { Handler, HttpMethod, Route } from "./types";

export class Router {
    private routes: Map<string, Route> = new Map<string, Route>();

    addRoute(method: HttpMethod, path: string, handler: Handler): void {
        const key = `${method}:${path}`;

        if (this.routes.has(key))
            throw new Error(`Route '${path}' already exists for ${method} method`);

        this.routes.set(key, {
            method,
            path,
            handler
        });
    }

    match(method: HttpMethod, path: string): Handler | undefined {
        const key = `${method}:${path}`;
        return this.routes.get(key)?.handler;
    }
}
import type { TinyHttp } from "../tinyhttp";

export function serve(app: TinyHttp, port: number) {
    Bun.serve({
        port,
        fetch(req) {
            return app.fetch(req);
        }
    });
}
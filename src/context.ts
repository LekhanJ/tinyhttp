export class Context {
    constructor(public req: Request) {}

    text(text: string): Response {
        return new Response(text);
    }

    json(data: unknown): Response {
        return Response.json(data);
    }
}
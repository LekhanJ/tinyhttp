import { TinyHttp } from "../src/tinyhttp";

const app = new TinyHttp();

app.get("/hello", (c) => {
    return c.json("Hello");
});

export default app;
import { TinyHttp } from "../src/tinyhttp";

const app = new TinyHttp();

app.get("/hello", (c) => {
    return c.json("Hello");
})

app.listen(3000);
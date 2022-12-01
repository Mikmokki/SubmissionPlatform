

import { Application,oakCors } from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

import { router } from "./routes/routes.js";

const app = new Application();
app.use(oakCors({
    origin: ['http://localhost:7800','http://localhost:7778'],
    optionsSuccessStatus: 200,
}));
app.use(errorMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 7777,host:"0.0.0.0" });
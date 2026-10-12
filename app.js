import { Application } from "oak";
import router from "./routes/resourceRoutes.js";

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    ctx.response.status = 500;
    ctx.response.body = "Internal Server Error";
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("StudyHub is running at http://localhost:8000");
await app.listen({ port: 8000 });

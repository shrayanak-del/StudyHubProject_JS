import { Router } from "oak";
import * as controller from "../controllers/resourceController.js";

const router = new Router();

router.get("/", controller.home);
router.get("/resources", controller.allResources);
router.get("/resources/subject/:subject", controller.subject);
router.get("/resources/:id", controller.details);
router.get("/search", controller.search);

// API routes demonstrate HTTP semantics and HATEOAS-style links.
router.get("/api/resources", controller.apiResources);
router.post("/api/resources", controller.createApiResource);

router.get("/css/style.css", async (ctx) => {
  const css = await Deno.readTextFile("./public/css/style.css");
  ctx.response.type = "text/css";
  ctx.response.body = css;
});

export default router;

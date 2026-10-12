import * as model from "../models/resourceModel.js";
import * as view from "../views/resourceViews.js";

export function home(ctx) {
  ctx.response.body = view.homePage(model.getAllResources());
}

export function allResources(ctx) {
  ctx.response.body = view.resourcesPage(
    "All Resources",
    model.getAllResources()
  );
}

export function subject(ctx) {
  const subject = ctx.params.subject || "";
  const resources = model.getResourcesBySubject(subject);

  if (!resources.length) {
    ctx.response.status = 404;
    ctx.response.body = view.notFoundPage();
    return;
  }

  ctx.response.body = view.resourcesPage(subject, resources);
}

export function search(ctx) {
  const query = ctx.request.url.searchParams.get("q") || "";
  ctx.response.body = view.resourcesPage(
    `Search: ${query}`,
    model.searchResources(query),
    query
  );
}

export function details(ctx) {
  const resource = model.getResourceById(Number(ctx.params.id));

  if (!resource) {
    ctx.response.status = 404;
    ctx.response.body = view.notFoundPage();
    return;
  }

  ctx.response.body = view.detailPage(resource);
}

export function apiResources(ctx) {
  ctx.response.type = "json";
  ctx.response.body = view.apiResourceList(model.getAllResources());
}

export async function createApiResource(ctx) {
  const body = ctx.request.body;

  if (body.type() !== "json") {
    ctx.response.status = 415;
    ctx.response.body = { error: "Content-Type must be application/json." };
    return;
  }

  const data = await body.json();
  const required = ["title", "subject", "description", "url", "level"];
  const missing = required.filter((field) => !data[field]);

  if (missing.length) {
    ctx.response.status = 400;
    ctx.response.body = { error: `Missing fields: ${missing.join(", ")}` };
    return;
  }

  if (!["English", "Maths", "Computer Science"].includes(data.subject)) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Subject must be English, Maths or Computer Science."
    };
    return;
  }

  const resource = model.addResource({
    title: String(data.title),
    subject: data.subject,
    description: String(data.description),
    url: String(data.url),
    level: String(data.level)
  });

  ctx.response.status = 201;
  ctx.response.headers.set("Location", `/api/resources/${resource.id}`);
  ctx.response.type = "json";
  ctx.response.body = view.apiResource(resource);
}

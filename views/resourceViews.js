function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function layout(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | StudyHub</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <h1>StudyHub</h1>
      <p>Free learning resources directory</p>
    </div>
  </header>

  <nav class="site-nav" aria-label="Main navigation">
    <div class="container nav-inner">
      <a href="/">Home</a>
      <a href="/resources">All Resources</a>
      <a href="/resources/subject/English">English</a>
      <a href="/resources/subject/Maths">Maths</a>
      <a href="/resources/subject/Computer%20Science">Computer Science</a>
    </div>
  </nav>

  <main class="container">
    ${content}
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2026 StudyHub</p>
    </div>
  </footer>
</body>
</html>`;
}

function resourceCards(resources) {
  if (!resources.length) {
    return `<p class="empty">No resources found.</p>`;
  }

  return `<div class="resource-grid">
    ${resources.map((resource) => `
      <article class="resource-card">
        <div class="card-body">
          <p class="tag">${escapeHtml(resource.subject)}</p>
          <h3>${escapeHtml(resource.title)}</h3>
          <p>${escapeHtml(resource.description)}</p>
          <dl>
            <dt>Level</dt>
            <dd>${escapeHtml(resource.level)}</dd>
          </dl>
        </div>
        <div class="card-actions">
          <a class="button" href="/resources/${resource.id}">View details</a>
          <a class="external-link" href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer">Visit resource</a>
        </div>
      </article>
    `).join("")}
  </div>`;
}

export function homePage(resources) {
  return layout("Home", `
    <section class="hero" aria-labelledby="home-title">
      <p class="eyebrow">Learning resource directory</p>
      <h2 id="home-title">Find useful free learning resources</h2>
      <p>StudyHub brings together resources for English, Maths and Computer Science.</p>

      <form class="search-form" action="/search" method="get">
        <label for="search">Search resources</label>
        <div class="search-row">
          <input id="search" name="q" type="search" placeholder="e.g. JavaScript, grammar, algebra">
          <button type="submit">Search</button>
        </div>
      </form>
    </section>

    <section aria-labelledby="featured-title">
      <div class="section-heading">
        <h2 id="featured-title">Resources</h2>
        <a href="/resources">See all resources</a>
      </div>
      ${resourceCards(resources)}
    </section>
  `);
}

export function resourcesPage(title, resources, query = "") {
  return layout(title, `
    <section aria-labelledby="resources-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">StudyHub directory</p>
          <h2 id="resources-title">${escapeHtml(title)}</h2>
          ${query ? `<p>Showing results for <strong>${escapeHtml(query)}</strong>.</p>` : ""}
        </div>
        <a href="/">Back to home</a>
      </div>
      ${resourceCards(resources)}
    </section>
  `);
}

export function detailPage(resource) {
  return layout(resource.title, `
    <article class="detail-card">
      <p class="tag">${escapeHtml(resource.subject)}</p>
      <h2>${escapeHtml(resource.title)}</h2>
      <p>${escapeHtml(resource.description)}</p>
      <dl>
        <dt>Subject</dt>
        <dd>${escapeHtml(resource.subject)}</dd>
        <dt>Level</dt>
        <dd>${escapeHtml(resource.level)}</dd>
      </dl>
      <div class="button-row">
        <a class="button" href="${escapeHtml(resource.url)}" target="_blank" rel="noopener noreferrer">Open learning resource</a>
        <a href="/resources">Back to resources</a>
      </div>
    </article>
  `);
}

export function notFoundPage() {
  return layout("Not Found", `
    <section class="error-page" aria-labelledby="error-title">
      <h2 id="error-title">Resource not found</h2>
      <p>The requested resource could not be found.</p>
      <a class="button" href="/resources">Browse resources</a>
    </section>
  `);
}

export function apiResourceList(resources) {
  return {
    data: resources,
    links: {
      self: "/api/resources",
      home: "/",
      html: "/resources"
    }
  };
}

export function apiResource(resource) {
  return {
    data: resource,
    links: {
      self: `/api/resources/${resource.id}`,
      html: `/resources/${resource.id}`,
      collection: "/api/resources",
      home: "/"
    }
  };
}

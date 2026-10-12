# StudyHub Project - CTEC2712

A JavaScript + Deno + Oak web application designed as a practical demonstration project for the CTEC2712 Web Application Development coursework.

## Requirements demonstrated

- HTML semantics: header, nav, main, section, article, footer, headings, labels and descriptions.
- Page layout: CSS Grid, Flexbox, responsive design, intrinsic sizing and nested elements.
- HTTP semantics: GET and POST routes, 200, 201, 400, 404 and 415 responses, forms, links and JSON API.
- Application architecture: MVC separation, routing and HATEOAS-style hypermedia links.

## Run

1. Install Deno.
2. Open this folder in VS Code.
3. Open the terminal.
4. Run:

   `deno task start`

5. Open `http://localhost:8000` in your browser.

## Useful routes

- `/` - home page
- `/resources` - all resources
- `/resources/subject/English` - English resources
- `/resources/subject/Maths` - Maths resources
- `/resources/subject/Computer%20Science` - Computer Science resources
- `/search?q=javascript` - search
- `/resources/1` - resource details
- `/api/resources` - JSON resource collection
- `POST /api/resources` - create a resource

## MVC

- `models/resourceModel.js` - data and resource operations
- `views/resourceViews.js` - HTML and JSON views
- `controllers/resourceController.js` - request handling and application logic
- `routes/resourceRoutes.js` - URL routing
- `app.js` - application/server entry point

For the videos, demonstrate the running application in the browser and connect each demonstration to the relevant code.

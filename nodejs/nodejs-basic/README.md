# Basic NodeJS Site

Using the first NodeJS project, I took the opportunity to explore using webpack to build backend services.  The result is a template that will continue to evolve as additional concepts are introduced during the NodeJS Odin Project track.  

Source: https://github.com/dis0ps-webdev/odin_project/tree/nodejs-basic

Template: https://github.com/dis0ps-webdev/backend-webpack-template

Live: https://nodejs-basic.odin.dis0ps.com

For this exercise the following was implemented:

* Full TypeScript for backend development
* ES6 classes to encapsulate server components
* Dynamic route table generation at startup
* Dynamic re-transpiling after changes to working code via `nodemon`
* Docker image builds using best practices
* Used Google Cloud Run's `Domain Mapping` capability to use an existing domain for the project.

## Signal Handling
Node is very low level, and as such does not handle signals for you as other executables might.  Breaks, kills, and other termination conditions may go unanswered if not accomodated in code.

Thankfully, process signals are treated as events, and can be responded to using a handler in [app.ts](src/app.ts):

```
process.on("SIGINT", handleSignals);
process.on("SIGTERM", handleSignals);
```

The `handleSignals` function logs the activity and does a clean `process.exit()`.

Note, this is also why within the [Dockerfile](Dockerfile) there is a need to use something like `dumb-init` otherwise signals aren't as cleanly passed to NodeJS within the container.

## Centralized Configuration

All configuration of the service is done through a single file in [AppConfig.ts](config/../src/config/AppConfig.ts).  Originally the routing table was defined in this file, but that seemed clunky to me, and found a way to dynamically generate the routing table.

## Dynamic Routing Table

The routing table is generated at service start by traversing the `public` folder recursively.  Each entry is added as a key to an object via it's relative path to `public` with the absolute path as it's value.  

Having to do this highlights the low-level nature of NodeJS, as there are no out-of-box libraries that do this without writing your own recursive function.

## Request and Response Logging

As this project was to be containerized, I thought it would be fun to add logging as to who visited the site.  This was done within [Router.ts](src/routes/Router.ts) via two functions calls:

```
private logRequest(req: http.IncomingMessage)
private logResponse(res: http.ServerResponse, filePath: string)
```

Pulling headers from the request or response allows us to log decent metadata around the visitor as well, including the `user-agent` used.
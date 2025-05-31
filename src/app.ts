import { log } from "node:console";
import { join } from "node:path";
import express from "express";
import cors from "cors";
import env from "./config/env.ts";

import RoutesHandler from "./routes/handler.ts";

const BASE_ROUTE = env.BASE_ROUTE || "/";

async function start() {
  const app = express();

  /* development mode start */
  if (env.NODE_ENV !== "production") {
    (async function () {
      const { default: livereload } = await import("livereload");
      const { default: connectLiveReload } = await import("connect-livereload");
      const liveReloadServer = livereload.createServer({
        originalPath: env.BASE_ORIGIN || "http://localhost",
        extraExts: ["ejs"],
      });
      liveReloadServer.watch([
        join(import.meta.dirname!, "public"),
        join(import.meta.dirname!, "views"),
      ]);
      app.use(connectLiveReload());
    })();
  }
  /* development mode end */

  // view engine
  app.set("view engine", "ejs");
  app.set("views", join(import.meta.dirname!, "views"));

  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    BASE_ROUTE,
    (req, res, next) => {
      res.locals.BASE_ROUTE = BASE_ROUTE === "/" ? "" : BASE_ROUTE;
      next();
    },
    RoutesHandler
  );
  app.use(BASE_ROUTE, express.static(join(import.meta.dirname!, "public")));

  app.listen(env.PORT || 3000, () => {
    log("Server running on http://localhost:" + (env.PORT || 3000));
  });
}

start();

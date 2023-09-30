import { log } from "console";
import { join } from "path";
import express from "express";
import cors from "cors";
import env from "./config/env";

import RoutesHanlder from "./routes/handler";

const BASE_ROUTE = env.BASE_ROUTE || "/";

async function start() {
	const app = express();

	/* development mode start */
	if (env.NODE_ENV !== "production") {
		(async function () {
			const { default: livereload } = await import("livereload");
			const { default: connectLiveReload } = await import("connect-livereload");
			const liveReloadServer = livereload.createServer();
			liveReloadServer.server.once("connection", () => {
				setTimeout(() => {
					log("refreshing browser...");
					liveReloadServer.refresh(BASE_ROUTE);
				}, 100);
			});
			app.use(connectLiveReload());
		})();
	}
	/* development mode end */

	// view engine
	app.set("view engine", "ejs");
	app.set("views", join(__dirname, "views"));

	// middlewares
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(
		BASE_ROUTE,
		(req, res, next) => {
			res.locals.BASE_ROUTE = BASE_ROUTE;
			next();
		},
		RoutesHanlder
	);
	app.use(BASE_ROUTE, express.static(join(__dirname, "public")));

	app.listen(env.PORT || 3000, () => {
		log("Server running on port " + (env.PORT || 3000));
	});
}

start();

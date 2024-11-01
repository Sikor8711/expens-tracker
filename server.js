import "jsr:@std/dotenv/load";
import express from "npm:express@5.0.1";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";
import morgan from "npm:morgan";
import api from "./src/routes/apiRouter.js";
import index from "./src/routes/indexRouter.js";
import auth from "./src/routes/authRouter.js";
import portal from "./src/routes/portalRouter.js";
import cookieParser from "npm:cookie-parser@1.4.7";
import livereload from "npm:livereload@0.9.3";
import connectLiveReload from "npm:connect-livereload@0.6.1";
import { jwtAuth, noTokenError } from "./src/controllers/AuthController.js";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const app = express();
const port = 5137;
const host = "192.168.1.247";
const liveReloadServer = livereload.createServer({
	exts: ["html", "css", "js", "ejs", "ts"], // Extensions to watch
	post: 35729,
	host: host,
});

app.set("view engine", "ejs");
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "src" directory
app.use(express.static(path.join(__dirname, "src/public")));
app.use(jwtAuth, noTokenError, index, api, auth, portal);

app.use(connectLiveReload());
// Start the server
app.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
});

liveReloadServer.watch(path.join(__dirname, "src/**/*"));
liveReloadServer.server.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh("/");
	}, 500);
});

import { Router } from "express";
import pages from "./pages/index.ts";

const RoutesHandler = Router();
RoutesHandler.use("/", pages);

export default RoutesHandler;

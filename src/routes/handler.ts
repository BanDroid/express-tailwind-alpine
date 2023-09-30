import { Router } from "express";
import pages from "./pages";

const RoutesHandler = Router();
RoutesHandler.use("/", pages);

export default RoutesHandler;

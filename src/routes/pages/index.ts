import { Router } from "express";

const pages = Router();

pages.get("/", (req, res) => {
  res.render("default", {
    ...res.locals,
    page: "home",
  });
});

export default pages;

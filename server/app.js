import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import path from "path";
import morgan from "morgan";

import expressLayouts from "express-ejs-layouts";

import "express-async-errors";

// import middlewares and routes
import router from "./apps/routes.js";

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// static files
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use("/static", express.static("public"));

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "views"));
app.use(expressLayouts);
app.set("layout", "components/layout");

// routes
app.use("/", router);


// start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open: http://localhost:${PORT}`);
});

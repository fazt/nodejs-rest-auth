import express from "express";
import morgan from "morgan";
import createError from "http-errors";

import authRoutes from "./routes/auth.routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.send("REST API");
});

app.use("/auth", authRoutes);

app.use(async (req, res, next) => {
  // const error = new Error('Not Found')
  // error.status = 404
  // next(error)
  // next(new createError.NotFound('This route does not exists'))
  next(new createError.NotFound());
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

export default app;

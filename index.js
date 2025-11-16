import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import Hello from "./Hello.js";
import db from "./Kambaz/Database/index.js";

import CourseRoutes from "./Kambaz/Courses/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameter.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";
import WorkingWithModules from "./Lab5/WorkingWithModules.js";
import WorkingWithObjects from "./Lab5/WorkingWithObject.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  }),
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.SERVER_ENV === "development") {
  sessionOptions.cookie = {
    sameSite: "lax",
    maxAge: 3600000,
  };
} else {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    maxAge: 3600000,
  };
}
app.use(session(sessionOptions));
const port = process.env.PORT || 4000;

app.use(express.json()); // if you parse JSON bodies
UserRoutes(app, db);
CourseRoutes(app, db);
ModuleRoutes(app, db);
EnrollmentRoutes(app, db);
Lab5(app);
Hello(app);
PathParameters(app);
QueryParameters(app);
WorkingWithObjects(app);
WorkingWithModules(app);
WorkingWithArrays(app);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

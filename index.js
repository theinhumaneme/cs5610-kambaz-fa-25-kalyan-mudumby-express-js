import cors from "cors";
import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameter.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";
import WorkingWithModules from "./Lab5/WorkingWithModules.js";
import WorkingWithObjects from "./Lab5/WorkingWithObject.js";

const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

app.use(express.json()); // if you parse JSON bodies
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

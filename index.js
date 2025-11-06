import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameter.js";
import WorkingWithObjects from "./Lab5/WorkingWithObject.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json()); // if you parse JSON bodies

Lab5(app);
Hello(app);
PathParameters(app);
QueryParameters(app);
WorkingWithObjects(app);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

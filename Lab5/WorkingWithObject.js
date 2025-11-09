const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: true,
  score: 0,
};
export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  const getAssignmentScore = (req, res) => {
    res.json(assignment.score);
  };
  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = newScore;
    res.json(assignment);
  };
  const getAssignmentStatus = (req, res) => {
    res.json(assignment.completed);
  };
  const setAssignmentStatus = (req, res) => {
    const { status } = req.params;
    console.log(status);
    assignment.completed = status;
    res.json(assignment);
  };
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
  app.get("/lab5/assignment/score", getAssignmentScore);
  app.get("/lab5/assignment/completed/:status", setAssignmentStatus);
  app.get("/lab5/assignment/completed", getAssignmentStatus);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
}

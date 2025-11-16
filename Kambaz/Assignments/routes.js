import AssignmentsDao from "./dao.js";
export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);
  const findAllAssignments = (req, res) => {
    const assignments = dao.findAllAssignments();
    res.send(assignments);
  };
  const createAssignment = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newAssignment = dao.createAssignment(req.body);
    res.json(newAssignment);
  };
  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.send(status);
  };
  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = dao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  };
  app.get("/api/assignment", findAllAssignments);
  app.put("/api/assignment/:assignmentId", updateAssignment);
  app.delete("/api/assignment/:assignmentId", deleteAssignment);
  app.post("/api/assignment/:courseId", createAssignment);
  app.get("/api/assignment/:courseId", findAllAssignments);
}

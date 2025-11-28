import AssignmentsDao from "./dao.js";
export default function AssignmentRoutes(app) {
  const dao = AssignmentsDao();
  const findAllAssignments = async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.send(assignments);
  };
  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.send(assignments);
  };
  const createAssignment = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const newAssignment = await dao.createAssignment({
      ...req.body,
      course: courseId,
    });
    res.json(newAssignment);
  };
  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.send(status);
  };
  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await dao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  };
  app.get("/api/assignment", findAllAssignments);
  app.put("/api/assignment/:assignmentId", updateAssignment);
  app.delete("/api/assignment/:assignmentId", deleteAssignment);
  app.post("/api/assignment/:courseId", createAssignment);
  app.get("/api/assignment/:courseId", findAssignmentsForCourse);
}

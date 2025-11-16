import { v4 as uuidv4 } from "uuid";
export default function AssignmentsDao(db) {
  function findAllAssignments() {
    return db.assignments;
  }
  function findAssignmentsForCourse(courseId) {
    const { assignments } = db;
    const courseAssignments = assignments.filter(
      (assignment) => assignment.course === courseId,
    );
    return courseAssignments;
  }
  function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }
  function deleteAssignment(assignmentId) {
    const { assignments, enrollments } = db;
    db.assignments = assignments.filter(
      (assignment) => assignment._id !== assignmentId,
    );
    db.enrollments = enrollments.filter(
      (enrollment) => enrollment.assignment !== assignmentId,
    );
  }
  function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = db;
    const assignment = assignments.find(
      (assignment) => assignment._id === assignmentId,
    );
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }

  return {
    findAllAssignments,
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}

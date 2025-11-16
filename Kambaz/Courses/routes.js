import EnrollmentsDao from "../Enrollments/dao.js";
import CoursesDao from "./dao.js";
export default function CourseRoutes(app, db) {
  const enrollmentsDao = EnrollmentsDao(db);
  const dao = CoursesDao(db);
  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  };
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = dao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    console.log(currentUser);
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  };
  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };
  const enrolledUsers = (req, res) => {
    const { courseId } = req.params;
    const users = enrollmentsDao.findEnrolledUsersForCourse(courseId);
    res.send(users);
  };
  const UnEnrollUser = (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    console.log(currentUser);
    const users = enrollmentsDao.unenrollUserFromCourse(
      currentUser._id,
      courseId,
    );
    res.send(users);
  };
  const EnrollUser = (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    console.log(currentUser);
    const users = enrollmentsDao.enrollUserInCourse(currentUser._id, courseId);
    res.send(users);
  };
  app.put("/api/courses/:courseId", updateCourse);

  app.delete("/api/courses/:courseId", deleteCourse);
  app.post("/api/users/current/courses", createCourse);

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:courseId/enrollments", enrolledUsers);
  app.delete("/api/courses/:courseId/unenroll", UnEnrollUser);
  app.post("/api/courses/:courseId/enroll", EnrollUser);
}

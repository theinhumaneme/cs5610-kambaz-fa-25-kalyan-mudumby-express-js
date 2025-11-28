import EnrollmentsDao from "../Enrollments/dao.js";
import CoursesDao from "./dao.js";
export default function CourseRoutes(app) {
  const enrollmentsDao = EnrollmentsDao();
  const dao = CoursesDao();
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  };
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await dao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const createCourse = async (req, res) => {
    const currentUser = await req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const newCourse = await dao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  };
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };
  const enrolledUsers = async (req, res) => {
    const { courseId } = req.params;
    const users = await enrollmentsDao.findEnrolledUsersForCourse(courseId);
    res.send(users);
  };
  const UnEnrollUser = async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    await enrollmentsDao.unenrollUserFromCourse(currentUser._id, courseId);
    const users = await enrollmentsDao.fetchAllEnrollments();
    res.send(users);
  };
  const EnrollUser = async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    console.log(currentUser);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, courseId);
    const users = await enrollmentsDao.fetchAllEnrollments();
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

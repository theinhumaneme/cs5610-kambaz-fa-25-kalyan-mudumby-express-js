import { v4 as uuidv4 } from "uuid";

import enrollmentModel from "../Enrollments/model.js";
import model from "./model.js";
export default function CoursesDao() {
  function findAllCourses() {
    return model.find({}, { name: 1, description: 1 });
  }

  async function findCoursesForEnrolledUser(userId) {
    const enrollments = await enrollmentModel.find({ user: userId });
    const courseIds = enrollments.map((enrollment) => enrollment.course);
    const courses = await model.find({ _id: { $in: courseIds } });
    return courses;
  }
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4().toString() };
    return model.create(newCourse);
  }
  async function deleteCourse(courseId) {
    await enrollmentModel.deleteMany({ course: courseId });
    return model.deleteOne({ _id: courseId });
  }
  function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}

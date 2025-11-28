import { v4 as uuidv4 } from "uuid";
import userModel from "../Users/model.js";
import model from "./model.js";
export default function EnrollmentsDao() {
  async function enrollUserInCourse(userId, courseId) {
    return await model.create({
      _id: uuidv4(),
      user: userId,
      course: courseId,
    });
  }
  async function unenrollUserFromCourse(userId, courseId) {
    return await model.deleteOne({ user: userId, course: courseId });
  }

  async function fetchAllEnrollments() {
    return await model.find();
  }
  async function findEnrolledUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId });
    const userIds = enrollments.map((enrollment) => enrollment.user);
    const enrolledUsers = await userModel.find({ _id: { $in: userIds } });
    return enrolledUsers;
  }
  return {
    enrollUserInCourse,
    findEnrolledUsersForCourse,
    unenrollUserFromCourse,
    fetchAllEnrollments,
  };
}

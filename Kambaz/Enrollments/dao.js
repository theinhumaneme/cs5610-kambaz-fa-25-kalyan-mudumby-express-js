import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    return enrollments;
  }
  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (enrollment) =>
        enrollment.user !== userId || enrollment.course !== courseId,
    );
    return db.enrollments;
  }

  function fetchAllEnrollments() {
    return db.enrollments;
  }
  function findEnrolledUsersForCourse(courseId) {
    const { users, enrollments } = db;
    const enrolledUsers = users.filter((user) =>
      enrollments.some(
        (enrollment) =>
          enrollment.course === courseId && enrollment.user === user._id,
      ),
    );

    console.log(enrolledUsers);
    return enrolledUsers;
  }
  return {
    enrollUserInCourse,
    findEnrolledUsersForCourse,
    unenrollUserFromCourse,
    fetchAllEnrollments,
  };
}

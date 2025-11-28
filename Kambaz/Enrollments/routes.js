import EnrollmentsDao from "../Enrollments/dao.js";
export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const fetchAllEnrollments = async (req, res) => {
    const enrollments = await dao.fetchAllEnrollments();
    res.json(enrollments);
  };
  app.get("/api/enrollments/", fetchAllEnrollments);
}

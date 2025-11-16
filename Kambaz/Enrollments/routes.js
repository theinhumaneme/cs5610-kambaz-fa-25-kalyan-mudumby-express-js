import EnrollmentsDao from "../Enrollments/dao.js";
export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const fetchAllEnrollments = (req, res) => {
    const modules = dao.fetchAllEnrollments();
    res.json(modules);
  };
  app.get("/api/enrollments/", fetchAllEnrollments);
}

import UsersDao from "./dao.js";
export default function UserRoutes(app, db) {
  const dao = UsersDao(db);
  // const createUser = (req, res) => { };
  // const deleteUser = (req, res) => { };
  // const findAllUsers = (req, res) => { };
  // const findUserById = (req, res) => { };
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    let currentUser = dao.findUserById(userId);
    res.json(currentUser);
  };

  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    req.session.save((err) => {
      if (err) {
        res.status(500).json({ message: "Unable to save session" });
        return;
      }
      res.json(currentUser);
    });
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      req.session.save((err) => {
        if (err) {
          res.status(500).json({ message: "Unable to save session" });
          return;
        }
        res.json(currentUser);
      });
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const profile = async (req, res) => {
    res.json(req.session["currentUser"]);
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  // app.post("/api/users", createUser);
  // app.get("/api/users", findAllUsers);
  // app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  // app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}

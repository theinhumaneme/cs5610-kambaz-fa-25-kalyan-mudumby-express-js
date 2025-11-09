const module = {
  id: 1,
  name: "NodeJS Module",
  description: "Create a NodeJS server with ExpressJS",
  couse: "Next.Js",
};
export default function WorkingWithModules(app) {
  const getModule = (req, res) => {
    res.json(module);
  };
  const getModuleTitle = (req, res) => {
    res.json(module.name);
  };
  const setModuleTitle = (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  };
  app.get("/lab5/module/name/:newName", setModuleTitle);
  app.get("/lab5/module/name", getModuleTitle);
  app.get("/lab5/module/", getModule);
}

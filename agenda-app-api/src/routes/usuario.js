module.exports = app => {
    app.post("/usuario", app.controllers.usuarioController.create);
    app.get("/usuario/:id", app.controllers.usuarioController.readById);
    app.put("/usuario", app.controllers.usuarioController.update);
    app.delete("/usuario/:id", app.controllers.usuarioController.delete);
}
module.exports = app => {
    app.post("/contato", app.controllers.contatoController.create);
    app.get("/contato/all/:filter?", app.controllers.contatoController.readAll);
    app.get("/contato/:id", app.controllers.contatoController.readById);
    app.put("/contato", app.controllers.contatoController.update);
    app.delete("/contato/:id", app.controllers.contatoController.delete);
}
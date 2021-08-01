module.exports = app => {
    app.post("/agenda", app.controllers.agendaController.create);
    app.get("/agenda/all/:filter?", app.controllers.agendaController.readAll);
    app.get("/agenda/:id", app.controllers.agendaController.readById);
    app.put("/agenda", app.controllers.agendaController.update);
    app.delete("/agenda/:id", app.controllers.agendaController.delete);
}
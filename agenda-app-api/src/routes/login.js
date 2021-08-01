module.exports = app => {
    app.post("/login", app.controllers.loginController.login);
}
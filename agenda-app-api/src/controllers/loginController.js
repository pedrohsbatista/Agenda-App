module.exports = app => {
    let usuarioModel = app.resources.mongoose.model("Usuario");

    const loginController = {};

    loginController.login = async (req, res) => {
        try{
            let usuario = await usuarioModel.findOne({email: req.body.email});            
            if(usuario && await app.resources.encryption.validate(req.body.senha, usuario.senha)) {
                let payload = {
                    id: usuario.id,
                    nome: usuario.nome
                };          

                let token = app.get("jwt").sign(payload, process.env.jwtSecret, { expiresIn: 60 * 60 * 24 })

                var result = {
                    token: token,
                    usuario: payload
                };

                res.send(result);
            } else {
                res.status(404).send("E-mail e/ou Senha inválida");
            }
        }
        catch (error) {
            res.status(500).send(error);
        }
    };

    return loginController;
}
module.exports = app => {
    let usuarioModel = app.resources.mongoose.model("Usuario");
    let agendaModel = app.resources.mongoose.model("Agenda");
    let contatoModel = app.resources.mongoose.model("Contato");

    const usuarioController = {};

    usuarioController.create = async (req, res) => {
        try{
            let usuario = new usuarioModel(req.body);  
            if(usuario.senha) {
                usuario.senha = await app.resources.encryption.encrypt(usuario.senha);
            }           
            let ok = await usuarioModel.create(usuario);
            if (ok) {
                res.send(ok);
            } else {
                res.status(500).send("Erro ao cadastrar");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    };

    usuarioController.readById = async (req, res) => {
        try {
            let usuario = await usuarioModel.findById(req.params.id);
            if(usuario) {
                res.send(usuario);
            } else {
                res.status(404).send("Registro não encontrado");
            }           
        } catch (error) {
            res.status(500).send(error);
        }
    };

    usuarioController.update = async (req, res) => {
        try {
            let usuario = req.body;
            if(usuario.senha) {
                usuario.senha = await app.resources.encryption.encrypt(usuario.senha);
            }
            let ok = await usuarioModel.findByIdAndUpdate(usuario.id, { $set: usuario },  { runValidators: true, new: true });
            if (ok) {
                res.send(ok);
            } else {
                res.status(500).send("Erro ao atualizar");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    };

    usuarioController.delete = async (req, res) => {
        try {
            let ok = await usuarioModel.findByIdAndDelete(req.params.id);
            if (ok) {
                await agendaModel.deleteMany({usuarioId: req.params.id });
                await contatoModel.deleteMany({usuarioId: req.params.id });
                res.send(ok);
            } else {
                res.status(500).send("Erro ao excluir");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    };

    return usuarioController;
}
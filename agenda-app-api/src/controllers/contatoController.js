module.exports = app => {
    let contatoModel = app.resources.mongoose.model("Contato");

    const contatoController = {};

    contatoController.create = async (req, res) => {
        try{
            let contato = new contatoModel(req.body);
            contato.usuarioId = req.usuario.id;
            let ok = await contatoModel.create(contato);
            if (ok) {
                res.send(ok);
            } else {
                res.status(500).send("Erro ao cadastrar");
            }
        } catch (error){
            res.status(500).send(error);
        }
    };

    contatoController.readAll = async (req, res) => {
        try{
            var filter = req.params.filter ?  { usuarioId: req.usuario.id, nome : { $regex : new RegExp(req.params.filter, "i") } } : {usuarioId: req.usuario.id}; 
            let contatos = await contatoModel.find(filter);
            res.send(contatos);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    contatoController.readById = async (req, res) => {
        try{
            let contato = await contatoModel.findOne({ usuarioId: req.usuario.id, _id: req.params.id });
            if (contato) {
                res.send(contato);
            } else {
                res.status(404).send("Registro não encontrado");
            }
        } catch (error) {
            res.status(500).send(error);
        } 
    };

    contatoController.update = async (req, res) => {
        try {
            let contato = req.body;
            contato.usuarioId = req.usuario.id;
            let ok = await contatoModel.findOneAndUpdate({usuarioId: contato.usuarioId, _id: contato.id}, contato, { runValidators: true, new: true });
            if (ok) {
                res.send(ok);
            } else {
                res.status(500).send("Erro ao atualizar");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    };

    contatoController.delete = async (req, res) => {
        try {
            let ok = await contatoModel.findOneAndDelete({ usuarioId: req.usuario.id, _id: req.params.id });
            if (ok) {
                res.send(ok);
            } else {
                res.status(500).send("Erro ao excluir");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    };

    return contatoController;
}
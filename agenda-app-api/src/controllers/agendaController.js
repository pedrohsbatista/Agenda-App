module.exports = app => {
    let agendaModel = app.resources.mongoose.model("Agenda");

    const agendaController = {};

    agendaController.create = async (req, res) => {
        try {
          let agenda = new agendaModel(req.body);
          agenda.usuarioId = req.usuario.id;
          let ok = await agendaModel.create(agenda);
          if(ok) {
            res.send(ok);  
          } else {
            res.status(500).send("Erro ao cadastrar");
          }                 
        } catch (error) {
            res.status(500).send(error);
        }
    };

    agendaController.readAll = async (req, res) => {
        try{            
            var filter = req.params.filter ? { usuarioId: req.usuario.id, dataAgendamento : new Date(req.params.filter) } : {usuarioId: req.usuario.id};
            let agendas = await agendaModel.find(filter);
            res.send(agendas);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    agendaController.readById = async (req, res) => {
        try{
          let agenda = await agendaModel.findOne({ usuarioId: req.usuario.id, _id: req.params.id });
          if(agenda){
            res.send(agenda);
          } else {
            res.status(404).send("Registro não encontrado");
          }          
        } catch (error) {
           res.status(500).send(error);
        }
    };

    agendaController.update = async (req, res) => {
        try{
          let agenda = req.body;
          agenda.usuarioId = req.usuario.id;          
          let ok = await agendaModel.findOneAndUpdate({ usuarioId: agenda.usuarioId, _id: agenda.id }, agenda, { runValidators: true, new: true });
          if(ok) {
            res.send(ok);
          } else {
            res.status(500).send("Erro ao atualizar");
          }          
        } catch (error){
            res.status(500).send(error);
        }
    };

    agendaController.delete = async (req, res) => {
        try{
            let ok = await agendaModel.findOneAndDelete({ usuarioId: req.usuario.id, _id: req.params.id });
            if(ok) {
                res.send(ok);
            } else {
                res.status(500).send("Erro ao excluir");
            }            
        } catch (error) {
            res.status(500).send(error);
        }
    };

    return agendaController;
}
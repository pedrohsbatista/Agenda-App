module.exports = app => {
    let AgendaSchema = app.resources.mongoose.Schema({
        dataAgendamento:{
            type: Date,
            required: [true, "O campo data do agendamento é obrigatório"]
        },
        descricao: {
            type: String,
            required: [true, "O campo descrição é obrigatório"],
            maxlength: [100, "O campo descrição deve ter no máximo 100 caracteres"]
        },
        usuarioId: {
            type: String,
            required: [true, "O campo usuarioId é obrigatório"]
        }
    })

    app.resources.mongoose.model("Agenda", AgendaSchema);
}
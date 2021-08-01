module.exports = app => {
    let ContatoSchema = app.resources.mongoose.Schema({
        nome: {
            type: String,
            required: [true, "O campo nome é obrigatório"],
            maxlength: [100, "O campo nome deve ter no máximo 100 caracteres"]
        },
        email: {
           type: String,
           maxlength: [100, "O campo e-mail deve ter no máximo 100 caracteres"]
        },
        telefone: {
           type: String,
           maxlength: [10, "O campo telefone deve ter no máximo 10 caracteres"]
        },
        celular: {
            type: String,
            maxlength: [11, "O campo celular deve ter no máximo 11 caracteres"]
        },
        usuarioId: {
            type: String,
            required: [true, "O campo usuarioId é obrigatório"]
        }
    })

    app.resources.mongoose.model("Contato", ContatoSchema);
}
module.exports = app => {
    let UsuarioSchema = app.resources.mongoose.Schema({
        nome: {
            type: String,
            required: [true, "O campo nome é obrigatório"],
            maxlength: [100, "O campo nome deve ter no máximo 100 caracteres"]
        },
        email: {
            type: String,
            required: [true, "O campo e-mail é obrigatório"],
            maxlength: [100, "O campo e-mail deve ter no máximo 100 caracteres"]
        },
        senha: {
            type: String,
            required: [true, "O campo senha é obrigatório"],        
            private: true
        }
    })

    app.resources.mongoose.model("Usuario", UsuarioSchema);
}
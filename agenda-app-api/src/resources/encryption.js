const bcrypt = require('bcrypt');

module.exports = app => {
    return {
        encrypt: async (senha) => {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(senha, salt);
        },
        validate: async (senha, senhaEncrypted) => {
            return await bcrypt.compare(senha, senhaEncrypted);            
        }
    }
}
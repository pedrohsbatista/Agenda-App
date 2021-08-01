module.exports = app => {
    app.use((req, res, next) => {
        if(req.url == "/login" || (req.url.includes("/usuario") && req.method == "POST")){            
            next();
        } else {
            let token = req.headers.authorization;
            if(!token){
                res.status(500).send("Requisição sem token");
            } else {
                app.get("jwt").verify(token, process.env.jwtSecret, (err, decoded) => {
                    if (err) {
                        res.status(500).send("Token inválido");
                    } else {
                        req.usuario = decoded;                        
                        next();
                    }
                })
            }
        }
    })
}
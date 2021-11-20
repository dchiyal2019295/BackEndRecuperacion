const mongoose = require("mongoose");
const app = require("./app");
var controladorAdmin = require("./src/controladores/usuario.controller")

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Sucursales',{useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{

    console.log('Conectado a la base de datos');

    controladorAdmin.Admin();

    app.listen(3000, function(){
        console.log('El servidor Corriendo en el puerto 3000')
    })

}).catch(err => console.log(err));
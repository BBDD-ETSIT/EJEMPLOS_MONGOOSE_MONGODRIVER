var mongoose = require('mongoose');
var User = mongoose.model('User');

// Comprueba si el usuario esta registrado en users
// Si autenticación falla o hay errores devuelve null
const autenticar = async function(login, password) {
    try {
      let user = await User.findOne({username: login });
      if (user) {  
        if(user.verifyPassword(password)){
          return user;
        }
        else { 
          console.log('Password erróneo.');
          return null; 
        }
      } else{
        console.log('No existe el usuario.');
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
};

// Middleware: Login required.
//
// If the user is logged in previously then there will exists
// the req.session.loginUser object, so I continue with the others
// middlewares or routes.
// If req.session.loginUser does not exist, then nobody is logged,
// so I redirect to the login screen.
exports.loginRequired = function(req, res, next){
    if (req.session.user) {
        next();
    } else {
        console.log("Info: Login required: log in and retry.");
        res.redirect('/login');
    }
};




// Get /login   -- Formulario de login
exports.new = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sessions/new', {errors: errors});
};

// POST /login   -- Crear la sesion si usuario se autentica
exports.create = async function(req, res) {

    let login     = req.body.login;
    let password  = req.body.password;

    const user = await autenticar(login, password);

    if(user){
        console.log("Usuario autenticado: " + user.username);
        // Crear req.session.user y guardar campos id y username
        // La sesión se define por la existencia de: req.session.user
        req.session.user = {id:user.id, username:user.username, isAdmin:user.isAdmin};
        res.redirect(req.session.redir.toString()); // redirección a path anterior a login
    } else {
        console.log("Usuario no autenticado.");
        res.redirect("/login");        
        return;
    }
};

// DELETE /logout   -- Destruir sesion 
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};
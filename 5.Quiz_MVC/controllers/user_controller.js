var mongoose = require('mongoose');
var User = mongoose.model('User');

// MW que permite acciones solamente si el usuario objeto corresponde con el usuario logeado o si es cuenta admin
exports.ownershipRequired = function(req, res, next){
    var objUser = req.user.id;
    var logUser = req.session.user.id;
    var isAdmin = req.session.user.isAdmin;
    
    if (isAdmin || objUser === logUser) {
        next();
    } else {
        res.redirect('/');
    }
};

// Autoload :id
exports.load = async function(req, res, next, userId) { 
  var options = { _id : userId };
  console.log("Load del user con id: " + userId);

  try {
    let user = await User.findOne(options);
    if (!user) return next(new Error('No existe userId=' + quizId));
    console.log("Usuario cargado con username: " + user.username);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};


// GET /user/:id/edit
exports.edit = function(req, res) {
  res.render('user/edit', { user: req.user, errors: []});
};            // req.user: instancia de user cargada con autoload


// GET /user
exports.new = function(req, res) {
    var user = new User({username: ""});
    res.render('user/new', {user: user, errors: []});
};


// POST /user
exports.create = async function(req, res) {
    var user = new User(req.body.user);
    try {
      let saved_user = await user.save();
      // crea la sesión para que el usuario acceda ya autenticado y redirige a /
      req.session.user = {id: saved_user.id, username: saved_user.username};
      res.redirect('/');
    } catch (error) {
      console.log(error);
      res.render('user', {user: user, errors: error.errors});
    }
};

// PUT /user/:id
exports.update = async function(req, res, next) {
  req.user.username  = req.body.user.username;
  req.user.password  = req.body.user.password;

  try {
    let saved_user = await req.user.save();
    req.session.user = {id: saved_user.id, username: saved_user.username};
    res.redirect('/');
  } catch (error) {
    console.log(error);
    return next( err );
  }
};

// DELETE /user/:id
exports.destroy = async function(req, res, next) {
  try {
    await req.user.deleteOne();
    // borra la sesión y redirige a /
    delete req.session.user;
    res.redirect('/');
  } catch (error) {
    console.log(error);
    return next( err );
  }
};

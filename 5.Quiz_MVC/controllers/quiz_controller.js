var mongoose = require('mongoose');
var Quiz = mongoose.model('Quiz');
var User = mongoose.model('User');


// MW que permite acciones solamente si el quiz objeto pertenece al usuario logeado o si es cuenta admin
exports.ownershipRequired = function(req, res, next){
    var objQuizOwner = req.quiz.autor.id;
    var logUser = req.session.user.id;
    var isAdmin = req.session.user.isAdmin;

    if (isAdmin || objQuizOwner === logUser) {
        next();
    } else {
        res.redirect('/');
    }
};

// Autoload :id
exports.load = async function(req, res, next, quizId) {
  var options = { _id : quizId };
  console.log("Load del quiz con id: " + quizId);

  try {
    let quiz = await Quiz.findOne(options);
    if (!quiz) return next(new Error('No existe quizId=' + quizId));
    console.log("Quiz cargado con pregunta: " + quiz.pregunta);
    req.quiz = quiz;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// GET /quizes
// GET /users/:userId/quizes
exports.index = async function(req, res) {  
  var options = {};
  if(req.user){
    options = {"autor.id": req.user.id}
  }
  
  try {
    let quizzes = await Quiz.find(options);
    res.render('quizes/index.ejs', {quizes: quizzes, errors: []});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: []});
};            // req.quiz: instancia de quiz cargada con autoload

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render(
    'quizes/answer', 
    { quiz: req.quiz, 
      respuesta: resultado, 
      errors: []
    }
  );
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = {pregunta: "Pregunta", respuesta: "Respuesta"};

  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = async function(req, res) {
  req.body.quiz.autor = {id: req.session.user.id, username: req.session.user.username};  
  var quiz = new Quiz( req.body.quiz );

  try {
    let saved_quiz = await quiz.save();
    console.log("Salvado el quiz con pregunta:" + saved_quiz.pregunta)
    res.redirect('/quizes');
  } catch (error) {
    console.log(error);
    return res.render('quiz', {
      errors: err.errors,
      quiz: quiz
    });
  }

};


// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;  // req.quiz: autoload de instancia de quiz

  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = async function(req, res, next) {  
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  var quiz = req.quiz;

  try {
    let saved_quiz = await quiz.save();
    console.log("Salvado el quiz con pregunta:" + saved_quiz.pregunta)
    res.redirect('/quizes');
  }	catch (error) {
    console.log(error);
    return next( error );
  }
};


// DELETE /quizes/:id
exports.destroy = async function(req, res, next) {
  try {
    let removed_quiz = await req.quiz.deleteOne();
    console.log("Borrado el quiz con pregunta:" + removed_quiz.pregunta)
    res.redirect('/quizes');
  } catch (error) {
    console.log(error);
    return next( error );
  }
};


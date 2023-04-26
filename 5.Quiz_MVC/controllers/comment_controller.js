var mongoose = require('mongoose');
var Quiz = mongoose.model('Quiz');
var User = mongoose.model('User');


// MW que permite acciones solamente si el quiz al que pertenece el comentario objeto pertenece al usuario logeado o si es cuenta admin
exports.ownershipRequired = function(req, res, next){    
    if (req.quiz) {
        var objQuizOwner = req.quiz.autor.id;
        var logUser = req.session.user.id;
        var isAdmin = req.session.user.isAdmin;

        console.log(objQuizOwner, logUser, isAdmin);

        if (isAdmin || objQuizOwner === logUser) {
            next();
        } else {
            res.redirect('/');
        }
    }
};

// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = async function(req, res) {
  var comment = { texto: req.body.comment.texto, publicado: false, autor: {id: req.session.user.id, username: req.session.user.username}};

  req.quiz.comments.push(comment);

  try {
    let saved_quiz = await req.quiz.save();
    console.log("Salvado el comentario");
    res.redirect('/quizes/'+saved_quiz.id);
  } catch (error) {
    console.log(error);
    return res.render('comments/new.ejs', {comment: comment, errors: error.errors});
  }
};


// GET /quizes/:quizId/comments/:commentId/publish
//commentId es el orden en el array
exports.publish = async function(req, res, next) {
  req.quiz.comments[req.params["commentId"]].publicado = true;

  try {
  let saved_quiz = await req.quiz.save();
  console.log("Publicado el comentario");
  res.redirect('/quizes/'+saved_quiz.id);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

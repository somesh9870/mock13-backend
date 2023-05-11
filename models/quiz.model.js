const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    creator: String,
    title: String,
    description: String,
    userID: String,
    questions: [
      {
        title: String,
        answerOptions: [],
        correctOptions: [],
      },
    ],
  },
  {
    versionKey: false,  
  }
);

const QuizModel = mongoose.model("quiz", quizSchema);

module.exports = QuizModel;

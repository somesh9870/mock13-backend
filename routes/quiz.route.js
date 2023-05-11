const express = require("express");
const QuizModel = require("../models/quiz.model");
const auth = require("../middlewares/auth.middleware");

const quizRouter = express.Router();

// to get all the quizes
quizRouter.get("/", auth, async (req, res) => {
  const { userID } = req.body;
  try {
    const quiz = await QuizModel.find();
    res.status(200).send({ data: quiz, userID: userID });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// to post a quiz
quizRouter.post("/add", auth, async (req, res) => {
  const payload = req.body;
  try {
    const quiz = new QuizModel(payload);
    await quiz.save();
    res.status(200).send({ msg: "Quiz has been added successfully" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// for updating the quiz
quizRouter.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    await QuizModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ msg: "Quiz has been updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// for deleting the quiz
quizRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await QuizModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Quiz has been deleted" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = quizRouter;

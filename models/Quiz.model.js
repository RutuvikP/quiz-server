const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    creator: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorID: { type: String, required: true },
    questions: [{
        title: { type: String, required: true },
        answerOptions: { type: Array, required: true, default: [] },
        correctOptions: { type: Array, required: true, default: [] },
    }],
    leaderboard: [{ email: { type: String, required: true }, score: { type: Number, required: true } }]
})

const QuizModel = mongoose.model('quiz', quizSchema);

module.exports = { QuizModel };
import mongoose from 'mongoose';
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answerType: {
        type: String,
        enum: ['text', 'singleChoice', 'multipleChoice'],
        required: true
    },
    choices: [{
        _id: Schema.Types.ObjectId,
        text: { type: String, required: true }
    }]
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;

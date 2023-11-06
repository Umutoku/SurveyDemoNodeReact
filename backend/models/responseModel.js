import mongoose from 'mongoose';
const { Schema } = mongoose;

const SurveyResponseSchema = new Schema({
    surveyID: {
        type: Schema.Types.ObjectId,
        ref: 'Survey',
        required: true
    },
    respondentName: {
        type: String,
        required: true
    },
    respondentNumber: {
        type: String,
        required: true
    },
    answers: [{
        questionID: {
            type: Schema.Types.ObjectId,
            required: true
        },
        value: {
            type: String, // Cevapları bir dize olarak saklayalım
            required: true
        }
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String
    }
});

const SurveyResponse = mongoose.model('SurveyResponse', SurveyResponseSchema);

export default SurveyResponse;

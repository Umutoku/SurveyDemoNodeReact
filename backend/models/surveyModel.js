import mongoose from 'mongoose';
const { Schema } = mongoose;

const SurveySchema = new Schema({
    title:  {type: String, required: true},
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    questionnaires: [{ type: Schema.Types.ObjectId, ref: 'Question' }],  // Question modellerini referans alacak bir dizi
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Survey = mongoose.model('Survey', SurveySchema);

export default Survey;

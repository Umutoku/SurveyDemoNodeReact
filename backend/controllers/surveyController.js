import Survey from '../models/surveyModel.js';
import Question from '../models/questionModel.js';

// Yeni bir anket oluştur
const createSurvey = async (req, res) => {
  try {
    // gelen soruları modele göre mapliyoruz
    const questionIds = req.body.questions 
      ? (await Question.insertMany(req.body.questions)).map(q => q._id)
      : [];

    const newSurvey = await Survey.create({
      ...req.body,
      user: req.body.userId, //res.local.user,  bu isteği ui'da aldığımız tokenden söktüğümüz user id ile veriyoruz
      questionnaires: questionIds
    });
    res.status(201).json(newSurvey);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while creating the survey.' });
  }
};

// ID ile anketi güncelle
const updateSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey || survey.user.toString() !== req.user.id) 
      return res.status(403).json({ message: 'Unauthorized' });

    const updatedQuestions = await Promise.all(req.body.questions.map(async q => {
      if (q._id) return (await Question.findByIdAndUpdate(q._id, q, { new: true }))._id;
      return (await Question.create(q))._id;
    }));

    survey.set({ ...req.body, questionnaires: updatedQuestions });
    await survey.save();

    res.json(survey);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the survey.' });
  }
};

// ID ile anketi sil
const deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey || survey.user.toString() !== req.user.id) 
      return res.status(403).json({ message: 'Unauthorized' });

    await survey.remove();
    res.json({ message: 'Survey deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the survey.' });
  }
};

// Tüm anketleri getir
const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find().populate('questionnaires');
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching surveys.' });
  }
};

const getSurveyById = async (req, res) => {
  try {
    // urlden aldığımız id ile anketi buluyoruz
    const survey = await Survey.findById(req.params.id).populate('questionnaires');
    if (!survey) {
      return res.status(404).json({ message: 'Anket bulunamadı.' });
    }
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the survey.' });
  }
};

export {
  createSurvey,
  updateSurvey,
  deleteSurvey,
  getAllSurveys,
  getSurveyById
};

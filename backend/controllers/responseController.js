import Response from '../models/responseModel.js';

// Yeni bir yanıt oluştur
const createResponse = async (req, res) => {
  try {
    const { surveyID, respondentName, respondentNumber, answers, ipAddress } = req.body;
    // question ayrı şema olduğu için map ile ayrı ayrı alıyoruz
    const responseAnswers = answers.map(answer => {
      const { questionID, value } = answer;
      return {
        questionID,
        value,
      };
    });

    const newResponse = new Response({
      surveyID,
      respondentName,
      respondentNumber,
      answers: responseAnswers,
      ipAddress: ipAddress, // react tarafından gönderdiğimiz istek sayesinde ip alıyoruz. Bu ip sayesinde response edebiliriz yanıtımızı
    });

    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Yanıt oluşturulurken bir hata oluştu.' });
  }
};

// Yanıtları getir
const getResponses = async (req, res) => {
  try {
    const responses = await Response.find()
      .populate('surveyID', 'title')
      .populate('answers.questionID', 'question')
    // populate sayesinde surveyID ve questionID'lerin title ve question bilgilerini getiriyoruz.
    res.status(200).json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching responses.' });
  }
};

const getResponsesBySurveyId = async (req, res) => {
  // 2req.params içerisinden surveyId'yi alıyoruz
  const surveyId  = req.params.id;

  try {
    // `Response` modelini kullanarak, belirli bir surveyID'ye sahip yanıtları buluyoruz.
    const responses = await Response.find({ surveyID: surveyId })
      .populate('surveyID', 'title') // İlgili anketin başlığını getiriyoruz
      .populate('answers.questionID', 'question'); // Her bir yanıtın sorusunu getiriyoruz

    // Eğer yanıt yoksa, 404 durum kodu ile bir mesaj gönderiyoruz.
    if (!responses || responses.length === 0) {
      return res.status(404).json({ message: 'Responses for the given survey ID were not found.' });
    }

    // Yanıtları başarılı bir şekilde bulduysak, bunları JSON formatında geri dönüyoruz.
    res.status(200).json(responses);
  } catch (error) {
    // Herhangi bir hata meydana gelirse, hatayı log'luyoruz ve
    // 500 durum kodu ile bir hata mesajı gönderiyoruz.
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching responses for the given survey ID.' });
  }
};


// Yanıtı düzenle (IP adresine göre)
const updateResponseByIP = async (req, res) => {
  try {
    const { ipAddress } = req.body;
    const updatedResponse = await Response.findOneAndUpdate({ ipAddress }, req.body, { new: true });
    res.json(updatedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the response.' });
  }
};

// Yanıtı sil (IP adresine göre)
const deleteResponseByIP = async (req, res) => {
  try {
    const { ipAddress } = req.body;
    await Response.findOneAndRemove({ ipAddress });
    res.json({ message: 'Response deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the response.' });
  }
};

export {
  createResponse,
  getResponses,
  updateResponseByIP,
  deleteResponseByIP,
  getResponsesBySurveyId
};

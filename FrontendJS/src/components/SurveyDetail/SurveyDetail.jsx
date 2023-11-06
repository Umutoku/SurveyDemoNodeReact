import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/apiHelper';
import './surveydetail.css'; // CSS dosyasını ekledik

function SurveyDetail() {
  const [survey, setSurvey] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // burada useEffect kullanarak anket detaylarını API üzerinden getiriyoruz
  useEffect(() => {
    // API üzerinden belirli bir anketi getir
    const fetchSurveyDetail = async () => {
      try {
        const response = await api.get(`/surveys/${id}`);
        setSurvey(response.data);
      } catch (error) {
        console.error('Anket detaylarını getirirken bir hata oluştu!', error);
      }
    };

    fetchSurveyDetail();
  }, [id]);

  // burada anket yanıt formuna yönlendirme yapıyoruz
  const redirectToResponseForm = () => {
    navigate(`/response/${id}`, { state: { survey } });
  };

 // burada anket listesine yönlendirme yapıyoruz
  const handleBack = () => {
    navigate(-1);
  }
  

  return (
    <div className="survey-detail-container">
      <button onClick={handleBack} className='back-btn-detail'>

<i className="fa-solid fa-arrow-left"></i>
</button>
      {survey ? (
        <div className="survey-detail-content"> {/* CSS sınıfını ekledik */}
          <h1>{survey.title} <i className="fa-solid fa-question"></i></h1>
          <ul>
            {survey.questionnaires.map((question, index) => (
              <li key={question._id}>
                <p>{question.question}</p>
                {question.answerType === "singleChoice" && (
                  <ul>
                    {question.choices.map((choice, choiceIndex) => (
                      <li key={choiceIndex}>{choice.text}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button onClick={redirectToResponseForm}>Ankete Yanıtla</button>
        </div>
      ) : (
        <p>Anket yükleniyor...</p>
      )}
    </div>
  );
}

export default SurveyDetail;

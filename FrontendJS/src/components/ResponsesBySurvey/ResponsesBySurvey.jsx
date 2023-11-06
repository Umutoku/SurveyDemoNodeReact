
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './responsesbysurvey.css'; // Yeni bir CSS dosyası ekleyebilirsiniz.
import { useNavigate } from 'react-router-dom';
import api from '../../utils/apiHelper';

function ResponsesBySurvey() {
  const [responses, setResponses] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // API'den yanıtları çekme işlemi
    const fetchResponses = async () => {
      try {
        const response = await api.get(`/responses/${id}`);
        setResponses(response.data);
      } catch (error) {
        console.error('Anket yanıtlarını getirirken bir hata oluştu!', error);
      }
    };

    fetchResponses();
  }, [id]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }
  

  return (
    <div className="responses-container">
        <button onClick={handleBack} className='back-btn-responses'>

<i className="fa-solid fa-arrow-left"></i>
</button>
      <h1>Anket Yanıtları</h1>
      {responses.length > 0 ? (
        <ul>
          {responses.map((response) => (
            <li key={response._id}>
              <h2>{response.surveyID.title}</h2>
              <ul>
                {response.answers.map((answer) => (
                  <li key={answer.questionID._id}>
                    <p>Soru: {answer.questionID.question}</p>
                    <p>Cevap: {Array.isArray(answer.value) ? answer.value.join(', ') : answer.value}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz yanıt yok ya da yanıtlar yükleniyor...</p>
      )}
    </div>
  );
}

export default ResponsesBySurvey;

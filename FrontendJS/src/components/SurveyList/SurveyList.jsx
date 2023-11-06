import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/apiHelper';
import './surveylist.css';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // API üzerinden tüm anketleri getir
    const fetchSurveys = async () => {
      try {
        const response = await api.get('/surveys/');
        setSurveys(response.data);
      } catch (error) {
        console.error('Anketleri getirirken bir hata oluştu!', error);
      }
    };

    fetchSurveys();
  }, []);

  const handleViewResponses = (surveyId) => {
    navigate(`/responsesBySurvey/${surveyId}`); // burada surveyId'yi kullanarak yönlendirme yapıyoruz
  };


  
  return (
    <div>
      
      {!surveys && <>
     <h4>Loading..</h4>
     </> }
      <h1 className='survey-title'>Anket Listesi</h1>
      <div className="survey-list-container">
      <ul>
        {surveys.map(survey => (
          <li key={survey._id}>
            <span title='Anketi Görüntüle' className="link-space">
              <Link to={`/survey/${survey._id}`}>{survey.title}</Link>
            </span>
            <button title='Cevapları Görüntüle' onClick={() => handleViewResponses(survey._id)}>

            <i className="fa-solid fa-eye"></i>
            </button>   
          </li>
        ))}
      </ul>
    </div>

    </div>
   
  );
  
}

export default SurveyList;

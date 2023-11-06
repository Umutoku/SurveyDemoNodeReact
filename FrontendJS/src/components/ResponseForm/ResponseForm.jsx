import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './responseform.css'; // CSS dosyasını ekledik
import api from '../../utils/apiHelper';

function ResponseForm() {
  // const [responses, setResponses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const survey = location.state.survey;
  const [userIP, setUserIP] = useState('');

  useEffect(() => {
    // useEffect içinde asenkron bir IIFE (Immediately Invoked Function Expression) kullanılıyor
    (async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        console.log("IP adresi alındı", response.data.ip);
        setUserIP(response.data.ip);
      } catch (error) {
        console.error("IP adresi alınamadı", error);
        setUserIP('IP alınamadı');
      }
    })();
  }, []);

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = {
      surveyID: survey._id,
      respondentName: event.target.respondentName.value,
      respondentNumber: event.target.respondentNumber.value,
      answers: [],
      ipAddress: userIP, // IP adresini burada kullanıyoruz
    };
    survey.questionnaires.forEach((question, index) => {
      let answer = {};

      if (question.answerType === "text") {
        answer = {
          questionID: question._id,
          value: event.target[`text_${index}`].value,
        };
      } else if (question.answerType === "singleChoice") {
        answer = {
          questionID: question._id,
          value: event.target[`choice_${index}`].value,
        };
      } else if (question.answerType === "multipleChoice") {
        answer = {
          questionID: question._id,
          value: [],
        };
        // Seçilen tüm kutucukları al
        const checkboxElements = document.getElementsByName(`checkbox_${index}`);
        for (let i = 0; i < checkboxElements.length; i++) {
          if (checkboxElements[i].checked) {
            answer.value.push(checkboxElements[i].value);
          }
        }
      }

      response.answers.push(answer);
    });

    // Axios ile API'ye istek gönderme
    api
      .post('/responses/create', response) // API endpointinizi ve veriyi gönderme yöntemini burada belirtin
      .then((response) => {
        // Yanıt işlemi tamamlandığında kullanıcıyı başka bir sayfaya yönlendirin (örneğin, anket listesine)
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleBack = () => {
    navigate(-1);
  }
  
  

  return (
    <div className="response-form-container">
        <button onClick={handleBack} className='back-btn'>

<i className="fa-solid fa-arrow-left"></i>
</button>
      <h1>Anket Yanıtla</h1>
      <form onSubmit={handleSubmit}>
        <input className='fullname' type="text" name="respondentName" placeholder="Ad Soyad" required />
        <input className='number' type="text" name="respondentNumber" placeholder="Numara" required />
        <ul>
          {survey?.questionnaires?.map((question, index) => (
            <li key={question._id}>
              <label>{question.question}</label>
              {question.answerType === "text" && (
                <input
                className='textarea'
                  type="text"
                  name={`text_${index}`}
                  required
                />
              )}
              {question.answerType === "singleChoice" && (
                <ul>
                  {question.choices.map((choice, choiceIndex) => (
                    <li key={choiceIndex}>
                      <input
                        type="radio"
                        name={`choice_${index}`}
                        value={choice.text}
                        required
                      />
                      {choice.text}
                    </li>
                  ))}
                </ul>
              )}
              {question.answerType === "multipleChoice" && (
                <ul>
                  {question.choices.map((choice, choiceIndex) => (
                    <li key={choiceIndex}>
                      <input
                        type="checkbox"
                        name={`checkbox_${index}`}
                        value={choice.text}
                      />
                      {choice.text}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <button type="submit">Yanıtla</button>
      </form>
    </div>
  );
}

export default ResponseForm;

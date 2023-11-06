import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SurveyPage() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde, JWT tokeni kullanarak anket verilerini al
    const fetchSurveys = async () => {
      try {
        // Axios isteği için JWT tokenini kullan
        const token = localStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get('http://localhost:9090/users/create'); // API yolunu uygun şekilde güncelleyin

        setSurveys(response.data);
        setLoading(false);
      } catch (error) {
        console.error('API error:', error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div>
      <h2>Survey Page</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Surveys:</h3>
          <ul>
            {surveys.map((survey) => (
              <li key={survey._id}>{survey.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SurveyPage;

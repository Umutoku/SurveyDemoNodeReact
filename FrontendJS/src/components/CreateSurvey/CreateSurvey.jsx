import React, { useState } from 'react';
import axios from 'axios';
import "./createsurvey.css"
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        {
            question: '',
            answerType: 'text',
            choices: ['']
        }
    ]);

    const navigate = useNavigate();

    const addQuestion = () => {
        setQuestions([...questions, { question: '', answerType: 'text', choices: [''] }]);
    };

    const addChoice = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices.push('');
        setQuestions(newQuestions);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:9090/surveys/create', { title, questions });
            console.log(response.data);
            alert('Survey created successfully!');
        } catch (error) {
            console.error(error);
            alert('An error occurred while creating the survey.');
        }
    };

    const handleBack = () => {
        navigate(-1);
      }

   

    return (
      <div className='createSurvey'>
         <button onClick={handleBack} className='back-btn-create'>

<i className="fa-solid fa-arrow-left"></i>
</button>
         
            <h2>Create New Survey</h2>

 <div className="create-survey-container">
            <div>
            <label>
                Title:
                <input className='title' value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            </div>
           

            {questions.map((q, qIndex) => (
                <div className='questions' key={qIndex}>
                    <div >
                    <label>
                        Question {qIndex + 1}:
                        <input value={q.question} onChange={e => {
                            const newQuestions = [...questions];
                            newQuestions[qIndex].question = e.target.value;
                            setQuestions(newQuestions);
                        }} />
                    </label>
                    </div>
                   

                   <div> 
                    <label>
                        Answer Type:
                        <select value={q.answerType} onChange={e => {
                            const newQuestions = [...questions];
                            newQuestions[qIndex].answerType = e.target.value;
                            setQuestions(newQuestions);
                        }}>
                            <option value="text">Text</option>
                            <option value="singleChoice">Single Choice</option>
                            <option value="multipleChoice">Multiple Choice</option>
                        </select>
                    </label>
                    </div>

                    {['singleChoice', 'multipleChoice'].includes(q.answerType) && (
                        <div>
                            {q.choices.map((choice, cIndex) => (
                                <div key={cIndex}>
                                    <label>
                                        Choice {cIndex + 1}:
                                        <input value={choice} onChange={e => {
                                            const newQuestions = [...questions];
                                            newQuestions[qIndex].choices[cIndex] = e.target.value;
                                            setQuestions(newQuestions);
                                        }} />
                                    </label>
                                </div>
                            ))}
                            <button onClick={() => addChoice(qIndex)}>Add Choice</button>
                        </div>
                    )}
                </div>
            ))}

            <button onClick={addQuestion}>Add Question</button>
            <button onClick={handleSubmit}>Create Survey</button>
        </div>
      </div>
       
    );
};

export default CreateSurvey;
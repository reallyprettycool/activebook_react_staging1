import React, { useState } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    text-align: center;
    color: #333;
    margin-top: 0;
`;

// Styled components
const Container = styled.div`
    margin: 20px;
    max-height: 80vh;
    overflow-y: auto;
`;

const Input = styled.input`
    width: 90%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const QuestionContainer = styled.div`
    display: flex;
    align-items: flex-start; /* Align items to the top */
    justify-content: space-between;
    margin-bottom: 20px;
`;

const QuestionInputContainer = styled.div`
    flex-grow: 1;
    margin-right: 10px; /* Add some space between the question input and the delete button */
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-right: 10px;
    background-color: ${props => props.primary ? "#ff6b6b" : "#4dabf7"};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.primary ? "#e55a5a" : "#7abcf7"};
    }
`;

const OptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
`;

const CheckboxLabel = styled.label`
    font-size: 0.8rem; /* Smaller font size for the label */
    color: #555;
    cursor: pointer;
    display: block;
    text-align: right;
`;

const OptionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const OptionBox = styled.div`
    width: 48%; /* Allows 2 boxes per row, accounting for margin/padding */
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #f9f9f9;
    text-align: center;
    align-items: center;
    justify-content: center;

`;

const QuestionText = styled.p`
    font-size: 2rem; /* Two times bigger than the base font size */
    font-weight: bold;
    text-align: center;
    margin: 20px 0;

    span {
        font-weight: bold;
    }
`;

const OptionLabel = styled.label`
    margin-left: 12px; /* Roughly equivalent to 3 spaces in most browsers */
    display: inline-block;
`;

const AnswerOptionContainer = styled.div`
    display: flex;
    justify-content: center; // Center horizontally
    align-items: center; // Center vertically
    padding: 4px;
    margin-top: 2px;
    border-radius: 2px;
    box-sizing: border-box;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #ff4d4d; // A red color for the delete 'X'
    font-size: 1.5rem; // Size of the 'X'
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin-left: 10px;

    &:hover {
        color: #ff6666;
    }
`;

const EditButton = styled(Button)`
    position: absolute;
    top: 20px;
    right: 20px;
`;

const NavigationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;


const QuizCreator = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentView, setCurrentView] = useState('create');
    const [userAnswers, setUserAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleCreateNewQuiz = () => {
        setQuizTitle('');
        setQuestions([]);
        setUserAnswers({});
        setQuizCompleted(false);
        setCurrentView('create');
    };

    const handleAddQuestion = () => {
        if (questions.length < 10) {
            setQuestions([...questions, { questionText: '', options: ['', ''], correctIndexes: [] }]);
        } else {
            alert('Question limit reached');
        }
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);

        if (optionIndex === updatedQuestions[questionIndex].options.length - 1 && value && updatedQuestions[questionIndex].options.length < 4) {
            updatedQuestions[questionIndex].options.push('');
            setQuestions(updatedQuestions);
        }
    };

    const handleCorrectOptionChange = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        const index = updatedQuestions[questionIndex].correctIndexes.indexOf(optionIndex);
        if (index > -1) {
            updatedQuestions[questionIndex].correctIndexes.splice(index, 1);
        } else {
            updatedQuestions[questionIndex].correctIndexes.push(optionIndex);
        }
        setQuestions(updatedQuestions);
    };

    const handleUserAnswerChange = (questionIndex, optionIndex, isSelected) => {
        const updatedAnswers = { ...userAnswers };
        const selectedAnswers = updatedAnswers[questionIndex] || [];

        if (isSelected) {
            if (!selectedAnswers.includes(optionIndex)) {
                selectedAnswers.push(optionIndex);
            }
        } else {
            const indexToRemove = selectedAnswers.indexOf(optionIndex);
            if (indexToRemove > -1) {
                selectedAnswers.splice(indexToRemove, 1);
            }
        }

        updatedAnswers[questionIndex] = selectedAnswers;
        setUserAnswers(updatedAnswers);
    };

    const handleDeleteQuestion = (questionIndex) => {
        const updatedQuestions = questions.filter((_, idx) => idx !== questionIndex);
        setQuestions(updatedQuestions);
    };

    const renderQuestionInputs = () => {
        return questions.map((question, questionIndex) => (
            <QuestionContainer key={questionIndex}>
                <QuestionInputContainer>
                    <Input
                        type="text"
                        placeholder={`Question ${questionIndex + 1}`}
                        value={question.questionText}
                        onChange={(e) => {
                            const newQuestions = [...questions];
                            newQuestions[questionIndex].questionText = e.target.value;
                            setQuestions(newQuestions);
                        }}
                    />
                    {question.options.map((option, optionIndex) => (
                        <OptionContainer key={optionIndex}>
                            <Input
                                type="text"
                                placeholder={`Option ${optionIndex + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                            />
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    checked={question.correctIndexes.includes(optionIndex)}
                                    onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
                                />
                                Correct Answer(s)
                            </CheckboxLabel>
                        </OptionContainer>
                    ))}
                </QuestionInputContainer>
                <DeleteButton onClick={() => handleDeleteQuestion(questionIndex)}>&times;</DeleteButton>
            </QuestionContainer>
        ));
    };

    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

    const handleNextPreviewQuestion = () => {
        setCurrentPreviewIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
    };

    const handlePreviousPreviewQuestion = () => {
        setCurrentPreviewIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const renderPreview = () => {
        if (currentPreviewIndex >= questions.length || currentPreviewIndex < 0) {
            return <div>No question to display</div>;
        }

        const question = questions[currentPreviewIndex];
        return (
            <div>
                <EditButton onClick={() => setCurrentView('create')}>Edit</EditButton>
                <h2>Preview: {quizTitle}</h2>
                <QuestionText>{`"${question.questionText}"`}</QuestionText>
                <OptionsContainer>
                    {question.options.map((option, optionIndex) => (
                        <OptionBox key={`preview-option-${optionIndex}`}>
                            <input
                                type="checkbox" // Use checkboxes in the preview for visual consistency, though they don't function
                                checked={question.correctIndexes.includes(optionIndex)}
                                readOnly
                            />
                            <OptionLabel>{option}</OptionLabel>
                        </OptionBox>
                    ))}
                </OptionsContainer>
                <NavigationContainer>
                    {currentPreviewIndex > 0 && (
                        <Button onClick={handlePreviousPreviewQuestion}>Previous</Button>
                    )}
                    <Button onClick={() => handleQuizBegin('take')}>Begin Quiz</Button>
                    {currentPreviewIndex < questions.length - 1 && (
                        <Button onClick={handleNextPreviewQuestion}>Next</Button>
                    )}
                </NavigationContainer>
            </div>
        );
    };

    const handleQuizBegin = () => {
        setCurrentView('take');
        setCurrentPreviewIndex(0);
        setUserAnswers({});
    };

    const handleOptionSelect = (questionIndex, optionIndex) => {
        const currentAnswers = userAnswers[questionIndex] ? [...userAnswers[questionIndex]] : [];
        const index = currentAnswers.indexOf(optionIndex);
        if (index > -1) {
            currentAnswers.splice(index, 1); // Unselect
        } else {
            currentAnswers.push(optionIndex); // Select
        }
        setUserAnswers({ ...userAnswers, [questionIndex]: currentAnswers });
    };

    const renderQuiz = () => {
        if (quizCompleted) {
            let score = 0;
            Object.keys(userAnswers).forEach((questionIndex) => {
                const questionAnswers = userAnswers[questionIndex];
                const correctAnswers = questions[questionIndex].correctIndexes;

                // Convert both to strings to compare easily
                if (JSON.stringify(questionAnswers.sort()) === JSON.stringify(correctAnswers.sort())) {
                    score += 1;
                }
            });

            return (
                <div>
                    <h2>Quiz Completed!</h2>
                    <p>Your score is {score} out of {questions.length}.</p>
                    <Button onClick={handleCreateNewQuiz}>Create a New Quiz</Button>
                </div>
            );
        }

        const question = questions[currentPreviewIndex];
        return (
            <div>
                <QuestionText>Question {currentPreviewIndex + 1}: <span>{question.questionText}</span></QuestionText>
                <OptionsContainer>
                    {question.options.map((option, optionIndex) => (
                        <OptionBox key={optionIndex} onClick={() => handleOptionSelect(currentPreviewIndex, optionIndex)}>
                            <AnswerOptionContainer>
                                <input
                                    type="checkbox"
                                    name={`question_${currentPreviewIndex}`}
                                    checked={userAnswers[currentPreviewIndex] && userAnswers[currentPreviewIndex].includes(optionIndex)}
                                />
                                {option}
                            </AnswerOptionContainer>
                        </OptionBox>
                    ))}
                </OptionsContainer>
                <div>
                    {currentPreviewIndex > 0 && <Button onClick={() => setCurrentPreviewIndex(currentPreviewIndex - 1)}>Previous</Button>}
                    {currentPreviewIndex < questions.length - 1 ? (
                        <Button onClick={() => setCurrentPreviewIndex(currentPreviewIndex + 1)}>Next</Button>
                    ) : (
                        <Button onClick={() => setQuizCompleted(true)}>Submit Quiz</Button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Container className="center-box">
            {currentView === 'create' && (
                <>
                    <Title>Create Multiple Choice Assessment</Title>
                    <Input
                        type="text"
                        placeholder="Quiz Title"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                    />
                    {renderQuestionInputs()}
                    <Button primary onClick={handleAddQuestion}>+ ADD QUESTION</Button>
                    <Button onClick={() => setCurrentView('preview')}>Preview</Button>
                </>
            )}
            {currentView === 'preview' && (
                <>
                    {renderPreview()}
                </>
            )}
            {currentView === 'take' && renderQuiz()}
        </Container>
    );
};

export default QuizCreator;
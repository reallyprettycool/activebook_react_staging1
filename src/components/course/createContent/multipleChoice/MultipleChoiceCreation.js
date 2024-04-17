import React, { Component } from 'react';
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

/*
* =========================================================================
* =========================================================================
* =========================================================================
*/
class MultipleChoiceCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizTitle: '',
      questions: [],
      currentView: 'create',
      userAnswers: {},
      quizCompleted: false,
      currentPreviewIndex: 0,
    };


  }

  handleCreateNewQuiz = () => {
    this.setState({
        quizTitle: '',
        questions: [],
        userAnswers: {},
        quizCompleted: false,
        currentView: 'create',
        });
  }

  handleAddQuestion = () => {
    if (this.state.questions.length < 10) {
      this.setState({
        questions: [...this.state.questions, { questionText: '', options: ['', ''], correctIndexes: [] }],
      });
    } else {
      alert('Question limit reached');
    }
  }

  handleOptionChange = (questionIndex, optionIndex, value) => {

    const updatedQuestions = [...this.state.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;

    this.setState({
      questions: updatedQuestions,
    });

    if (optionIndex === updatedQuestions[questionIndex].options.length - 1 && value && updatedQuestions[questionIndex].options.length < 4) {

      updatedQuestions[questionIndex].options.push('');
      this.setState({
        questions: updatedQuestions,
      });

    }
  };

  handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...this.state.questions];
    const index = updatedQuestions[questionIndex].correctIndexes.indexOf(optionIndex);
    if (index > -1) {
      updatedQuestions[questionIndex].correctIndexes.splice(index, 1);
    } else {
      updatedQuestions[questionIndex].correctIndexes.push(optionIndex);
    }
    this.setState({
      questions: updatedQuestions,
    });
  };

  handleUserAnswerChange = (questionIndex, optionIndex, isSelected) => {
    const updatedAnswers = { ...this.state.userAnswers };
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

    this.setState({
        userAnswers: updatedAnswers,
    });

  };

  handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = this.state.questions.filter((_, idx) => idx !== questionIndex);
    this.setState({
      questions: updatedQuestions,
    })
  };

  renderQuestionInputs = () => {
    return this.state.questions.map((question, questionIndex) => (
        <QuestionContainer key={questionIndex}>
          <QuestionInputContainer>
            <Input
                type="text"
                placeholder={`Question ${questionIndex + 1}`}
                value={question.questionText}
                onChange={(e) => {
                  const newQuestions = [...this.state.questions];
                  newQuestions[questionIndex].questionText = e.target.value;
                }}
            />
            {question.options.map((option, optionIndex) => (
                <OptionContainer key={optionIndex}>
                  <Input
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => {
                          this.handleOptionChange(questionIndex, optionIndex, e.target.value)
                      }}
                  />
                  <CheckboxLabel>
                    <input
                        type="checkbox"
                        checked={question.correctIndexes.includes(optionIndex)}
                        onChange={() => this.handleCorrectOptionChange(questionIndex, optionIndex)}
                    />
                    Correct Answer(s)
                  </CheckboxLabel>
                </OptionContainer>
            ))}
          </QuestionInputContainer>
          <DeleteButton onClick={() => this.handleDeleteQuestion(questionIndex)}>&times;</DeleteButton>
        </QuestionContainer>
    ));
  };

  handleNextPreviewQuestion = () => {
    this.setState({
        currentPreviewIndex: Math.min(this.state.questions.length - 1, this.state.currentPreviewIndex + 1),
    });
  };

  handlePreviousPreviewQuestion = () => {
    this.setState({
        currentPreviewIndex: Math.max(0, this.state.currentPreviewIndex - 1),
    });
  };

  renderPreview = () => {
    if (this.state.currentPreviewIndex >= this.state.questions.length || this.state.currentPreviewIndex < 0) {
      return <div>No question to display</div>;
    }

    const question = this.state.questions[this.state.currentPreviewIndex];

    return (
        <div>
          <EditButton onClick={() => {
             this.setState({
                 currentView: 'create',
             })
          }}>Edit</EditButton>
          <h2>Preview: {this.state.quizTitle}</h2>
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
            {this.state.currentPreviewIndex > 0 && (
                <Button onClick={this.handlePreviousPreviewQuestion}>Previous</Button>
            )}
            <Button onClick={() => this.handleQuizBegin('take')}>Begin Quiz</Button>
            {this.state.currentPreviewIndex < this.state.questions.length - 1 && (
                <Button onClick={this.handleNextPreviewQuestion}>Next</Button>
            )}
          </NavigationContainer>
        </div>
    );
  };

  handleQuizBegin = () => {
    this.setState({
        currentView: 'take',
        currentPreviewIndex: 0,
        userAnswers: {},
    });
  };

  handleOptionSelect = (questionIndex, optionIndex) => {
    const currentAnswers = this.state.userAnswers[questionIndex] ? [...this.state.userAnswers[questionIndex]] : [];
    const index = currentAnswers.indexOf(optionIndex);
    if (index > -1) {
      currentAnswers.splice(index, 1); // Unselect
    } else {
      currentAnswers.push(optionIndex); // Select
    }

    this.setState({
        userAnswers: { ...this.state.userAnswers, [questionIndex]: currentAnswers },
    })
  };

  renderQuiz = () => {
    if (this.state.quizCompleted) {
      let score = 0;
      Object.keys(this.state.userAnswers).forEach((questionIndex) => {
        const questionAnswers = this.state.userAnswers[questionIndex];
        const correctAnswers = this.state.questions[questionIndex].correctIndexes;

        // Convert both to strings to compare easily
        if (JSON.stringify(questionAnswers.sort()) === JSON.stringify(correctAnswers.sort())) {
          score += 1;
        }
      });

      return (
          <div>
            <h2>Quiz Completed!</h2>
            <p>Your score is {score} out of {this.state.questions.length}.</p>
            <Button onClick={this.handleCreateNewQuiz}>Create a New Quiz</Button>
          </div>
      );
    }

    const question = this.state.questions[this.state.currentPreviewIndex];

    return (
        <div>
          <QuestionText>Question {this.state.currentPreviewIndex + 1}: <span>{question.questionText}</span></QuestionText>
          <OptionsContainer>
            {question.options.map((option, optionIndex) => (
                <OptionBox key={optionIndex} onClick={() => this.handleOptionSelect(this.state.currentPreviewIndex, optionIndex)}>
                  <AnswerOptionContainer>
                    <input
                        type="checkbox"
                        name={`question_${this.state.currentPreviewIndex}`}
                        checked={this.state.userAnswers[this.state.currentPreviewIndex] && this.state.userAnswers[this.state.currentPreviewIndex].includes(optionIndex)}
                    />
                    {option}
                  </AnswerOptionContainer>
                </OptionBox>
            ))}
          </OptionsContainer>
          <div>
            {this.state.currentPreviewIndex > 0 && <Button onClick={() => {
              this.setState({
                currentPreviewIndex: this.state.currentPreviewIndex - 1,
              })
            }}>Previous</Button>}
            {this.state.currentPreviewIndex < this.state.questions.length - 1 ? (
                <Button onClick={() =>{
                  this.setState({
                    currentPreviewIndex: this.state.currentPreviewIndex + 1,
                  })
                }}>Next</Button>
            ) : (
                <Button onClick={() => {
                  this.setState({
                    quizCompleted: true,
                  })
                }}>Submit Quiz</Button>
            )}
          </div>
        </div>
    );
  };

  render(){
    return (
        <Container className="center-box">
          {this.state.currentView === 'create' && (
              <>
                <Title>Create Multiple Choice Assessment</Title>
                <Input
                    type="text"
                    placeholder="Quiz Title"
                    value={this.state.quizTitle}
                    onChange={(e) => {
                      this.setState({
                        quizTitle: e.target.value,
                      })
                    }}
                />
                {this.renderQuestionInputs()}
                <Button primary onClick={this.handleAddQuestion}>+ ADD QUESTION</Button>
                <Button onClick={() => {
                  this.setState({
                    currentView: 'preview',
                  })
                }}>Preview</Button>
              </>
          )}
          {this.state.currentView === 'preview' && (
              <>
                {this.renderPreview()}
              </>
          )}
          {this.state.currentView === 'take' && this.renderQuiz()}
        </Container>
    );
  }

}
export default MultipleChoiceCreation
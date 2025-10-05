import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MISSION_QUIZZES } from "../../data/missions";
import "./QuizPage.css";

interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

const QuizPage: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();

  const quiz = missionId ? MISSION_QUIZZES[missionId] : null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz?.timeLimit || 300); // Inicializar directamente
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizCompleted && answers.length > 0) {
      // Solo finalizar si ya hay respuestas
      handleFinishQuiz();
    }
  }, [timeRemaining, quizCompleted, answers.length]);

  const handleOptionSelect = (optionIndex: number) => {
    if (!showExplanation) {
      setSelectedOption(optionIndex);
    }
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedOption,
      isCorrect,
    };

    setAnswers([...answers, newAnswer]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!quiz) return;

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      handleFinishQuiz();
    }
  };

  const calculateScore = () => {
    if (!quiz || answers.length === 0) return 0;
    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);

    // Si aprobó, guardar la misión como completada
    const score = calculateScore();
    const passed = score >= (quiz?.passingScore || 70);

    if (passed && missionId) {
      // Obtener progreso actual del localStorage
      const savedProgress = localStorage.getItem("kawsayspace-user-progress");
      let userProgress = savedProgress
        ? JSON.parse(savedProgress)
        : {
            level: 5,
            experience: 450,
            completedMissions: [],
            badges: [],
          };

      // Agregar misión completada si no está ya
      if (!userProgress.completedMissions.includes(missionId)) {
        userProgress.completedMissions.push(missionId);

        // Calcular XP ganado
        const xpGained = calculateXPGained(score);
        userProgress.experience += xpGained;

        // Calcular nuevo nivel
        userProgress.level = Math.floor(userProgress.experience / 1000) + 1;

        // Guardar en localStorage
        localStorage.setItem(
          "kawsayspace-user-progress",
          JSON.stringify(userProgress)
        );

        console.log("✅ Misión completada:", missionId);
        console.log("📊 Progreso guardado:", userProgress);
      }
    }
  };

  // Nueva función para calcular XP
  const calculateXPGained = (score: number): number => {
    if (score >= 90) return 150;
    if (score >= 80) return 125;
    if (score >= 70) return 100;
    return 50;
  };

  const handleReturnToMap = () => {
    navigate("/starmap");
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowExplanation(false);
    setTimeRemaining(quiz?.timeLimit || 300);
    setQuizCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!quiz || !currentQuestion) {
    return (
      <div className="quiz-page quiz-page--error">
        <div className="quiz-page__error">
          <h2>Quiz no encontrado</h2>
          <button onClick={handleReturnToMap}>Volver al Mapa Estelar</button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    const passed = score >= quiz.passingScore;
    const xpGained = calculateXPGained(score);

    return (
      <div className="quiz-page quiz-page--results">
        <div className="quiz-page__results-container">
          <div
            className={`quiz-page__results-icon ${
              passed
                ? "quiz-page__results-icon--success"
                : "quiz-page__results-icon--fail"
            }`}
          >
            {passed ? "🎉" : "📚"}
          </div>

          <h1 className="quiz-page__results-title">
            {passed ? "¡MISIÓN COMPLETADA!" : "¡Sigue Aprendiendo!"}
          </h1>

          <div className="quiz-page__score">
            <div className="quiz-page__score-circle">
              <span className="quiz-page__score-value">{score}%</span>
            </div>
            <p className="quiz-page__score-text">
              {answers.filter((a) => a.isCorrect).length} de{" "}
              {quiz.questions.length} correctas
            </p>
          </div>

          {passed ? (
            <div className="quiz-page__success-message">
              <p>
                ¡Excelente trabajo, Cadete! Has demostrado un gran conocimiento.
              </p>
              <div className="quiz-page__rewards">
                <div className="quiz-page__reward">🏆 +{xpGained} XP</div>
                <div className="quiz-page__reward">
                  🦴 Insignia: Científico Óseo
                </div>
              </div>
            </div>
          ) : (
            <div className="quiz-page__fail-message">
              <p>Necesitas al menos {quiz.passingScore}% para aprobar.</p>
              <p>Revisa el artículo nuevamente e inténtalo otra vez.</p>
            </div>
          )}

          <div className="quiz-page__actions">
            {!passed && (
              <button
                className="quiz-page__button quiz-page__button--retry"
                onClick={handleRetryQuiz}
              >
                🔄 Reintentar Quiz
              </button>
            )}
            <button
              className="quiz-page__button quiz-page__button--return"
              onClick={handleReturnToMap}
            >
              ← Volver al Mapa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      {/* Header con progreso */}
      <div className="quiz-page__header">
        <div className="quiz-page__progress-info">
          <span className="quiz-page__question-counter">
            Pregunta {currentQuestionIndex + 1} de {quiz.questions.length}
          </span>
          <div className="quiz-page__timer">⏱️ {formatTime(timeRemaining)}</div>
        </div>

        <div className="quiz-page__progress-bar">
          <div
            className="quiz-page__progress-fill"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / quiz.questions.length) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Pregunta */}
      <div className="quiz-page__content">
        <div className="quiz-page__question-container">
          <h2 className="quiz-page__question">{currentQuestion.question}</h2>

          {/* Opciones */}
          <div className="quiz-page__options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`quiz-page__option ${
                  selectedOption === index ? "quiz-page__option--selected" : ""
                } ${
                  showExplanation && index === currentQuestion.correctAnswer
                    ? "quiz-page__option--correct"
                    : ""
                } ${
                  showExplanation &&
                  selectedOption === index &&
                  index !== currentQuestion.correctAnswer
                    ? "quiz-page__option--incorrect"
                    : ""
                }`}
                onClick={() => handleOptionSelect(index)}
                disabled={showExplanation}
              >
                <span className="quiz-page__option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="quiz-page__option-text">{option}</span>
              </button>
            ))}
          </div>

          {/* Explicación */}
          {showExplanation && (
            <div className="quiz-page__explanation">
              <div className="quiz-page__explanation-icon">
                {selectedOption === currentQuestion.correctAnswer ? "✅" : "❌"}
              </div>
              <p className="quiz-page__explanation-text">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="quiz-page__actions">
            {!showExplanation ? (
              <button
                className="quiz-page__button quiz-page__button--confirm"
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
              >
                Confirmar Respuesta
              </button>
            ) : (
              <button
                className="quiz-page__button quiz-page__button--next"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < quiz.questions.length - 1
                  ? "Siguiente Pregunta →"
                  : "Ver Resultados 🎯"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;

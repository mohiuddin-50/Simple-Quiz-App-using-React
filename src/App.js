import React, { useState } from 'react';
// Import the CSS file
import './components/ModuleToggle.css';

// ProgressBar component
const ProgressBar = ({ completed, total }) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0; // Prevent division by zero

    return (
        <div className="progressBar">
            <span className="progressLabel">Completion</span>
            <div className="progressBarContainer">
                <div
                    className="progressBarFill"
                    style={{
                        width: `${percentage}%`, // Dynamic progress width
                        backgroundColor: '#007bff', // Blue for Completion
                    }}
                ></div>
                <span className="progressPercentage">{Math.round(percentage)}%</span>
            </div>
        </div>
    );
};

// Main ModuleToggle component
function ModuleToggle({ moduleIndex, totalModules, onModuleComplete }) {
    const [isVisible, setIsVisible] = useState(false);
    const [answers, setAnswers] = useState({ q1: '', q2: '' });
    const [score, setScore] = useState(null);
    const [completed, setCompleted] = useState(false);

    const toggleContent = () => {
        setIsVisible(!isVisible);
    };

    const handleInputChange = (e) => {
        setAnswers({
            ...answers,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const correctAnswers = { q1: 'Paris', q2: 'Mars' };
        let calculatedScore = 0;

        if (answers.q1 === correctAnswers.q1) calculatedScore++;
        if (answers.q2 === correctAnswers.q2) calculatedScore++;

        setScore(calculatedScore);
        if (!completed) {
            onModuleComplete(true);
            setCompleted(true);
        }
    };

    return (
        <div className="moduleToggleContainer">
            <div
                onClick={toggleContent}
                className="moduleHeader"
            >
                <h2 className="moduleTitle">Module {moduleIndex}</h2>
                <span className="toggleIcon" style={{ transform: isVisible ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    &#9660;
                </span>
            </div>

            {isVisible && (
                <form
                    onSubmit={handleSubmit}
                    className="formContainer"
                >
                    <h3>MCQ Questions:</h3>
                    <div className="questionContainer">
                        <p><strong>1. What is the capital of France?</strong></p>
                        <label><input type="radio" name="q1" value="Paris" onChange={handleInputChange} /> Paris</label><br />
                        <label><input type="radio" name="q1" value="London" onChange={handleInputChange} /> London</label><br />
                        <label><input type="radio" name="q1" value="Berlin" onChange={handleInputChange} /> Berlin</label><br />
                        <label><input type="radio" name="q1" value="Madrid" onChange={handleInputChange} /> Madrid</label>
                    </div>
                    <div className="questionContainer">
                        <p><strong>2. Which planet is known as the Red Planet?</strong></p>
                        <label><input type="radio" name="q2" value="Mars" onChange={handleInputChange} /> Mars</label><br />
                        <label><input type="radio" name="q2" value="Jupiter" onChange={handleInputChange} /> Jupiter</label><br />
                        <label><input type="radio" name="q2" value="Venus" onChange={handleInputChange} /> Venus</label><br />
                        <label><input type="radio" name="q2" value="Saturn" onChange={handleInputChange} /> Saturn</label>
                    </div>
                    <button type="submit" className="submitButton">
                        Submit
                    </button>
                    {score !== null && (
                        <div className="scoreContainer">
                            <h3>Your Score: {score} out of 2</h3>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}

// Main App component
function App() {
    const totalModules = 3; // Total number of modules
    const [completedModules, setCompletedModules] = useState(0);

    const handleModuleCompletion = (isComplete) => {
        if (isComplete) {
            setCompletedModules((prev) => prev + 1);
        }
    };

    return (
        <div className="container">
            <div>
                <h1>Module Completion Tracker</h1>

                {/* Course Card */}
                <div className="courseCard">
                    <div className="courseHeader">
                        <img
                            src="https://packetprep.blr1.cdn.digitaloceanspaces.com/prep/super/images/product/image/image_core-java.png"
                            alt="Java Icon"
                            className="javaIcon"
                        />
                        <div className="courseTitle">
                            <h2>Core Java</h2>
                            <div className="starRating">★★★★★</div>
                            <span className="courseStatus">✔ Activated</span>
                        </div>
                    </div>
                    <div className="courseDescription">
                        <p>
                            This comprehensive course covers all Core Java subtopics crucial for interview
                            preparation.
                        </p>
                    </div>
                    <div className="courseFooter">
                        <span className="assessmentCount">➤ 3 Modules</span>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="progressCard">
                    <h3 className="progressHeader">Overall Test Progress</h3>
                    <div className="progressContainer">
                        <span className="progressPercentage">{Math.round((completedModules / totalModules) * 100)}%</span>
                        <ProgressBar completed={completedModules} total={totalModules} />
                    </div>
                </div>

                <br />

                {/* Module Toggles */}
                {Array.from({ length: totalModules }, (_, index) => (
                    <ModuleToggle key={index} moduleIndex={index + 1} totalModules={totalModules} onModuleComplete={handleModuleCompletion} />
                ))}
            </div>
        </div>
    );
}

// Export the App component
export default App;

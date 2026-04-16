import { useEffect } from 'react';

export default function ThankYouScreen({ onRestart }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="screen active">
      <div className="results-container">
        <div className="results-hero">
          <div className="results-eyebrow">Thank You</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0' }}>
            Your responses have been submitted
          </h2>
          <div className="overall-sublabel">
            Your results have been sent to the coaching team for review. Thank you for taking the time to complete this assessment.
          </div>
        </div>
        <button className="restart-btn" onClick={onRestart}>Take the Assessment Again</button>
      </div>
    </div>
  );
}

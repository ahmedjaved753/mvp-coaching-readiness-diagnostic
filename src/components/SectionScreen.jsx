import { useState, useEffect, useRef } from 'react';
import { SECTIONS } from '../data/questions';
import QuestionCard from './QuestionCard';

export default function SectionScreen({ sectionKey, answers, onAnswer, onNext, onBack, nextLabel, eyebrow, title, desc }) {
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  function validate() {
    const newErrors = {};
    SECTIONS[sectionKey].questions.forEach((_, i) => {
      if (answers[sectionKey][i] === undefined) newErrors[i] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (!validate()) {
      setShowError(true);
      setTimeout(() => {
        const firstError = containerRef.current?.querySelector('.unanswered-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }
    setShowError(false);
    onNext();
  }

  function handleAnswer(section, index, value) {
    onAnswer(section, index, value);
    setErrors(prev => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    if (Object.keys(errors).length <= 1) setShowError(false);
  }

  return (
    <div className="screen active">
      <div className="section-container" ref={containerRef}>
        <div className="section-header">
          <div className="section-eyebrow">{eyebrow}</div>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
          {desc && <p className="section-desc">{desc}</p>}
        </div>

        {SECTIONS[sectionKey].questions.map((q, i) => (
          <QuestionCard
            key={i}
            sectionKey={sectionKey}
            index={i}
            question={q}
            value={answers[sectionKey][i]}
            onChange={handleAnswer}
            hasError={!!errors[i]}
          />
        ))}

        {showError && (
          <div className="error-msg show">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Please answer all questions before continuing.
          </div>
        )}

        <div className="nav-row">
          <button className="btn-outline btn-back" onClick={onBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <button className="btn-cta btn-next" onClick={handleNext}>
            {nextLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

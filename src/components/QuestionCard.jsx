import { SCALE_LABELS } from '../data/questions';

export default function QuestionCard({ sectionKey, index, question, value, onChange, hasError }) {
  const cardClass = [
    'question-card',
    value !== undefined ? 'answered' : '',
    hasError ? 'unanswered-error' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass}>
      <div className="q-num">Question {index + 1}</div>
      <div className="q-text">{question}</div>
      <div className="likert">
        {[1, 2, 3, 4, 5].map(v => (
          <div className="likert-option" key={v}>
            <input
              type="radio"
              name={`${sectionKey}-q${index}`}
              id={`${sectionKey}-q${index}-v${v}`}
              value={v}
              checked={value === v}
              onChange={() => onChange(sectionKey, index, v)}
            />
            <label htmlFor={`${sectionKey}-q${index}-v${v}`}>
              <span className="score-num">{v}</span>
              {SCALE_LABELS[v - 1]}
            </label>
          </div>
        ))}
      </div>
      <div className="likert-anchors">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
    </div>
  );
}

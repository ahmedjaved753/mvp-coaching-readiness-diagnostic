import { SECTIONS } from '../data/questions';

export default function ProgressBar({ answers, visible }) {
  const totalAnswered = Object.keys(answers.a).length + Object.keys(answers.b).length;
  const total = SECTIONS.a.questions.length + SECTIONS.b.questions.length;
  const pct = Math.round((totalAnswered / total) * 100);

  return (
    <div className={`progress-bar-wrap${visible ? ' show' : ''}`}>
      <div className="progress-bar-inner">
        <div className="progress-bar-info">
          <span>{totalAnswered} of {total}</span>
          <span>{pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

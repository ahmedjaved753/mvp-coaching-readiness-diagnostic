import { useEffect, useRef } from 'react';
import { SECTIONS } from '../data/questions';
import { calcSection, getGaps, getRecs, getScoreClass, getScoreLabel, getOverallLabel, getScoreColor } from '../utils/scoring';

export default function ResultsScreen({ answers, onRestart }) {
  const barsRef = useRef(null);

  const aScore = calcSection('a', answers);
  const bScore = calcSection('b', answers);
  const combinedPct = Math.round(((aScore.total + bScore.total) / (aScore.max + bScore.max)) * 100);

  const aGaps = getGaps('a', answers);
  const bGaps = getGaps('b', answers);
  const aRecs = getRecs('a', aScore.pct, aGaps);
  const bRecs = getRecs('b', bScore.pct, bGaps);

  const aClass = getScoreClass(aScore.pct);
  const bClass = getScoreClass(bScore.pct);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Animate bars after mount
    const timer = setTimeout(() => {
      if (barsRef.current) {
        barsRef.current.querySelectorAll('.bar-fill[data-target]').forEach(bar => {
          bar.style.width = bar.dataset.target + '%';
        });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="screen active">
      <div className="results-container" ref={barsRef}>

        {/* Hero */}
        <div className="results-hero">
          <div className="results-eyebrow">Your Results</div>
          <div className="overall-score">{combinedPct}%</div>
          <div className="overall-label">{getOverallLabel(combinedPct)}</div>
          <div className="overall-sublabel">
            Based on {SECTIONS.a.questions.length + SECTIONS.b.questions.length} responses across 2 coaching dimensions
          </div>
        </div>

        {/* Section A Score Card */}
        <ScoreCard
          title="Coaching Skills & Style"
          scoreObj={aScore}
          scoreClass={aClass}
          gaps={aGaps}
          sectionKey="a"
          answers={answers}
        />

        {/* Section A Recs */}
        <RecsCard title="Recommended Actions — Skills & Style" recs={aRecs} />

        {/* Section B Score Card */}
        <ScoreCard
          title="Clarity & Purpose"
          scoreObj={bScore}
          scoreClass={bClass}
          gaps={bGaps}
          sectionKey="b"
          answers={answers}
        />

        {/* Section B Recs */}
        <RecsCard title="Recommended Actions — Clarity & Purpose" recs={bRecs} />

        {/* Legend */}
        <div className="legend-card">
          <div className="legend-title">Score Reference</div>
          <div className="legend-row">
            <span className="legend-chip red">0–49%</span>
            <span>Critical or significant gap — coaching likely faces strong resistance</span>
          </div>
          <div className="legend-row">
            <span className="legend-chip amber">50–69%</span>
            <span>Moderate gap — real friction points need to be addressed</span>
          </div>
          <div className="legend-row">
            <span className="legend-chip green">70–100%</span>
            <span>Strong foundation — focus on maintaining and refining</span>
          </div>
        </div>

        <button className="restart-btn" onClick={onRestart}>Take the Assessment Again</button>
      </div>
    </div>
  );
}

function ScoreCard({ title, scoreObj, scoreClass, gaps, sectionKey, answers }) {
  return (
    <div className="score-card">
      <div className="score-card-header">
        <div>
          <div className="score-card-title">{title}</div>
          <div className="score-card-sub">{getScoreLabel(scoreObj.pct)} — {SECTIONS[sectionKey].questions.length} questions</div>
        </div>
        <div className={`score-badge ${scoreClass}`}>{scoreObj.pct}%</div>
      </div>

      <div className="bar-wrap">
        <div className={`bar-fill ${scoreClass}`} style={{ width: '0%' }} data-target={scoreObj.pct} />
      </div>

      {gaps.length > 0 ? (
        <>
          <div className="gaps-label">Identified gaps (scored 1–3)</div>
          <ul className="gap-list">
            {gaps.map((g, i) => (
              <li key={i}>
                <span className={`gap-dot${g.score === 3 ? ' amber' : ''}`} />
                <span>{g.q}</span>
                <span className="gap-score">{g.score}/5</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="no-gaps">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          No critical gaps identified
        </div>
      )}

      <details className="q-breakdown">
        <summary>View all question scores</summary>
        <div>
          {SECTIONS[sectionKey].questions.map((q, i) => {
            const s = answers[sectionKey][i];
            return (
              <div className="q-breakdown-item" key={i}>
                <span>{q}</span>
                <span className="q-score" style={{ color: getScoreColor(s) }}>{s}/5</span>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}

function RecsCard({ title, recs }) {
  return (
    <div className="recs-card">
      <h3>{title}</h3>
      <ul>
        {recs.map((r, i) => (
          <li key={i}>
            <span className="rec-arrow">→</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


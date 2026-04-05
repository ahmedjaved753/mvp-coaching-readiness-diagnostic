import { SECTIONS } from '../data/questions';

export function getScoreClass(pct) {
  if (pct < 50) return 'red';
  if (pct < 70) return 'amber';
  return 'green';
}

export function getScoreLabel(pct) {
  if (pct < 40) return 'Critical Gap';
  if (pct < 55) return 'Significant Gap';
  if (pct < 70) return 'Moderate Gap';
  if (pct < 85) return 'Room to Grow';
  return 'Strong Foundation';
}

export function getOverallLabel(pct) {
  if (pct < 45) return 'High Resistance Likely';
  if (pct < 60) return 'Significant Friction Present';
  if (pct < 75) return 'Moderate Barriers Present';
  return 'Coaching-Ready Environment';
}

export function getScoreColor(score) {
  if (score <= 2) return 'var(--color-error)';
  if (score === 3) return 'var(--color-warning)';
  return 'var(--color-success)';
}

export function calcSection(sectionKey, answers) {
  const q = SECTIONS[sectionKey].questions;
  const total = q.reduce((sum, _, i) => sum + (answers[sectionKey][i] || 0), 0);
  const max = q.length * 5;
  return { total, max, pct: Math.round((total / max) * 100), avg: (total / q.length).toFixed(1) };
}

export function getGaps(sectionKey, answers, threshold = 3) {
  return SECTIONS[sectionKey].questions
    .map((q, i) => ({ q, score: answers[sectionKey][i] || 0 }))
    .filter(item => item.score <= threshold)
    .sort((a, b) => a.score - b.score);
}

export function getRecs(sectionKey, pct, gaps) {
  const recs = [];
  if (sectionKey === 'a') {
    if (gaps.some(g => g.q.includes('listens'))) recs.push('Practice active listening in 1:1s — reflect back what you hear before responding.');
    if (gaps.some(g => g.q.includes('questions'))) recs.push("Replace status check-ins with open questions like \"What's getting in your way?\" or \"What would make the biggest difference?\"");
    if (gaps.some(g => g.q.includes('Feedback'))) recs.push('Make feedback more specific: tie observations to behaviors and outcomes, not generalities.');
    if (gaps.some(g => g.q.includes('two-way'))) recs.push('Audit your coaching sessions — what percentage of the talking does the coachee do? Aim for 60%+.');
    if (gaps.some(g => g.q.includes('consistent'))) recs.push('Establish a regular coaching cadence (e.g., 30-min monthly) so it doesn\'t feel ad hoc or random.');
    if (gaps.some(g => g.q.includes('motivated'))) recs.push("End each coaching session with: \"What's one thing you're taking away from this conversation?\"");
    if (pct < 55) recs.push('Consider a coaching skills workshop for team leaders to build core coaching competencies.');
  } else {
    if (gaps.some(g => g.q.includes('understand what coaching'))) recs.push('Hold a team kickoff to define coaching: what it is, what it isn\'t, and what it\'s for.');
    if (gaps.some(g => g.q.includes('expected'))) recs.push('Co-create a "coaching agreement" with each team member so expectations are mutual and clear.');
    if (gaps.some(g => g.q.includes('performance management'))) recs.push('Explicitly separate coaching conversations from performance reviews — different meetings, different tone.');
    if (gaps.some(g => g.q.includes('say in'))) recs.push("Start each coaching cycle by asking: \"What do you most want to work on?\" — give ownership to the coachee.");
    if (gaps.some(g => g.q.includes('personal development'))) recs.push("Link coaching goals to each person's individual development plan or stated career aspirations.");
    if (pct < 55) recs.push("Share a one-page overview of your team's coaching philosophy and how success will be measured.");
  }
  if (recs.length === 0) recs.push('Maintain current approach — scores are strong. Continue soliciting feedback to stay calibrated.');
  return recs;
}

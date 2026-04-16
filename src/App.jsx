import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import WelcomeScreen from './components/WelcomeScreen';
import SectionScreen from './components/SectionScreen';
import ThankYouScreen from './components/ThankYouScreen';
import { SECTIONS } from './data/questions';
import { calcSection } from './utils/scoring';

export default function App() {
  const [screen, setScreen] = useState('welcome'); // 'welcome' | 'sectionA' | 'sectionB' | 'results'
  const [answers, setAnswers] = useState({ a: {}, b: {} });

  function handleAnswer(section, index, value) {
    setAnswers(prev => ({
      ...prev,
      [section]: { ...prev[section], [index]: value },
    }));
  }

  function handleRestart() {
    setAnswers({ a: {}, b: {} });
    setScreen('welcome');
  }

  async function handleSubmit() {
    const aScore = calcSection('a', answers);
    const bScore = calcSection('b', answers);
    const combinedPct = Math.round(((aScore.total + bScore.total) / (aScore.max + bScore.max)) * 100);

    const answerDetails = {};
    Object.keys(SECTIONS).forEach(sectionKey => {
      SECTIONS[sectionKey].questions.forEach((q, i) => {
        answerDetails[`${SECTIONS[sectionKey].label} - Q${i + 1}`] = `${answers[sectionKey][i] || 0}/5 — ${q}`;
      });
    });

    try {
      await fetch('https://formspree.io/f/xnjowwpe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _cc: 'mshahbazian@mvpexec.com, mpowers@mvpexec.com, molson-menzel@mvpexec.com, ahmedjaved7053@gmail.com',
          overall_score: combinedPct + '%',
          coaching_skills_score: aScore.pct + '%',
          clarity_purpose_score: bScore.pct + '%',
          ...answerDetails,
        }),
      });
    } catch {
      // Still show results even if submission fails
    }
    setScreen('results');
  }

  const showProgress = screen === 'sectionA' || screen === 'sectionB';

  return (
    <>
      <Header />
      <ProgressBar answers={answers} visible={showProgress} />

      {screen === 'welcome' && (
        <WelcomeScreen onStart={() => setScreen('sectionA')} />
      )}

      {screen === 'sectionA' && (
        <SectionScreen
          key="sectionA"
          sectionKey="a"
          answers={answers}
          onAnswer={handleAnswer}
          onNext={() => setScreen('sectionB')}
          onBack={() => setScreen('welcome')}
          nextLabel="Continue to Section 2"
          eyebrow="Section 1 of 2"
          title="Career Development"
        />
      )}

      {screen === 'sectionB' && (
        <SectionScreen
          key="sectionB"
          sectionKey="b"
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleSubmit}
          onBack={() => setScreen('sectionA')}
          nextLabel="Submit"
          eyebrow="Section 2 of 2"
          title="Clarity <em>&amp;</em> Purpose"
          desc="How well people understand what coaching is for, what's expected of them, and whether the purpose feels relevant to their growth."
        />
      )}

      {screen === 'results' && (
        <ThankYouScreen onRestart={handleRestart} />
      )}

      <Footer />
    </>
  );
}

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import WelcomeScreen from './components/WelcomeScreen';
import SectionScreen from './components/SectionScreen';
import ResultsScreen from './components/ResultsScreen';

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
          title="Coaching Skills <em>&amp;</em> Style"
        />
      )}

      {screen === 'sectionB' && (
        <SectionScreen
          key="sectionB"
          sectionKey="b"
          answers={answers}
          onAnswer={handleAnswer}
          onNext={() => setScreen('results')}
          onBack={() => setScreen('sectionA')}
          nextLabel="See My Results"
          eyebrow="Section 2 of 2"
          title="Clarity <em>&amp;</em> Purpose"
          desc="How well people understand what coaching is for, what's expected of them, and whether the purpose feels relevant to their growth."
        />
      )}

      {screen === 'results' && (
        <ResultsScreen answers={answers} onRestart={handleRestart} />
      )}

      <Footer />
    </>
  );
}

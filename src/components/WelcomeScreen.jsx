export default function WelcomeScreen({ onStart }) {
  return (
    <div className="screen active" id="screen-welcome">
      <div className="welcome-container">
        <div className="welcome-inner">
          <div className="welcome-badge">Team Diagnostic</div>
          <h1 className="welcome-title">Coaching Readiness Assessment</h1>
          <div className="welcome-meta">
            <div className="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>5 minutes</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
              <span>18 questions</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <span>Confidential</span>
            </div>
          </div>
          <p className="welcome-instruction">
            Rate each statement based on your honest experience.<br />
            There are no right or wrong answers.
          </p>
          <button className="btn-cta" onClick={onStart}>Begin Diagnostic</button>
        </div>
      </div>
    </div>
  );
}

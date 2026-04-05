export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1"/>
            <circle cx="20" cy="20" r="2" fill="currentColor"/>
            <line x1="20" y1="2" x2="20" y2="14" stroke="currentColor" strokeWidth="1.2"/>
            <line x1="20" y1="26" x2="20" y2="38" stroke="currentColor" strokeWidth="1.2"/>
            <line x1="2" y1="20" x2="14" y2="20" stroke="currentColor" strokeWidth="1.2"/>
            <line x1="26" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="1.2"/>
            <line x1="7.3" y1="7.3" x2="15" y2="15" stroke="currentColor" strokeWidth="0.8"/>
            <line x1="25" y1="25" x2="32.7" y2="32.7" stroke="currentColor" strokeWidth="0.8"/>
            <line x1="32.7" y1="7.3" x2="25" y2="15" stroke="currentColor" strokeWidth="0.8"/>
            <line x1="15" y1="25" x2="7.3" y2="32.7" stroke="currentColor" strokeWidth="0.8"/>
          </svg>
          <span>MVP Executive Coaching</span>
        </div>
        <a className="footer-attr" href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">
          Created with Perplexity Computer
        </a>
      </div>
    </footer>
  );
}

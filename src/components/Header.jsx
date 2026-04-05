export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo">
          <svg className="logo-icon" width="28" height="28" viewBox="0 0 40 40" fill="none">
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
            <polygon points="20,2 17.5,10 22.5,10" fill="currentColor" opacity="0.7"/>
          </svg>
          <span className="logo-text">MVP</span>
        </div>
        <nav className="header-nav">
          <a href="https://mvpexec.com" target="_blank" rel="noopener noreferrer">mvpexec.com</a>
        </nav>
      </div>
    </header>
  );
}

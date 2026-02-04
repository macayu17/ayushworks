const SocialSidebar = () => {
    const socials = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/anayush14/',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
            )
        },
        {
            name: 'Codolio',
            url: 'https://codolio.com/profile/anayush',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    {/* Owl face outline */}
                    <ellipse cx="12" cy="13" rx="9" ry="8" />
                    {/* Left eye */}
                    <circle cx="8" cy="12" r="2.5" />
                    <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
                    {/* Right eye */}
                    <circle cx="16" cy="12" r="2.5" />
                    <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
                    {/* Beak */}
                    <path d="M12 14.5 L10.5 16.5 L12 18 L13.5 16.5 Z" fill="currentColor" stroke="none" />
                    {/* Ears/Horns */}
                    <path d="M5 7 Q6 4, 8 6" />
                    <path d="M19 7 Q18 4, 16 6" />
                </svg>
            )
        },
        {
            name: 'Email',
            url: 'mailto:ayushhoff@gmail.com',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            )
        },
        {
            name: 'GitHub',
            url: 'https://github.com/macayu17',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            )
        },
        {
            name: 'Resume',
            url: 'https://drive.google.com/file/d/17gpYCKHWaRaP-nWlHa7W0SmWo18snXWU/view?usp=sharing',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            )
        }
    ];

    const sidebarStyle = {
        position: 'fixed',
        right: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        padding: '0.6rem',
        background: 'rgba(17, 17, 17, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '50px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)'
    };

    const linkStyle = {
        width: '38px',
        height: '38px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        transition: 'all 0.3s ease',
        textDecoration: 'none'
    };

    return (
        <div style={sidebarStyle}>
            {socials.map((social, index) => (
                <a
                    key={index}
                    href={social.url}
                    style={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    {social.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialSidebar;

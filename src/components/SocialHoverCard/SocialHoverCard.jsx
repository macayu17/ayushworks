import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './SocialHoverCard.css';

const GITHUB_USERNAME = 'macayu17';
const STATS_CACHE_KEY = 'social-github-stats';
const STATS_CACHE_TTL = 3600000;
const CARD_WIDTH = 248;
const CARD_HEIGHT_ESTIMATE = 196;
const GAP = 8;

const profiles = {
    GitHub: {
        name: 'Ayush Kumar',
        handle: '@macayu17',
        avatar: `https://github.com/${GITHUB_USERNAME}.png`,
        bio: 'Software Engineer · Bengaluru',
        location: 'Bengaluru, IN',
        live: true,
    },
    X: {
        name: 'Ayush Kumar',
        handle: '@ayush_174_',
        avatar: `https://github.com/${GITHUB_USERNAME}.png`,
        bio: '(◔‿◔)',
        location: 'Bengaluru, IN',
        stats: [{ value: 117, label: 'Followers' }],
    },
    LinkedIn: {
        name: 'Ayush Kumar',
        handle: 'in/anayush14',
        avatar: `https://github.com/${GITHUB_USERNAME}.png`,
        bio: 'Computer Science Undergraduate | Software Engineering',
        location: 'Bengaluru, IN',
        stats: [{ value: 45, label: 'Connections' }],
    },
};

const fetchGithubStats = async () => {
    try {
        const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(STATS_CACHE_KEY) : null;
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < STATS_CACHE_TTL) {
                return data;
            }
        }

        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!res.ok) {
            return null;
        }
        const data = await res.json();
        const stats = [
            { value: data.public_repos ?? 0, label: 'Repositories' },
            { value: data.followers ?? 0, label: 'Followers' },
            { value: data.following ?? 0, label: 'Following' },
        ];

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STATS_CACHE_KEY, JSON.stringify({ data: stats, timestamp: Date.now() }));
        }
        return stats;
    } catch {
        return null;
    }
};

const SocialHoverCard = ({ socialName, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [stats, setStats] = useState(null);
    const [cardPos, setCardPos] = useState(null);
    const triggerRef = useRef(null);
    const openTimer = useRef(null);
    const closeTimer = useRef(null);
    const fetchedRef = useRef(false);
    const isTouchRef = useRef(false);

    const profile = profiles[socialName];

    const computePosition = useCallback(() => {
        if (!triggerRef.current) return null;
        const rect = triggerRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const cardW = Math.min(CARD_WIDTH, vw - GAP * 2);
        let x = rect.left + rect.width / 2 - cardW / 2;
        x = Math.max(GAP, Math.min(x, vw - cardW - GAP));
        const spaceAbove = rect.top - GAP;
        const spaceBelow = window.innerHeight - rect.bottom - GAP;
        const showBelow = spaceBelow >= spaceAbove;
        const y = showBelow ? rect.bottom + GAP : Math.max(GAP, rect.top - CARD_HEIGHT_ESTIMATE - GAP);
        return { x, y, cardW };
    }, []);

    const handleOpen = useCallback(() => {
        clearTimeout(closeTimer.current);
        openTimer.current = setTimeout(() => {
            const pos = computePosition();
            if (pos) setCardPos(pos);
            setIsOpen(true);
            if (profile?.live && !fetchedRef.current) {
                fetchedRef.current = true;
                fetchGithubStats().then(setStats);
            }
        }, 250);
    }, [profile, computePosition]);

    const handleClose = useCallback(() => {
        clearTimeout(openTimer.current);
        closeTimer.current = setTimeout(() => setIsOpen(false), 150);
    }, []);

    const handleToggle = useCallback(() => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            const pos = computePosition();
            if (pos) setCardPos(pos);
            setIsOpen(true);
            if (profile?.live && !fetchedRef.current) {
                fetchedRef.current = true;
                fetchGithubStats().then(setStats);
            }
        }
    }, [isOpen, profile, computePosition]);

    const handleClickOutside = useCallback((e) => {
        if (triggerRef.current && !triggerRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const handleScroll = () => setIsOpen(false);
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('touchstart', handleClickOutside, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen, handleClickOutside]);

    useEffect(() => () => {
        clearTimeout(openTimer.current);
        clearTimeout(closeTimer.current);
    }, []);

    if (!profile) {
        return <>{children}</>;
    }

    const displayStats = profile.live ? (stats ?? []) : (profile.stats ?? []);
    const cardWidth = cardPos?.cardW ? `${cardPos.cardW}px` : undefined;

    return (
        <span
            className="social-hover-trigger"
            ref={triggerRef}
            onMouseEnter={() => { if (!isTouchRef.current) handleOpen(); }}
            onMouseLeave={() => { if (!isTouchRef.current) handleClose(); }}
            onFocus={handleOpen}
            onBlur={handleClose}
            onClick={(e) => {
                if (isTouchRef.current) {
                    e.preventDefault();
                    handleToggle();
                }
            }}
            onTouchStart={() => { isTouchRef.current = true; }}
        >
            {children}
            {isOpen && cardPos && createPortal(
                <div
                    className="social-hover-card"
                    style={{ left: `${cardPos.x}px`, top: `${cardPos.y}px`, width: cardWidth }}
                    role="tooltip"
                >
                    <div className="social-hover-card-header">
                        <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="social-hover-card-avatar"
                            loading="lazy"
                            onError={(e) => { e.target.style.visibility = 'hidden'; }}
                        />
                        <div className="social-hover-card-identity">
                            <span className="social-hover-card-name">{profile.name}</span>
                            <span className="social-hover-card-handle">{profile.handle}</span>
                        </div>
                    </div>
                    {profile.bio && <p className="social-hover-card-bio">{profile.bio}</p>}
                    {profile.location && (
                        <div className="social-hover-card-location">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>{profile.location}</span>
                        </div>
                    )}
                    {displayStats.length > 0 && (
                        <div className="social-hover-card-stats">
                            {displayStats.map((stat, i) => (
                                <div className="social-hover-stat" key={i}>
                                    <span className="social-hover-stat-value">{stat.value}</span>
                                    <span className="social-hover-stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>,
                document.body
            )}
        </span>
    );
};

export default SocialHoverCard;

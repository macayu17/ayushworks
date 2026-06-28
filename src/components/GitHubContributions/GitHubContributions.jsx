import './GitHubContributions.css';
import { useRef, useEffect, useMemo, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import 'react-tooltip/dist/react-tooltip.css';
import { getContributionCubeProps } from '../../utils/contributionCube';
import { getContributionCalendarLayout } from '../../utils/contributionCalendarLayout';
import { getWeekPaddedContributionRange } from '../../utils/contributionCalendarData';

const GitHubContributions = ({ username = 'macayu17' }) => {
    const calendarWrapperRef = useRef(null);
    const [totalContributions, setTotalContributions] = useState(0);
    const [contributions, setContributions] = useState([]);
    const [siteTheme, setSiteTheme] = useState(() =>
        typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
    );
    const [isCompactMobile, setIsCompactMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 640 : false
    );
    const [calendarLayout, setCalendarLayout] = useState(() =>
        getContributionCalendarLayout({
            containerWidth: typeof window !== 'undefined' ? window.innerWidth : 640,
            compact: typeof window !== 'undefined' ? window.innerWidth < 640 : false
        })
    );

    const themeColors = useMemo(() => ({
        dark: ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#f4f4f5'],
        light: ['#efe7d9', '#d4c5ad', '#a99572', '#6f675b', '#151412']
    }), []);

    useEffect(() => {
        const updateTheme = () => {
            setSiteTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
        };
        const updateCompactMode = () => {
            setIsCompactMobile(window.innerWidth < 640);
        };

        updateTheme();
        updateCompactMode();
        window.addEventListener('resize', updateCompactMode);
        const themeObserver = new MutationObserver(updateTheme);
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        const fetchContributions = async () => {
            try {
                const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
                const data = await response.json();
                if (Array.isArray(data?.contributions)) {
                    setContributions(data.contributions);
                }
                if (data && data.total) {
                    const keys = Object.keys(data.total);
                    if (keys.length > 0) {
                        setTotalContributions(data.total[keys[0]]);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch contributions for total count", err);
            }
        };
        fetchContributions();
        return () => {
            window.removeEventListener('resize', updateCompactMode);
            themeObserver.disconnect();
        };
    }, [username]);

    useEffect(() => {
        if (!calendarWrapperRef.current) {
            return undefined;
        }

        const updateCalendarLayout = () => {
            const nextLayout = getContributionCalendarLayout({
                containerWidth: calendarWrapperRef.current?.clientWidth || 0,
                compact: isCompactMobile
            });

            setCalendarLayout((currentLayout) => (
                currentLayout.blockSize === nextLayout.blockSize &&
                currentLayout.blockMargin === nextLayout.blockMargin &&
                currentLayout.fontSize === nextLayout.fontSize
                    ? currentLayout
                    : nextLayout
            ));
        };

        updateCalendarLayout();

        const resizeObserver = new ResizeObserver(updateCalendarLayout);
        resizeObserver.observe(calendarWrapperRef.current);

        const timer = setTimeout(() => {
            if (calendarWrapperRef.current) {
                calendarWrapperRef.current.scrollLeft = 0;
            }
        }, 250);

        return () => {
            clearTimeout(timer);
            resizeObserver.disconnect();
        };
    }, [isCompactMobile]);

    const visibleContributions = useMemo(() => getWeekPaddedContributionRange(contributions, {
        monthsBack: isCompactMobile ? 10 : 12,
        extendToEndOfMonth: true,
    }), [contributions, isCompactMobile]);

    const weeks = useMemo(() => {
        const weekChunks = [];
        for (let index = 0; index < visibleContributions.length; index += 7) {
            weekChunks.push(visibleContributions.slice(index, index + 7));
        }
        return weekChunks;
    }, [visibleContributions]);

    const monthLabels = useMemo(() => {
        const labels = [];
        weeks.forEach((week, weekIndex) => {
            const monthStart = week.find((day) => day?.date?.endsWith('-01'));
            if (monthStart) {
                const label = new Date(`${monthStart.date}T00:00:00`).toLocaleString('en-US', { month: 'short' });
                labels.push({ label, weekIndex });
            }
        });
        return labels;
    }, [weeks]);

    const calendarColors = themeColors[siteTheme];
    return (
        <section className="github-contributions" id="contributions">
            <div className="contributions-header">
                <h3 className="contributions-title">
                    GitHub <span className="contributions-username">@{username}</span>
                </h3>
                <Link to="/open-source" className="contributions-page-link">
                    Open source contributions
                    <FaArrowRight size={10} />
                </Link>
            </div>
            <div className="calendar-wrapper" ref={calendarWrapperRef}>
                <div
                    className="calendar-inner"
                    style={{
                        '--calendar-block-gap': `${calendarLayout.blockMargin}px`,
                        '--calendar-week-count': String(weeks.length),
                    }}
                >
                    <div className="calendar-month-row" aria-hidden="true">
                        {monthLabels.map(({ label, weekIndex }) => (
                            <span
                                key={`${label}-${weekIndex}`}
                                className="calendar-month-label"
                                style={{ gridColumn: `${weekIndex + 1}` }}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                    <div className="calendar-grid" aria-label={`${username} GitHub contribution calendar`}>
                        {weeks.map((week, weekIndex) => (
                            <div className="calendar-week" key={`week-${weekIndex}`}>
                                {week.map((activity, dayIndex) => {
                                    const activityWithIndex = {
                                        ...activity,
                                        index: (weekIndex * 7) + dayIndex,
                                    };
                                    const cubeProps = getContributionCubeProps(activityWithIndex, activityWithIndex.index);
                                    const isEmpty = !activity.level;

                                    return (
                                        <span
                                            key={activity.date}
                                            className={`calendar-day contribution-cube-cell ${cubeProps.className || ''}`}
                                            data-level={activity.level}
                                            data-tooltip-id="github-tooltip"
                                            data-tooltip-html={`<span style="color:var(--zinc-300)">[COMMIT_RECORD]</span><br/><strong>${activity.count} contributions</strong> on ${activity.date}`}
                                            style={{
                                                ...cubeProps.style,
                                                backgroundColor: isEmpty ? 'transparent' : (calendarColors[activity.level] || calendarColors[0]),
                                                boxShadow: isEmpty ? `inset 0 0 0 1px ${calendarColors[0]}` : undefined,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <div className="calendar-legend" aria-hidden="true">
                        <span>Less</span>
                        {calendarColors.map((color, index) => (
                            <span
                                key={`${color}-${index}`}
                                className="calendar-legend-cell"
                                style={index === 0 ? { backgroundColor: 'transparent', boxShadow: `inset 0 0 0 1px ${color}` } : { backgroundColor: color }}
                            />
                        ))}
                        <span>More</span>
                    </div>
                    <Tooltip
                        id="github-tooltip"
                        border="1px dashed var(--zinc-700)"
                        style={{ backgroundColor: 'var(--surface-panel-strong)', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'var(--font-jetbrains)', color: 'var(--zinc-100)', zIndex: 999 }}
                    />
                </div>
                <div className={`custom-total-contributions ${isCompactMobile ? 'mobile' : 'overlay'}`}>
                    <span className="custom-total-number">{totalContributions > 0 ? totalContributions : '...'}</span>
                    <span className="custom-total-label">CONTRIBUTIONS</span>
                </div>
            </div>
        </section>
    );
};

export default GitHubContributions;

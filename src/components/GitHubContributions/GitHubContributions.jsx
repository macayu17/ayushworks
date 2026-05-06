import { GitHubCalendar } from 'react-github-calendar';
import './GitHubContributions.css';
import { useRef, useEffect, useState, cloneElement } from 'react';
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

    const customTheme = {
        dark: ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#f4f4f5'],
        light: ['#efe7d9', '#d4c5ad', '#a99572', '#6f675b', '#151412']
    };

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

    const selectVisibleRange = (contributions) => getWeekPaddedContributionRange(contributions, {
        monthsBack: isCompactMobile ? 10 : 12,
    });

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
                <div className="calendar-inner">
                    <GitHubCalendar
                        username={username}
                        theme={customTheme}
                        colorScheme={siteTheme}
                        blockSize={calendarLayout.blockSize}
                        blockMargin={calendarLayout.blockMargin}
                        fontSize={calendarLayout.fontSize}
                        showColorLegend={true}
                        showMonthLabels={true}
                        showTotalCount={false}
                        labels={{ totalCount: '' }}
                        transformData={selectVisibleRange}
                        renderBlock={(block, activity) => {
                            const cubeProps = getContributionCubeProps(activity, activity.index);

                            return cloneElement(block, {
                                ...cubeProps,
                                className: [block.props.className, cubeProps.className].filter(Boolean).join(' '),
                                style: {
                                    ...block.props.style,
                                    ...cubeProps.style,
                                },
                                'data-tooltip-id': 'github-tooltip',
                                'data-tooltip-html': `<span style="color:var(--zinc-300)">[COMMIT_RECORD]</span><br/><strong>${activity.count} contributions</strong> on ${activity.date}`,
                                title: null
                            });
                        }}
                        style={{ margin: '0', color: 'var(--zinc-300)' }}
                        errorMessage="Failed to load GitHub contributions"
                    />
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

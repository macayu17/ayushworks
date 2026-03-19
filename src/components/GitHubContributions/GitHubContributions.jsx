import { GitHubCalendar } from 'react-github-calendar';
import './GitHubContributions.css';
import { useRef, useEffect, useState, cloneElement } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const GitHubContributions = ({ username = 'macayu17' }) => {
    const calendarWrapperRef = useRef(null);
    const [totalContributions, setTotalContributions] = useState(0);
    const [isCompactMobile, setIsCompactMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 640 : false
    );

    const customTheme = {
        // White/Grayscale theme matching screenshot
        dark: ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#f4f4f5']
    };

    useEffect(() => {
        const updateCompactMode = () => {
            setIsCompactMobile(window.innerWidth < 640);
        };

        updateCompactMode();
        window.addEventListener('resize', updateCompactMode);

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
        };
    }, [username]);

    useEffect(() => {
        if (!calendarWrapperRef.current) {
            return undefined;
        }

        if (isCompactMobile) {
            calendarWrapperRef.current.scrollLeft = 0;
            return undefined;
        }

        const timer = setTimeout(() => {
            if (calendarWrapperRef.current) {
                calendarWrapperRef.current.scrollLeft = calendarWrapperRef.current.scrollWidth;
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [isCompactMobile]);

    const selectVisibleRange = (contributions) => {
        const cutoffDate = new Date();
        cutoffDate.setHours(0, 0, 0, 0);
        cutoffDate.setMonth(cutoffDate.getMonth() - (isCompactMobile ? 10 : 12));

        return contributions.filter(activity => {
            const date = new Date(activity.date);
            return date >= cutoffDate;
        });
    };

    return (
        <section className="github-contributions" id="contributions">
            <div className="contributions-header">
                <h3 className="contributions-title">
                    GitHub <span className="contributions-username">@{username}</span>
                </h3>
            </div>
            <div className="calendar-wrapper" ref={calendarWrapperRef}>
                <div className="calendar-inner">
                    <GitHubCalendar
                        username={username}
                        theme={customTheme}
                        colorScheme="dark"
                        blockSize={isCompactMobile ? 6 : 9}
                        blockMargin={isCompactMobile ? 1 : 2}
                        fontSize={isCompactMobile ? 9 : 12}
                        showColorLegend={true}
                        showMonthLabels={true}
                        showTotalCount={false}
                        labels={{ totalCount: '' }}
                        transformData={selectVisibleRange}
                        renderBlock={(block, activity) => 
                            cloneElement(block, {
                                'data-tooltip-id': 'github-tooltip',
                                'data-tooltip-html': `<span style="color:var(--zinc-300)">[COMMIT_RECORD]</span><br/><strong>${activity.count} contributions</strong> on ${activity.date}`,
                                title: null
                            })
                        }
                        style={{ margin: '0', color: 'var(--zinc-300)' }}
                        errorMessage="Failed to load GitHub contributions"
                    />
                    <Tooltip
                        id="github-tooltip"
                        border="1px dashed #3f3f46"
                        style={{ backgroundColor: '#18181b', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'var(--font-jetbrains)', color: '#fff', zIndex: 999 }}
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

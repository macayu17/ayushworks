import { GitHubCalendar } from 'react-github-calendar';
import './GitHubContributions.css';
import { useRef, useEffect } from 'react';

const GitHubContributions = ({ username = 'macayu17' }) => {
    const calendarWrapperRef = useRef(null);

    const customTheme = {
        // White/Grayscale theme matching screenshot
        dark: ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#f4f4f5']
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (calendarWrapperRef.current) {
                calendarWrapperRef.current.scrollLeft = calendarWrapperRef.current.scrollWidth;
            }
        }, 500);
        return () => clearTimeout(timer);
    }, []);

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
                        blockSize={11}
                        blockMargin={4}
                        fontSize={12}
                        hideColorLegend={false}
                        hideMonthLabels={false}
                        hideTotalCount={false}
                        style={{ margin: '0 auto', color: 'var(--zinc-300)' }}
                        labels={{
                            totalCount: '{{count}} CONTRIBUTIONS'
                        }}
                        errorMessage="Failed to load GitHub contributions"
                    />
                </div>
            </div>
        </section>
    );
};

export default GitHubContributions;

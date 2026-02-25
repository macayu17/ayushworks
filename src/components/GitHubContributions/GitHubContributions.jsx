import { GitHubCalendar } from 'react-github-calendar';
import './GitHubContributions.css';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useRef, useEffect } from 'react';

const GitHubContributions = ({ username = 'macayu17' }) => {
    const [containerRef, containerVisible] = useScrollAnimation({ threshold: 0.2 });
    const calendarWrapperRef = useRef(null);

    // Custom theme matching your dark portfolio
    const customTheme = {
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
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
            <div className="container">
                <div
                    ref={containerRef}
                    className={`contributions-container scroll-hidden ${containerVisible ? 'scroll-visible' : ''}`}
                >
                    <div className="contributions-header">
                        <h3 className="contributions-title">
                            GitHub Contributions <span className="contributions-username">@{username}</span>
                        </h3>
                    </div>

                    <div className="calendar-wrapper" ref={calendarWrapperRef}>
                        <div className="calendar-inner">
                            <GitHubCalendar
                                username={username}
                                theme={customTheme}
                                colorScheme="dark"
                                blockSize={12}
                                blockMargin={3}
                                fontSize={13}
                                hideColorLegend={false}
                                hideMonthLabels={false}
                                hideTotalCount={false}
                                style={{ margin: '0 auto' }}
                                labels={{
                                    totalCount: '{{count}} contributions in the last year'
                                }}
                                errorMessage="Failed to load GitHub contributions"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GitHubContributions;

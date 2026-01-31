import { GitHubCalendar } from 'react-github-calendar';
import './GitHubContributions.css';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const GitHubContributions = ({ username = 'macayu17' }) => {
    const [containerRef, containerVisible] = useScrollAnimation({ threshold: 0.2 });

    // Custom theme matching your dark portfolio
    const customTheme = {
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
    };

    return (
        <section className="github-contributions" id="contributions">
            <div className="container">
                <div
                    ref={containerRef}
                    className={`contributions-container scroll-hidden ${containerVisible ? 'scroll-visible' : ''}`}
                >
                    <div className="contributions-header">
                        <h3 className="contributions-title">
                            GitHub Contributions
                            <span className="contributions-username">• @{username}</span>
                        </h3>
                    </div>

                    <div className="calendar-wrapper">
                        <div className="calendar-inner">
                            <GitHubCalendar
                                username={username}
                                theme={customTheme}
                                colorScheme="dark"
                                blockSize={10}
                                blockMargin={2}
                                fontSize={12}
                                hideColorLegend={false}
                                hideMonthLabels={false}
                                hideTotalCount={false}
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

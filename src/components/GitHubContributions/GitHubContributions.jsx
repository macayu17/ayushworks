import { GitHubCalendar } from 'react-github-calendar';
import './GitHubContributions.css';
import { useRef, useEffect, useState } from 'react';

const GitHubContributions = ({ username = 'macayu17' }) => {
    const calendarWrapperRef = useRef(null);
    const [totalContributions, setTotalContributions] = useState(0);

    const customTheme = {
        // White/Grayscale theme matching screenshot
        dark: ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#f4f4f5']
    };

    useEffect(() => {
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

        const timer = setTimeout(() => {
            if (calendarWrapperRef.current) {
                calendarWrapperRef.current.scrollLeft = calendarWrapperRef.current.scrollWidth;
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [username]);

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
                        hideTotalCount={true}
                        style={{ margin: '0 auto', color: 'var(--zinc-300)' }}
                        errorMessage="Failed to load GitHub contributions"
                    />
                </div>
            </div>

            <div className="custom-total-contributions">
                <span className="custom-total-number">{totalContributions > 0 ? totalContributions : '...'}</span>
                <span className="custom-total-label">CONTRIBUTIONS</span>
            </div>
        </section>
    );
};

export default GitHubContributions;

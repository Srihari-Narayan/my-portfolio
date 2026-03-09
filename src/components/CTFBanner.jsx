import React from 'react';
import { Link } from 'react-router-dom';

function CTFBanner() {
    return (
        <div className="ctf-mobile-banner section">
            <div className="container">
                <div className="terminal-window">
                    <div className="terminal-header">
                        <div className="terminal-buttons">
                            <span className="terminal-btn red"></span>
                            <span className="terminal-btn yellow"></span>
                            <span className="terminal-btn green"></span>
                        </div>
                        <div className="terminal-title">device_check.sh</div>
                    </div>
                    <div className="terminal-content">
                        <p className="command-line">
                            <span className="prompt">root@kali:~#</span> ./check_device.sh
                        </p>
                        <p className="output-text text-yellow">
                            [!] MOBILE DEVICE DETECTED
                        </p>
                        <p className="output-text">
                            Error: Screen size too small for hacking operations.
                        </p>
                        <p className="output-text">
                            The CTF Challenge requires a desktop environment with a keyboard and developer tools.
                        </p>
                        <br />
                        <p className="output-text text-green">
                            {'>'} Please switch to a laptop or desktop to access the CTF.
                        </p>
                        <br />
                        <Link to="/" className="btn btn-outline" style={{ marginTop: '1rem', width: '100%' }}>
                            Return to Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CTFBanner;

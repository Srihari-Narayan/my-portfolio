import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { validFlagHashes, sha256, getSubmittedFlags, saveSubmittedFlags } from '../utils/flagValidation';

function SubmitFlags() {
    const [flagInput, setFlagInput] = useState('');
    const [output, setOutput] = useState('');
    const [submittedFlags, setSubmittedFlags] = useState([]);

    useEffect(() => {
        setSubmittedFlags(getSubmittedFlags());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const input = flagInput.trim();

        // Hash the input
        const inputHash = await sha256(input);

        // Check if it's a valid flag
        if (validFlagHashes.includes(inputHash)) {
            // Check if already submitted
            if (submittedFlags.includes(inputHash)) {
                setOutput('<p style="color: orange;">⚠️ You already submitted this flag!</p>');
                toast('⚠️ You already submitted this flag!', {
                    icon: '⚠️',
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                });
            } else {
                // New flag!
                const newSubmittedFlags = [...submittedFlags, inputHash];
                setSubmittedFlags(newSubmittedFlags);
                saveSubmittedFlags(newSubmittedFlags);

                if (newSubmittedFlags.length === 5) {
                    toast.success('🎉 Congratulations! You found all 5 flags!', {
                        duration: 5000,
                        style: {
                            background: '#00ff00',
                            color: '#000',
                            fontWeight: 'bold',
                        },
                    });
                    setOutput('<p style="color: #00ff00; font-size: 1.2rem;">✓ Flag accepted! 🎉<br/><br/>ALL FLAGS FOUND! You\'re a true CTF champion!</p>');
                } else {
                    toast.success(`🎉 Good job! Valid flag submitted! (${newSubmittedFlags.length}/5)`, {
                        duration: 4000,
                    });
                    setOutput(`<p style="color: #00ff00;">✓ Flag accepted! (${newSubmittedFlags.length}/5)</p>`);
                }
            }

            // Clear input
            setFlagInput('');
        } else {
            // Intentionally vulnerable to XSS - this helps discover the 5th flag!
            // SECURITY NOTE: This is intentionally insecure for CTF purposes
            setOutput('<p style="color: var(--color-text-secondary);">You submitted: ' + input + '</p>');

            // Easter egg: If they found the XSS vulnerability, show them the flag
            if (input.includes('<script>') || input.includes('alert(') || input.includes('onerror=')) {
                setTimeout(() => {
                    // Decode base64 flag
                    const encoded = 'ZmxhZ3tJX3Nob3VsZF9oYXZlX3Nhbml0aXplZF91c2VyX2lucHV0c19iZWZvcmVfcmVuZGVyaW5nfQ==';
                    const flag = atob(encoded);
                    setOutput(prevOutput =>
                        prevOutput + '<p style="color: var(--color-red); margin-top: 1rem; padding: 1rem; background: rgba(220, 20, 60, 0.1); border: 1px solid var(--color-red); border-radius: 4px; font-family: \'Courier New\', monospace;">🚩 XSS Vulnerability Found!<br/><br/>' + flag + '<br/><br/>Now submit this flag!</p>'
                    );
                }, 100);
            }
        }
    };

    return (
        <div className="submit-container">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="submit-box">
                <h1>🚩 Flag Submission</h1>
                <p>Found a flag? Submit it here to track your progress!</p>

                <form onSubmit={handleSubmit} className="flag-form">
                    <input
                        type="text"
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                        className="flag-input"
                        placeholder="flag{...}"
                        autoComplete="off"
                    />
                    <button type="submit" className="submit-button">Submit Flag</button>
                </form>

                <div id="output" dangerouslySetInnerHTML={{ __html: output }}></div>

                <div className="progress-info">
                    <h3>Progress: <span id="progress">{submittedFlags.length}/5</span> Flags Found</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        Can you find all 5 hidden flags?
                    </p>
                </div>
            </div>

            <div className="back-link">
                <Link to="/">← Return to Homepage</Link>
            </div>
        </div>
    );
}

export default SubmitFlags;

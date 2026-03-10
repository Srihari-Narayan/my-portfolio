import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SubmitFlags from './pages/SubmitFlags';
import AdminPanel from './pages/AdminPanel';
import Resume from './pages/Resume';

import AIChatbot from './components/AIChatbot';

function App() {
    useEffect(() => {
        // CTF Hint: Lead users to DNS records
        console.log("%cLooking for Flag 7? The answers are in the clouds.", "color: #dc143c; font-weight: bold; font-size: 1.2rem;");
        console.log("Try querying for TXT records on sncyber.dev");
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/submit-flags" element={<SubmitFlags />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <AIChatbot />
        </Router>
    );
}

export default App;

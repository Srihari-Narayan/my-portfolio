import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SubmitFlags from './pages/SubmitFlags';
import AdminPanel from './pages/AdminPanel';
import Resume from './pages/Resume';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/submit-flags" element={<SubmitFlags />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;

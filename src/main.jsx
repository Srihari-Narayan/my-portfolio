import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// CTF Flag #3: Set admin token cookie (from original script.js)
document.cookie = "__admin_token=flag{I_should_have_removed_admin_tokens_from_production}; path=/; max-age=31536000";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

import { Link } from 'react-router-dom';

function AdminPanel() {
    return (
        <div className="admin-container">
            <div className="admin-warning">
                <h1>⚠️ Unauthorized Access</h1>
                <p>This admin panel should not be accessible to the public.</p>
                <p>If you're seeing this page, someone forgot to remove it from production!</p>

                <div className="flag-box">
                    flag{'{I_should_have_removed_the_admin_panel_from_public_access}'}
                </div>
            </div>

            <div className="back-link">
                <Link to="/">← Return to Homepage</Link>
            </div>
        </div>
    );
}

export default AdminPanel;

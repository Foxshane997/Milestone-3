const Header = ({ user, handleLogout }) => {
    const navigate = useNavigate(); // Create a navigate function

    return (
        <header>
            <h1>Your App Name</h1>
            <nav>
                <Link to="/">Home</Link> {/* Home Button */}
                {user ? (
                    <>
                        <span>Welcome, {user.username}!</span> {/* Display logged-in user's name */}
                        <button onClick={handleLogout}>Logout</button>
                        {user.admin && (
                            <button onClick={() => navigate('/admin')}>Admin</button> // Use navigate for Admin button
                        )}
                    </>
                ) : null} {/* Removed Login and Register links */}
            </nav>
        </header>
    );
};

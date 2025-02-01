import React from 'react'

function Logout({setIsAuthenticated}) {
    // Clear the token from localStorage and cookies
    localStorage.removeItem("token");
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

    // Update the auth state
    setIsAuthenticated(false); // Update parent state

    // Redirect to login page
    window.location.href = "/auth";
}

export default Logout

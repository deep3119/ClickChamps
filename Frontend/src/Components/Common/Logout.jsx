function Logout({setIsAuthenticated}) {
    localStorage.removeItem("token");
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

    setIsAuthenticated(false); 

    window.location.href = "/auth";
}

export default Logout

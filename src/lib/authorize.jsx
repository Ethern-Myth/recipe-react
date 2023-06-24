import React from "react";

const AuthContext = React.createContext(null);

export const Authorize = ({ children }) => {
    const setToken = (token) => {
        localStorage.setItem("token", token);
    };

    const setId = (id) => {
        localStorage.setItem("id", id);
    };

    const setUser = (value) => {
        localStorage.setItem("user", value);
    };

    const setIsLoggedIn = (value) => {
        localStorage.setItem("isLoggedIn", value);
    };

    const getIsLoggedIn = () => {
        return localStorage.getItem("isLoggedIn");
    };

    const getUser = () => {
        return localStorage.getItem("user");
    };

    const getId = () => {
        return localStorage.getItem("id");
    };

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const removeToken = () => {
        return localStorage.removeItem("token");
    };

    const removeId = () => {
        return localStorage.removeItem("id");
    };

    const removeUser = () => {
        return localStorage.removeItem("user");
    };

    const removeIsLoggedIn = () => {
        return localStorage.removeItem("isLoggedIn");
    };

    const login = (value) => {
        setIsLoggedIn(value);
    };

    const logout = () => {
        removeToken();
        removeId();
        removeUser();
        removeIsLoggedIn();
    };

    React.useEffect(() => {
        const token = getToken();
        const id = getId();
        const user = getUser();
        const isLoggedIn = getIsLoggedIn();
        if (token !== null) {
            setToken(token);
            setId(id);
            setUser(user);
            setIsLoggedIn(isLoggedIn);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                login,
                setToken,
                getToken,
                setId,
                getId,
                setUser,
                getUser,
                setIsLoggedIn,
                getIsLoggedIn,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
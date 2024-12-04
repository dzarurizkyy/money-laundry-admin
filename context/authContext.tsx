import React, { createContext, useContext, useState, useEffect } from "react"

interface AuthContextProps {
    token: string | null,
    setToken: (token: string) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null)

    const setToken = (token: string) => {
        localStorage.setItem("token", token);
        setTokenState(token)
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if(storedToken) setTokenState(storedToken)
    }, [])
    
    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}
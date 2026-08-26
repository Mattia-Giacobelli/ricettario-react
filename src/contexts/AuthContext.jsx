import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

function AuthProvider({ children }) {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loggedUser, setLoggedUser] = useState(() => {

        const savedUser = localStorage.getItem("user")

        return savedUser ? JSON.parse(savedUser) : {}
    });
    const [savedToken, setSavedToken] = useState(() => {

        const savedToken = localStorage.getItem("token")

        return savedToken ? savedToken : ""
    });

    useEffect(() => { localStorage.setItem("user", JSON.stringify(loggedUser)) }, [loggedUser])

    function register(username, email, password) {

        const newUser = {

            username,
            email,
            permission: "",
            password

        }

        axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, newUser)
            .then(res => {
                console.log(res.data)
            })


        setUsername("")
        setEmail("")
        setPassword("")

        navigate("/login")

    }

    function login(username, password) {

        const user = {

            username,
            password

        }

        axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, user)
            .then(res => {
                console.log(res.data)
                setLoggedUser(() => {
                    localStorage.setItem("user", JSON.stringify(res.data))
                    return JSON.parse(localStorage.getItem("user"))
                })
                setSavedToken(() => {
                    localStorage.setItem("token", res.data.token)
                    return localStorage.getItem("token")
                })
            })


        setUsername("")
        setPassword("")

        navigate("/")

    }

    function logout() {

        setLoggedUser(() => {
            localStorage.setItem("user", JSON.stringify({}))
            return JSON.parse(localStorage.getItem("user"))
        })

        setSavedToken(() => {
            localStorage.setItem("token", "")
            return localStorage.getItem("token")
        })

        navigate("/")

    }



    return (

        <AuthContext.Provider
            value={{
                username, setUsername, email, setEmail, password, setPassword, loggedUser, setLoggedUser,
                register, login, logout
            }}>
            {children}
        </AuthContext.Provider>

    )

}

function useAuth() {

    const context = useContext(AuthContext)

    return context

}

export { AuthProvider, useAuth }
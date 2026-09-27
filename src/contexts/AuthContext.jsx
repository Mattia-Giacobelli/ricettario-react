import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

function AuthProvider({ children }) {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [usernameErr, setUsernameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")

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

        setUsernameErr("")

        const newUser = {

            username,
            email,
            permission: "",
            password

        }

        axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, newUser)
            .then(res => {
                console.log(res.data)

                navigate("/login")
            })
            .catch(err => {

                if (err.response.data === "Username già in uso") {


                    console.log(err.response.data);

                    setUsernameErr(err.response.data)

                }

            })


        setUsername("")
        setEmail("")
        setPassword("")

    }

    function login(username, password) {

        setUsernameErr("")
        setPasswordErr("")

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

                navigate("/")
            })
            .catch(err => {

                console.log(err.response.data);

                if (err.response.data === "Utente non trovato") {

                    setUsernameErr(err.response.data)

                } else if (err.response.data === "Password errata") {

                    setPasswordErr(err.response.data)

                }

            })


        setUsername("")
        setPassword("")

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
                register, login, logout, usernameErr, passwordErr
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
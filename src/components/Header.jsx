import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Header() {

    const { loggedUser, logout } = useAuth()


    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand text-decoration-none" to="/">
                        <h2 className="bg-dark text-info-emphasis great-vibes-regular">
                            Ricettario
                        </h2>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center justifu-content-end">
                            {loggedUser?.username ? (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle bg-dark text-info great-vibes-regular"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {loggedUser?.username}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end shadow bg-dark text-info great-vibes-regular">
                                        <li>
                                            <button onClick={() => { logout() }} className="dropdown-item bg-dark text-info great-vibes-regular" to="/login">
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle bg-dark text-info great-vibes-regular"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Accedi
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end shadow bg-dark text-info great-vibes-regular">
                                        <li>
                                            <Link className="dropdown-item bg-dark text-info great-vibes-regular" to="/login">
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item bg-dark text-info great-vibes-regular" to="/register">
                                                Registrati
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
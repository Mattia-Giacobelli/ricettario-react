import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useRecipes } from "../contexts/RecipesContext"

export default function Header() {

    const { loggedUser, logout } = useAuth()

    const { searchValue, getSearch } = useRecipes()


    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand text-decoration-none" to="/">
                        <h2 className="bg-dark text-info-emphasis great-vibes-regular m-0">
                            Ricettario
                        </h2>
                    </Link>

                    <input name="search" class="form-control search-pop-up h-search" type="text"
                        value={searchValue} onChange={e => getSearch(e.target.value)} />

                    <ul className="navbar-nav mb-2 mb-lg-0 align-items-center justify-content-end">
                        {loggedUser?.username ? (
                            <li className="nav-item dropdown position-relative">
                                <a
                                    className="nav-link dropdown-toggle bg-dark text-info great-vibes-regular"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {loggedUser?.username}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow bg-dark text-info great-vibes-regular position-absolute">
                                    <li>
                                        {/* Rimosso l'attributo errato 'to' dal button */}
                                        <button
                                            onClick={() => { logout() }}
                                            className="dropdown-item bg-dark text-info great-vibes-regular"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item dropdown position-relative">
                                <a
                                    className="nav-link dropdown-toggle bg-dark text-info great-vibes-regular"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Accedi
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow bg-dark text-info great-vibes-regular position-absolute">
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
            </nav>
        </header>
    )
}
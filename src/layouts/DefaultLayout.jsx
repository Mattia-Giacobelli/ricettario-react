import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import logo from "../assets/img/logo.png"
import { useEffect, useState } from "react";
import { useRecipes } from "../contexts/RecipesContext";

export default function DefaultLayout() {

    const { recipeName, setRecipeName, addSuggestion, lastPoll, setLastPoll, getLastPoll, errMsg,
        searchValue, getSearch
    } = useRecipes()

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        getLastPoll()

    }, [])

    return (

        <>

            <Header />

            <main>

                <div className="left-sidebar">

                    <img src={logo} alt="logo" />

                    <h2 className="text-center">
                        <Link>
                            Home
                        </Link>
                    </h2>

                    <h2 className="text-center">
                        <Link>
                            Ricette
                        </Link>
                    </h2>

                    {lastPoll?.winningRecipe?.name != "none" && lastPoll ?

                        <div className="text-center mt-5 m-3">

                            <div className="mb-2">
                                <i className="bi bi-trophy"></i> <br />
                                Ultima vincitrice: <br></br>
                                {lastPoll?.winningRecipe?.name}
                            </div>

                            <div className="card-body img-contain h-100 p-0 border rounded-1 border-warning">
                                <img className="p-0" src={`${import.meta.env.VITE_LARAVEL_IMG_URL}${lastPoll?.winningRecipe?.imageUrl}`}
                                    alt={lastPoll?.winningRecipe?.name} />
                            </div>

                        </div>
                        :
                        <div></div>

                    }

                </div>

                <div className="content">

                    <Outlet />

                </div>

                <div className="right-sidebar">


                    <button
                        className="bg-warning w-100"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        <i className="bi bi-search"></i>
                    </button>

                    <input
                        name="search"
                        className={`form-control search-pop-up ${isOpen ? 'fade-in' : 'd-none fade-out'}`}
                        type="text"
                        value={searchValue}
                        onChange={e => getSearch(e.target.value)}
                    />

                    <Link to={"/wheel"} className="w-100 mt-2">
                        <i className="bi bi-5-circle"></i>
                    </Link>

                </div>



            </main>

            <footer></footer>


            <div className="modal fade" id="suggestionModal" tabIndex="-1" aria-labelledby="suggestionModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="suggestionModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="row justify-content-center align-items-center">

                                <div className="col-8">

                                    <form className="text-center" onSubmit={e => {

                                        e.preventDefault()
                                        addSuggestion(0, recipeName)

                                    }}>

                                        <div className="mb-3">
                                            <label htmlFor="recipeName" className="form-label">Nome ricetta</label>
                                            <input type="text" className="form-control" id="recipeName" value={recipeName}
                                                onChange={e => setRecipeName(e.target.value)} />

                                            <small className="text-danger">{errMsg}</small>

                                        </div>

                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>

                                </div>

                            </div>

                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>

        </>

    )

}
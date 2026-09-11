import axios from "axios"
import { useEffect, useState } from "react"
import { useRecipes } from "../contexts/RecipesContext"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const colors = ['#0ec45a', '#88b40f', '#be9a08', '#dd6f0f', '#c52412']

export default function Home() {

    const navigate = useNavigate()

    const { loggedUser } = useAuth()

    const { recipes, setRecipes, recipesAll,
        activePoll, recipeId, setRecipeId, vote, addRecipe, deleteRecipe, getActivePoll,
        addSuggestion, getRecipesAll, getRecipes, setErrMsg, results } = useRecipes()

    async function nextPage(page) {

        await getRecipes(page)

    }

    useEffect(() => {

        getActivePoll()

    }, [])

    return (

        <>

            <div className="container mt-3">

                {activePoll &&

                    <div className="card">

                        <div className="card-header">
                            <h1 className="text-center">
                                Sondaggio attivo
                            </h1>
                        </div>

                        <div className="card-body">

                            <div className="row justify-content-center align-items-center">

                                {activePoll?.candidates?.length === 0 &&

                                    <div className="col-12 col-md-6">

                                        <h6>Ricette candidate</h6>

                                        <form onSubmit={e => {

                                            e.preventDefault()
                                            addRecipe(recipeId)

                                        }}>

                                            <div className="input-group">
                                                <select className="form-select" name="recipe" id="recipe" value={recipeId} onChange={e => setRecipeId(e.target.value)}>

                                                    <option value=""> Seleziona una ricetta</option>

                                                    {recipesAll?.map(recipe => {

                                                        const isPresent = activePoll?.candidates?.find(candidate => candidate.recipeId === recipe.id)

                                                        if (!isPresent) {

                                                            return (

                                                                <option key={recipe.id} value={recipe.id}>
                                                                    {recipe.name}
                                                                </option>

                                                            )

                                                        }

                                                    })}

                                                </select>

                                                <button type="submit" className="btn btn-outline-success recipe-btn">
                                                    +
                                                </button>
                                            </div>

                                        </form>

                                    </div>

                                }

                                {activePoll && activePoll?.suggestions?.length === 0 &&

                                    <div className="col-12 col-md-6">

                                        <h6>Ricette suggerite</h6>

                                        <form onSubmit={e => {

                                            e.preventDefault()
                                            addSuggestion(recipeId, "")

                                        }}>

                                            <div className="input-group">
                                                <select className="form-select" name="recipe" id="recipe" value={recipeId} onChange={e => setRecipeId(e.target.value)}>

                                                    <option value={0}>
                                                        Suggerisci una ricetta
                                                    </option>

                                                    {recipesAll?.map(recipe => {

                                                        const isPresent = activePoll?.suggestions?.find(suggestion => suggestion.recipeId === recipe.id)

                                                        if (!isPresent) {

                                                            return (

                                                                <option key={recipe.id} value={recipe.id}>
                                                                    {recipe.name}
                                                                </option>

                                                            )

                                                        }

                                                    })}

                                                </select>

                                                {recipeId === 0 ?

                                                    <>

                                                        <button type="button" className="btn btn-outline-success recipe-btn" data-bs-toggle="modal" data-bs-target="#suggestionModal">
                                                            +
                                                        </button>

                                                    </>

                                                    :

                                                    <button type="submit" className="btn btn-outline-success recipe-btn">
                                                        +
                                                    </button>}
                                            </div>

                                        </form>

                                    </div>

                                }

                                {activePoll?.candidates?.length > 0 &&

                                    <div className="col-12 col-md-6 poll-overflow">

                                        <table>

                                            <thead>

                                                <tr>
                                                    <th scope="col" className="w-50 pe-4">
                                                        Ricette candidate
                                                    </th>
                                                    <th scope="col" className="w-25">
                                                        Voti
                                                    </th>
                                                    <th scope="col">

                                                    </th>
                                                </tr>

                                            </thead>



                                            <tbody>

                                                {activePoll?.candidates?.map(cand => {

                                                    return (

                                                        <tr key={cand.recipeId}>
                                                            <td className="w-25">{cand.recipeName}</td>

                                                            <td>
                                                                {cand.voteCount}
                                                            </td>

                                                            {loggedUser?.permission &&
                                                                <td>
                                                                    {!activePoll?.votes?.some(vote => vote.username === loggedUser?.username) &&
                                                                        <button className="btn btn-outline-success recipe-btn"
                                                                            onClick={() => vote(cand.candidateId, loggedUser.username
                                                                            )}>
                                                                            <i className="bi bi-check-lg"></i>
                                                                        </button>}

                                                                    {loggedUser.permission === "ADMIN" &&
                                                                        <button className="btn btn-outline-danger recipe-btn"
                                                                            onClick={() => deleteRecipe(cand.recipeId)}>
                                                                            <i className="bi bi-trash2-fill"></i>
                                                                        </button>}
                                                                </td>}
                                                        </tr>

                                                    )

                                                })}

                                            </tbody>

                                        </table>

                                        {loggedUser?.permission &&
                                            <form className="pt-1" onSubmit={e => {

                                                e.preventDefault()
                                                addRecipe(recipeId)

                                            }}>

                                                <div className="input-group">
                                                    <select className="form-select" name="recipe" id="recipe" value={recipeId} onChange={e => setRecipeId(e.target.value)}>

                                                        <option value=""> Seleziona una ricetta</option>

                                                        {recipesAll?.map(recipe => {

                                                            const isPresent = activePoll?.candidates?.find(candidate => candidate.recipeId === recipe.id)

                                                            if (!isPresent) {

                                                                return (

                                                                    <option key={recipe.id} value={recipe.id}>
                                                                        {recipe.name}
                                                                    </option>

                                                                )

                                                            }

                                                        })}

                                                    </select>

                                                    {recipeId === 0 ?

                                                        <>

                                                            <button type="button" className="btn btn-outline-success recipe-btn" data-bs-toggle="modal" data-bs-target="#suggestionModal">
                                                                +
                                                            </button>

                                                        </>

                                                        :

                                                        <button type="submit" className="btn btn-outline-success recipe-btn">
                                                            +
                                                        </button>}
                                                </div>

                                            </form>}

                                    </div>

                                }

                                {activePoll?.suggestions?.length > 0 &&

                                    <div className="col-12 col-md-6 poll-overflow">

                                        <table>

                                            <thead>

                                                <tr>
                                                    <th scope="col" className="w-50">
                                                        Ricette suggerite
                                                    </th>
                                                </tr>

                                            </thead>



                                            <tbody>

                                                {activePoll?.suggestions?.map(suggestion => {

                                                    return (

                                                        <tr key={suggestion.id}>
                                                            <td className="w-25 p-1">{suggestion.name}</td>
                                                        </tr>

                                                    )

                                                })}

                                            </tbody>

                                        </table>

                                        {loggedUser?.permission &&
                                            <form onSubmit={e => {

                                                e.preventDefault()
                                                addSuggestion(recipeId, "")

                                            }}>

                                                <div className="input-group">
                                                    <select className="form-select" name="recipe" id="recipe" value={recipeId} onChange={e => setRecipeId(e.target.value)}>

                                                        <option value=""> Seleziona una ricetta</option>

                                                        {recipesAll?.map(recipe => {

                                                            const isPresent = activePoll?.suggestions?.find(suggestion => suggestion.id === recipe.id)

                                                            if (!isPresent) {

                                                                return (

                                                                    <option key={recipe.id} value={recipe.id}>
                                                                        {recipe.name}
                                                                    </option>

                                                                )

                                                            }

                                                        })}

                                                    </select>

                                                    {recipeId === 0 ?

                                                        <>

                                                            <button onClick={() => {

                                                                setErrMsg("")

                                                            }}
                                                                type="button" className="btn btn-outline-success recipe-btn"
                                                                data-bs-toggle="modal" data-bs-target="#suggestionModal">
                                                                +
                                                            </button>

                                                        </>

                                                        :

                                                        <button type="submit" className="btn btn-outline-success recipe-btn">
                                                            +
                                                        </button>}
                                                </div>

                                            </form>}

                                    </div>

                                }

                            </div>

                        </div>

                    </div>

                }

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4 mt-3">

                    {results.length === 0 ?

                        recipes?.content?.map(recipe => {

                            return (

                                <Link to={`/recipes/${recipe.id}`} key={"recipes" + recipe.id}>

                                    <div className="col">

                                        <div className="card">

                                            <div className="card-header img-contain p-0">

                                                <img src={`${import.meta.env.VITE_LARAVEL_IMG_URL}${recipe.imageUrl}`}
                                                    alt={recipe.name} className="img-transform" />

                                                {recipe.tags.map((tag, index) => {

                                                    if (index < 4) {

                                                        return (
                                                            <span key={tag} className="badge rounded-pill bg-warning tag">
                                                                {tag}
                                                            </span>
                                                        )

                                                    }

                                                })}

                                            </div>

                                            <div className="card-body p-2" style={{ backgroundColor: colors[recipe?.rating?.difficulty - 1] }}>

                                                <h4 className="p-0 overflow">
                                                    {recipe.name}
                                                </h4>

                                            </div>

                                        </div>

                                    </div>

                                </Link>

                            )

                        })

                        :

                        results.map(recipe => {

                            return (

                                <Link to={`/recipes/${recipe.id}`} key={"recipe" + recipe.id}>

                                    <div className="col">

                                        <div className="card">

                                            <div className="card-header img-contain p-0">

                                                <img src={`${import.meta.env.VITE_LARAVEL_IMG_URL}${recipe.imageUrl}`}
                                                    alt={recipe.name} />

                                            </div>

                                            <div className="card-body p-2">

                                                <h4 className="p-0">
                                                    {recipe.name}
                                                </h4>

                                            </div>

                                        </div>

                                    </div>

                                </Link>

                            )

                        })}

                </div>

                <div>

                    <div className="input-group d-flex justify-content-center">

                        {recipes?.number < recipes?.totalPages &&

                            <button className="btn btn-outline-secondary m-3"
                                onClick={() => prevPage(recipes?.number + 1)}>
                                +
                            </button>

                        }

                    </div>

                </div>

            </div>

        </>

    )

}
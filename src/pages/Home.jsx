import axios from "axios"
import { useEffect, useState } from "react"
import { useRecipes } from "../contexts/RecipesContext"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Home() {

    const navigate = useNavigate()

    const { loggedUser } = useAuth()

    const { recipes, recipesAll,
        activePoll, recipeId, setRecipeId, vote, addRecipe, deleteRecipe, getActivePoll,
        addSuggestion, getRecipesAll, getRecipes, setErrMsg } = useRecipes()


    useEffect(() => {

        getActivePoll()

        getRecipes()
        getRecipesAll()

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

                                    <div className="col-6">

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

                                    <div className="col-6">

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
                                    <div className="col-6 poll-overflow">

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
                                                                    {!cand.username === loggedUser.username &&
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

                                    </div>}

                                {activePoll?.suggestions?.length > 0 &&
                                    <div className="col-6 poll-overflow">

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

                                    </div>}

                            </div>

                        </div>

                    </div>

                }

            </div>

        </>

    )

}
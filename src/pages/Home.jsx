import axios from "axios"
import { useEffect, useState } from "react"
import { useRecipes } from "../contexts/RecipesContext"
import logo from "../assets/img/logo.png"
import { Link } from "react-router-dom"

export default function Home() {

    const { recipes, setRecipes } = useRecipes()

    const [recipesAll, setRecipesAll] = useState()

    const [lastWin, setLastwin] = useState({})

    const [activePoll, setActivePoll] = useState({})

    const [recipeId, setRecipeId] = useState(0)


    function vote(candidateId, username) {

        console.log(candidateId);
        console.log(username);


        const vote = {

            candidateId,
            username

        }

        axios.post(`${import.meta.env.VITE_API_URL}/polls/1/vote`, vote)
            .then(res => console.log(res.data))

    }

    function addRecipe(recipeId) {

        console.log(recipeId);


        const recipe = {

            recipeId

        }

        axios.post(`${import.meta.env.VITE_API_URL}/polls/1/addrecipe`, recipe)
            .then(res => console.log(res.data))


        axios.get(`${import.meta.env.VITE_API_URL}/polls/active`)
            .then(res => {

                console.log(res.data)
                setActivePoll(res.data)

            })
            .catch(err => console.log(err))

    }


    useEffect(() => {

        axios.get(`${import.meta.env.VITE_API_URL}/polls/active`)
            .then(res => {

                console.log(res.data)
                setActivePoll(res.data)

            })
            .catch(err => console.log(err))

        axios.get(`${import.meta.env.VITE_API_URL}/recipes/all`)
            .then(res => {
                console.log(res.data)
                setRecipesAll(res.data)
            })

    }, [])

    return (

        <>

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

                {lastWin ?

                    <div className="card text-center mt-5 m-3">

                        <div className="card-header">
                            Ultima vincitrice
                        </div>

                        <div className="card-body">
                            {/* <img src="" alt="" /> */}
                        </div>

                    </div>
                    :
                    <div></div>

                }

            </div>

            <div className="content">

                {activePoll &&

                    <div className="card">

                        <div className="card-header">
                            <h1>
                                {activePoll.weekStart}
                                -
                                {activePoll.weekEnd}
                            </h1>
                        </div>

                        <div className="card-body">

                            {activePoll?.candidates?.length == 0 &&

                                <form action="" on onSubmit={e => {

                                    e.preventDefault()
                                    addRecipe(recipeId)

                                }}>

                                    <select name="recipe" id="recipe" value={recipeId} onChange={e => setRecipeId(e.target.value)}>

                                        <option value=""> Seleziona una ricetta</option>

                                        {recipesAll?.map(recipe => {

                                            return (

                                                <option key={recipe.id} value={recipe.id}>
                                                    {recipe.name}
                                                </option>

                                            )

                                        })}

                                    </select>

                                    <button className="btn btn-success">
                                        +
                                    </button>

                                </form>

                            }

                            {activePoll?.candidates?.length > 0 &&

                                <div className="row">

                                    <div className="col-6">

                                        <table>

                                            <thead>

                                                <tr>
                                                    <th scope="col">
                                                        Candidate
                                                    </th>
                                                </tr>

                                            </thead>



                                            <tbody>

                                                {activePoll?.candidates?.map(cand => {

                                                    return (

                                                        <tr key={cand.recipeId}>
                                                            <td>{cand.recipeName}</td>

                                                            <td>
                                                                <button className="btn btn-success"
                                                                    onClick={() => vote(cand.candidateId, "admin")}>
                                                                    <i class="bi bi-check-lg"></i>
                                                                </button>
                                                            </td>
                                                        </tr>

                                                    )

                                                })}

                                            </tbody>

                                        </table>

                                    </div>

                                    <div className="col-6">

                                        <form action="" on onSubmit={e => {

                                            e.preventDefault()
                                            addRecipe(recipeId)

                                        }}>

                                            <select name="recipe" id="recipe" value={recipeId} onChange={e => setRecipeId(e.target.value)}>

                                                <option value=""> Seleziona una ricetta</option>

                                                {recipesAll?.map(recipe => {

                                                    return (

                                                        <option key={recipe.id} value={recipe.id}>
                                                            {recipe.name}
                                                        </option>

                                                    )

                                                })}

                                            </select>

                                            <button className="btn btn-success">
                                                +
                                            </button>

                                        </form>

                                    </div>

                                </div>

                            }

                        </div>

                    </div>

                }

            </div>

            <div className="right-sidebar">

                <span>

                    <i class="bi bi-search"></i>

                </span>

            </div>

        </>

    )

}
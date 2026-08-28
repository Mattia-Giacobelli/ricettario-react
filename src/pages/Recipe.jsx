import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Recipe() {

    const { id } = useParams()

    const [recipe, setRecipe] = useState({})

    function getRecipe() {

        axios.get(`${import.meta.env.VITE_API_URL}/recipes/${id}`)
            .then(res => {
                console.log(res.data)
                setRecipe(res.data)
            })

    }

    function getAvg() {

        const total = recipe?.rating?.cost + recipe?.rating?.difficulty + recipe?.rating?.prepTime + recipe?.rating?.tasteIntensity

        const avg = total / 4

        return avg.toFixed(1)

    }

    useEffect(() => {

        getRecipe()

    }, [])

    return (

        <>

            <div className="container mt-3">

                <div className="card">

                    <div className="card-header d-flex justify-content-around align-items-center">

                        <img src={`${import.meta.env.VITE_LARAVEL_IMG_URL}${recipe?.imageUrl}`}
                            alt={recipe?.name} />

                        <div className="d-flex flex-column">

                            <h1>
                                {recipe?.name}
                            </h1>

                            <h5>
                                Costo: {recipe?.rating?.cost},
                                Difficoltà: {recipe?.rating?.difficulty},
                                Tempo: {recipe?.rating?.prepTime},
                                Gusto: {recipe?.rating?.tasteIntensity},
                                Media: {recipe?.rating?.overall === null ?
                                    getAvg() : recipe?.rating?.overall}
                            </h5>

                            <div>

                                <span className="me-2">Tags:</span>

                                {recipe?.tags?.map((tag, index) => {

                                    return (

                                        <span key={tag + index} className="badge text-bg-info me-2">
                                            {tag}
                                        </span>

                                    )

                                })}

                            </div>

                        </div>

                    </div>

                    <div className="card-body">

                        <h3>Descrizione</h3>

                        <p>
                            {recipe?.description}
                        </p>

                        <h3>Ingredienti</h3>

                        <ul className="list-group">

                            {recipe?.ingredients?.map((ing, index) => {

                                return (

                                    <li key={ing.name + index} className="list-group-item">
                                        {ing.name + " " + ing.quantity + ing.unit + " (" + ing.notes + ")"}
                                    </li>

                                )

                            })}

                        </ul>

                        <h3 className="mt-3">Procedimento</h3>

                        <p>
                            {recipe?.instructions}
                        </p>

                    </div>

                </div>

            </div>

        </>

    )

}
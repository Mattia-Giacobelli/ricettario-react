import axios from "axios"
import { useEffect } from "react"
import { useRecipes } from "../contexts/RecipesContext"

export default function Home() {

    const { recipes, setRecipes } = useRecipes()

    return (

        <>
            <h1>Carico</h1>
        </>

    )

}
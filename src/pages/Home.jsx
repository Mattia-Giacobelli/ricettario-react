import axios from "axios"
import { useEffect } from "react"

export default function Home() {

    function getRecipes() {

        axios.get("http://localhost:8080/api/recipes/7")
            .then(res => console.log(res.data))

    }

    useEffect(() => {

        getRecipes()

    }, [])

    return (

        <>
            <h1>Carico</h1>
        </>

    )

}
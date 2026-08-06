import axios from "axios"
import { useEffect } from "react"

export default function Home() {

    function getRecipes() {

        axios.get("https://ricettario-spring.duckdns.org/api/recipes/7")
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
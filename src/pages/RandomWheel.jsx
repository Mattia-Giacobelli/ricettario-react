import axios from "axios"

export default function RandomWheel() {

    const params = {

        preferredTags: ["ciao", "prova"],
        description: "una ricetta bella",
        difficulty: "facile",
        maxPrepTime: 3


    }

    function getRandomRecipes() {

        axios.post(`${import.meta.env.VITE_API_URL}/ai/suggest-recipes`, params)
            .then(res => console.log(res.data))
            .catch(err => console.log(err.message))

    }

    console.log('wheel');


    return (

        <>

            <button onClick={() => getRandomRecipes()}>Richiedi ricette</button>

        </>

    )

}
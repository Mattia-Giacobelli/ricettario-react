import React, { useState, useRef, useEffect } from 'react';
import axios from "axios"

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

export default function RandomWheel() {

    const [randomRecipes, setRandomRecipes] = useState([])

    const [availableTags, setAvailableTags] = useState([])
    const [searchTag, setSearchTag] = useState("")
    const [filteredTags, setFilteredTags] = useState([])

    const [tags, setTags] = useState([])

    const [description, setDescription] = useState("")

    const [difficulty, setDifficulty] = useState(1)

    function getTags() {

        axios.get(`${import.meta.env.VITE_API_URL}/tags`)
            .then(res => {

                setAvailableTags(res.data)
                setFilteredTags(res.data)
            })
            .catch(err => console.error("Errore nel recupero dei tag:", err))

    }

    function toggleTag(tagToToggle) {
        const tagName = typeof tagToToggle === 'object' ? tagToToggle.name : tagToToggle;

        if (tags.includes(tagName)) {
            setTags(tags.filter(t => t !== tagName)); // Rimuovi se già presente
        } else {
            setTags([...tags, tagName]);              // Aggiungi se non presente
        }
    };

    function handleSubmit(e) {

        e.preventDefault()
        getRandomRecipes(tags, description, difficulty)

        setTags([])
        setDescription("")
        setDifficulty(1)

    }

    function getRandomRecipes(preferredTags, description, difficulty) {

        const params = {

            preferredTags,
            description,
            difficulty,
            maxPrepTime: 99999


        }

        axios.post(`${import.meta.env.VITE_API_URL}/ai/suggest-recipes`, params)
            .then(res => {
                console.log(res.data)
                setRandomRecipes(res.data)
            })
            .catch(err => console.log(err.message))

    }

    const [spinning, setSpinning] = useState(false);
    const [winner, setWinner] = useState(null);
    const currentRotation = useRef(0);
    const wheelRef = useRef(null);

    const numItems = randomRecipes.length;
    const sliceAngle = 360 / numItems;

    const spinWheel = () => {
        if (spinning) return;

        setSpinning(true);
        setWinner(null);

        // 1. Estrazione casuale dell'indice (0 a 4)
        const selectedIndex = Math.floor(Math.random() * numItems);
        const selectedItem = randomRecipes[selectedIndex];

        // 2. Calcolo dell'angolo per centrare la spicchia estratta sulla freccia in alto (270deg o -90deg)
        // L'angolo del centro della spicchia i-esima è: (i + 0.5) * sliceAngle
        const sliceCenterAngle = selectedIndex * sliceAngle + sliceAngle / 2;

        // Per portare il centro della spicchia in alto (270°):
        const targetAngle = 270 - sliceCenterAngle;

        // 3. Aggiungiamo tra i 5 e i 10 giri completi (360 * N) per l'effetto visivo
        const extraRounds = (Math.floor(Math.random() * 5) + 5) * 360;

        // 4. Calcoliamo la rotazione finale sommando alla rotazione attuale
        // Usiamo il modulo per assicurarci di avanzare sempre in senso orario
        const currentMod = currentRotation.current % 360;
        let distanceToTarget = targetAngle - currentMod;
        if (distanceToTarget <= 0) {
            distanceToTarget += 360;
        }

        const newRotation = currentRotation.current + distanceToTarget + extraRounds;
        currentRotation.current = newRotation;

        // 5. Applichiamo la trasformazione alla ruota
        if (wheelRef.current) {
            wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
        }

        // 6. Al termine dell'animazione (4 secondi) mostriamo il vincitore
        setTimeout(() => {
            setSpinning(false);
            setWinner(selectedItem);
        }, 4000); // Deve corrispondere alla durata del CSS transition (4s)
    };


    useEffect(() => {

        getTags()

    }, [])

    return (

        <>

            <div className="card shadow-sm p-4 mx-auto bg-dark text-white border-secondary mt-3" style={{ maxWidth: '600px' }}>
                <h3 className="mb-4 text-info great-vibes-regular">Crea Ricetta</h3>

                <form onSubmit={handleSubmit}>

                    {/* 1. SELEZIONE TAG CON RICERCA */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Seleziona Tag</label>

                        {/* Input per filtrare i tag */}
                        <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary mb-2"
                            placeholder="Cerca un tag..."
                            value={searchTag}
                            onChange={(e) => {
                                setSearchTag(e.target.value)
                                setFilteredTags(availableTags.filter(tag => tag.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
                            }}
                        />

                        {/* Box con i tag filtrati dal DB */}
                        <div
                            className="p-2 border border-secondary rounded bg-black bg-opacity-25 d-flex flex-wrap gap-2 overflow-scroll"
                            style={{ maxHeight: '150px', overflowY: 'auto' }}
                        >
                            {filteredTags.length > 0 ? (
                                filteredTags.map((tag) => {
                                    const tagName = typeof tag === 'object' ? tag.name : tag;
                                    const isSelected = tags.includes(tagName);

                                    return (
                                        <button
                                            key={tag.id || tagName}
                                            type="button"
                                            onClick={() => toggleTag(tag)}
                                            className={`btn btn-sm ${isSelected ? 'btn-info text-dark fw-bold' : 'btn-outline-secondary text-white'}`}
                                        >
                                            {isSelected ? '✓ ' : '+ '}{tagName}
                                        </button>
                                    );
                                })
                            ) : (
                                <small className="text-muted p-1">Nessun tag trovato</small>
                            )}
                        </div>

                        {/* Badge dei tag attuali SELEZIONATI */}
                        {tags.length > 0 && (
                            <div className="mt-2">
                                <small className="text-secondary d-block mb-1">Tag selezionati:</small>
                                <div className="d-flex flex-wrap gap-1">
                                    {tags.map((tag, idx) => (
                                        <span key={idx} className="badge bg-info text-dark d-flex align-items-center gap-1">
                                            #{tag}
                                            <button
                                                type="button"
                                                className="btn-close btn-close-white ms-1"
                                                style={{ fontSize: '0.65rem' }}
                                                onClick={() => toggleTag(tag)}
                                            />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. DESCRIZIONE */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fw-bold">Descrizione</label>
                        <textarea
                            id="description"
                            rows="3"
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Inserisci la descrizione della ricetta..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* 3. DIFFICOLTÀ */}
                    <div className="mb-4">
                        <label htmlFor="difficulty" className="form-label fw-bold">
                            Difficoltà: <span className="text-info">{difficulty}</span> / 5
                        </label>
                        <select
                            id="difficulty"
                            className="form-select bg-dark text-white border-secondary"
                            value={difficulty}
                            onChange={(e) => setDifficulty(Number(e.target.value))}
                        >
                            <option value={1}>1 - Molto Facile</option>
                            <option value={2}>2 - Facile</option>
                            <option value={3}>3 - Media</option>
                            <option value={4}>4 - Difficile</option>
                            <option value={5}>5 - Per Chef</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-info w-100 text-dark fw-bold">
                        Salva Ricetta
                    </button>

                </form>
            </div>

            <div className="d-flex flex-column align-items-center my-4">
                {/* Contenitore Ruota con Indicatore */}
                <div className="position-relative" style={{ width: '320px', height: '320px' }}>

                    {/* Freccia indicatore in alto */}
                    <div
                        className="position-absolute top-0 start-50 translate-middle-x"
                        style={{
                            zIndex: 10,
                            top: '-10px',
                            width: 0,
                            height: 0,
                            borderLeft: '15px solid transparent',
                            borderRight: '15px solid transparent',
                            borderTop: '25px solid #dc3545', // Freccia rossa
                            filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.3))'
                        }}
                    />

                    {/* Disco della ruota */}
                    <div
                        ref={wheelRef}
                        className="w-100 h-100 rounded-circle overflow-hidden shadow"
                        style={{
                            transition: 'transform 4s cubic-bezier(0.15, 0.99, 0.18, 0.99)', // Effetto usura/frenata naturale
                            position: 'relative'
                        }}
                    >
                        {randomRecipes.length > 0 &&
                            <svg viewBox="0 0 100 100" className="w-100 h-100">
                                {randomRecipes.map((item, index) => {
                                    // Calcolo SVG per creare i settori circolari
                                    const startAngle = index * sliceAngle;
                                    const endAngle = (index + 1) * sliceAngle;

                                    const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                                    const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                                    const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                                    const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                                    const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                                    // Posizione del testo al centro della spicchia
                                    const textAngle = startAngle + sliceAngle / 2;
                                    const textX = 50 + 32 * Math.cos((Math.PI * textAngle) / 180);
                                    const textY = 50 + 32 * Math.sin((Math.PI * textAngle) / 180);

                                    return (
                                        <g key={index}>
                                            <path d={pathData} fill={colors[index % colors.length]} stroke="#ffffff" strokeWidth="0.5" />
                                            <text
                                                x={textX}
                                                y={textY}
                                                fill="#ffffff"
                                                fontSize="5"
                                                fontWeight="bold"
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                                            >
                                                {item.name}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        }
                    </div>
                </div>

                {/* Bottone di Gira */}
                <button
                    onClick={spinWheel}
                    disabled={spinning}
                    className="btn btn-primary btn-lg mt-4 px-4 shadow"
                >
                    {spinning ? 'Gira...' : 'Gira la Ruota!'}
                </button>

                {/* Messaggio del vincitore */}
                {winner && (
                    <div className="alert alert-success mt-3 fw-bold text-center animate__animated animate__fadeIn">
                        🎉 È uscito: {winner.label}!
                    </div>
                )}
            </div>

        </>
    )

}
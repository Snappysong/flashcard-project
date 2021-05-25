import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function CardNew() {
    const params = useParams();
    const history = useHistory();

    const [front, setFront] = useState("Front side of card")
    const [back, setBack] = useState("Back side of card")
    const [currentDeck, setCurrentDeck] = useState(null)
    
    useEffect(() => {
        async function loadDeck() {
            setCurrentDeck([])
            try {
                const response = await readDeck(params.deckId)
                setCurrentDeck(response)
            } catch (error) {console.log(error)}
        }
        loadDeck();
    }, [params])

    const handleDone = (e) => {
        e.preventDefault();
        history.push(`/decks/${params.deckId}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const card = {
            front: front,
            back: back,
            deckId: params.deckId
        }
        createCard(params.deckId, card)
        .then(response => {
            console.log(response)
            setFront("Front side of card")
            setBack("Back side of card")
        })
    }

    if(currentDeck){
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / <Link to={`/decks/${params.deckId}`}>{currentDeck.name}</Link> / <div>Add Card</div>
                </div>
                <div>
                    <h2>{currentDeck.name}: Add Card</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Front</label>
                    <br />
                    <textarea
                    required
                    value={front}
                    onChange={(e) => setFront(e.target.value)}
                    />
                    <br />
                    <label>Back</label>
                    <br />
                    <textarea
                    required
                    value={back}
                    onChange={(e) => setBack(e.target.value)}
    
                    />
                    <br />
                    <button onClick={handleDone}>Done</button>
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
    return <p>Loading...</p>
}
export default CardNew;
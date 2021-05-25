import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard } from "../utils/api";

function CardEdit() {
    const history = useHistory();
    const params = useParams();
    
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")
    const [currentDeck, setCurrentDeck] = useState(null)
    const [currentCard, setCurrentCard] = useState(null)

    useEffect(() => {
        async function loadInfo(){
            try {
                const response = await readDeck(params.deckId);
                setCurrentDeck(response)
                setCurrentCard(response.cards.find((card) => (card.id + "") === params.cardId))
                setFront((response.cards.find((card) => (card.id + "") === params.cardId)).front)
                setBack((response.cards.find((card) => (card.id + "") === params.cardId)).back)
            } catch (error) {console.log(error)}
        }
        loadInfo()
    }, [params])

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/decks/${params.deckId}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const card = {
            ...currentCard,
            front, 
            back
        }
        updateCard(card)
        .then(response => {
            console.log(response);
            setCurrentCard(response)
            history.push(`/decks/${params.deckId}`)
        })
    }

    if(currentDeck && currentCard){
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / <Link to={`/decks/${params.deckId}`}>{currentDeck.name}</Link> / Edit Card {currentCard.id}
                </div>
                <h2>Edit Card</h2>
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
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
    return <p>Loading...</p>
}
export default CardEdit;
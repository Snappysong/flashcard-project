import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function DeckEdit() {    
    const params = useParams();
    const history = useHistory();

    const [currentDeck, setCurrentDeck] = useState(null)
    const [name, setName] = useState("Loading...")
    const [description, setDescription] = useState("Loading...")

    useEffect(() => {
        async function loadDeck() {
            setCurrentDeck([]);
            try {
                const response = await readDeck(params.deckId);
                setCurrentDeck(response);
                setName(response.name);
                setDescription(response.description);
            } catch (error) {console.log(error)}
        }
        loadDeck()
    }, [params])

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const deck = {
            ...currentDeck,
            name, 
            description
        }
        updateDeck(deck)
        .then(response => {
            console.log(response)
            setCurrentDeck(response)
            history.push(`/decks/${currentDeck.id}`)
        })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        history.push(`/decks/${currentDeck.id}`)
    }

    if(currentDeck){
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Edit Deck
                </div>
                <h2>Edit Deck</h2>
                <form onSubmit={handleEditSubmit}>
                    <label>Name</label>
                    <br />
                        <input 
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        />
                    <br />
                    <label>Description</label>
                    <br />
                        <textarea
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
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
export default DeckEdit;
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function DeckNew() {
    const history = useHistory();
    const [name, setName] = useState("Deck Name");
    const [description, setDescription] = useState("Brief description of the deck");

    const handleSubmit = (e) => {
        e.preventDefault();
        const deck = { name, description }
        createDeck(deck)
        .then(response => {
            console.log(response)
            history.push(`/decks/${response.id}`)
        })
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        history.push("/")
    };

    return (
        <div>
            <div>
                <Link to="/">Home</Link> / <div>Create Deck</div>
            </div>
            <form onSubmit={handleSubmit} >
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
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default DeckNew;
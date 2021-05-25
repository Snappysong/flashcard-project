import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";

function DeckInfo() {
    const params = useParams();
    const history = useHistory();

    const [currentDeck, setCurrentDeck] = useState(null)
    const [currentCards, setCurrentCards] = useState(null);

    useEffect(() => {
        async function loadDeck() {
            setCurrentDeck([]);
            setCurrentCards([]);
            try {
                const response = await readDeck(params.deckId);
                setCurrentDeck(response);
                const { cards } = response;
                setCurrentCards(cards);
            } catch (error) {console.log(error)}
        }
        loadDeck()
    }, [params])
    
    if (currentDeck && currentCards) {
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / {currentDeck.name}
                </div>
                <div>
                    <h2>{currentDeck.name}</h2>
                    <p>{currentDeck.description}</p>
                    <button onClick={() => {history.push(`/decks/${currentDeck.id}/edit`)}}>Edit</button>
                    <button onClick={() => {history.push(`/decks/${currentDeck.id}/study`)}}>Study</button>
                    <button onClick={() => {history.push(`/decks/${currentDeck.id}/cards/new`)}}>Add Cards</button>
                    <button onClick={() => {
                        if(window.confirm("Delete this deck?")){
                            deleteDeck(`${currentDeck.id}`)
                            history.push("/")
                        }}}>
                    Delete
                    </button>
                </div>
                <div>
                    <h3>Cards</h3>
                    <ul>
                        {currentCards.map((card) => (
                            <li key={card.id}>
                                {card.front}
                                <div>{card.back}</div>
                                <button onClick={() => {history.push(`/decks/${currentDeck.id}/cards/${card.id}/edit`)}}>Edit</button>
                                <button onClick={() => {
                                    if(window.confirm("Delete this card?")){
                                        deleteCard(`${card.id}`);
                                        history.push(`/decks/${params.deckId}`)
                                    }}}>
                                Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };
    return (
        <p>Loading...</p>
    );
};

export default DeckInfo;
import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCardFlip from "./StudyCardFlip";

function Study() {
    const params = useParams();
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

    
    if(currentDeck){
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / <Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link> / Study
                </div>
                <div>
                    <h1>{currentDeck.name}: Study</h1>
                </div>
                    <StudyCardFlip currentCards={currentCards} />
            </div>
        )
    
    }
    return (
        <p>Loading...</p>
    );
}
export default Study;
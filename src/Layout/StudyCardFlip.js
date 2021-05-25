import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function StudyCardFlip({ currentCards }) {
    const history = useHistory();
    const params = useParams();

    const [cardCount, setCardCount] = useState(1);
    const [sideOfCard, setSideOfCard] = useState(null);
    const [studyCardCount, setStudyCardCount] = useState(0);
    const [studyCard, setStudyCard] = useState(null);
    const orderedCards = currentCards.sort((a, b) => a.id - b.id);

    useEffect(() => {
        if(currentCards.length > 2){
            setSideOfCard(true);
        }
        setStudyCard(orderedCards[studyCardCount])
    }, [currentCards])
    
    const handleFlip = (e) => {
        e.preventDefault()
        setSideOfCard(!sideOfCard)
    }


    const handleNext = (e) => {
        e.preventDefault()
        setSideOfCard(!sideOfCard)
        setCardCount((current) => current + 1)
        setStudyCardCount((current) => current + 1)
        setStudyCard(orderedCards[studyCardCount + 1])
        if(currentCards.length <= cardCount){
            if(window.confirm("Restart Cards?")){
                setCardCount(1);
                setStudyCardCount(0);
                setStudyCard(orderedCards[studyCardCount]);
                history.push(`/decks/${params.deckId}/study`)
            } else {history.push("/")}
        }
    }

    const handleAddCards = (e) => {
        e.preventDefault()
        history.push(`/decks/${params.deckId}/cards/new`)
    }

    if (currentCards) {
        if ((sideOfCard === true) && studyCard){ 
            return (
                <div>
                    <h5>Card {cardCount} of {currentCards.length}</h5>
                    {studyCard.front}
                    <br />
                    <button onClick={handleFlip}>Flip</button>
                </div>
            )
        }
        if ((sideOfCard === false) && studyCard){
            return (
                <div>
                    <h5>Card {cardCount} of {currentCards.length}</h5>
                    {studyCard.back}
                    <br />
                    <button onClick={handleFlip}>Flip</button>
                    <button onClick={handleNext}>Next</button> 
                </div>
            )
        }
        else {
            return (
                <div>
                    <h5>Not enough cards.</h5>
                    <p>You need at least 3 cards to study. There are {currentCards.length} in this deck.</p>
                    <button onClick={handleAddCards}>+ Add Cards</button>
                </div>
            )
        }
    }
    return (
        <p>Loading...</p>
    )
}
export default StudyCardFlip;
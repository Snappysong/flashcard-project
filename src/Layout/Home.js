import React from "react";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

function Home() {
    const history = useHistory();
    const [decks, setDecks] = useState(null);
    
    useEffect(() => {
        async function loadDecks() {
            setDecks([]);
            try {
              const response = await listDecks()
              setDecks(response);
            } catch (error) {console.log(error)}
          }
      loadDecks();
    }, [])
  
    const handleCreateDeck = () => {
        history.push("/decks/new")
    }

    if(decks){
        return (
            <div>
                <button onClick={handleCreateDeck}>+ Create Deck</button>
                <ul>
                    {decks.map((deck) => (
                        <li key={deck.id}>
                            <h2>{deck.name}</h2>
                            <p>{deck.cards.length} cards</p>
                            <p>{deck.description}</p>
                            <Link to={`/decks/${deck.id}`}> View! </Link>
                            <Link to={`/decks/${deck.id}/edit`}> Edit! </Link>
                            <Link to={`/decks/${deck.id}/study`}> Study! </Link>
                            <button 
                            onClick={() => {
                                if(window.confirm("Delete this deck?")){
                                    deleteDeck(`${deck.id}`);
                                    history.go("/")
                                }}}> 
                            Delete 
                            </button>
                        </li> 
                    ))}
                </ul>
            </div>
        )
    }
    return (
        <p>Loading...</p>
    );
}

export default Home;
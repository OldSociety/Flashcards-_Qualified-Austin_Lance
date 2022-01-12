import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listDecks } from '../utils/api'

import DeckList from './Decks/DeckList'

const Home = () => {
  // sets up the decks array
  const [decks, setDecks] = useState([])


  useEffect(() => {
    // Creates a promise for the list of decks using API function
    const getDeck = async () => {
      try {
        const getDeckFromAPI = await listDecks()
        //sets the deck array to match those listed in the API
        setDecks(getDeckFromAPI)
        //error handling
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error)
        }
      }
    }
    getDeck()
  }, [])

  return (
    <div>
      <div className="row mx-auto">
        {/* Button to create Deck page */}
        <Link to="/decks/new" className="btn btn-secondary w-25 mb-3">
          + Create Deck
        </Link>
      </div>

  
      <div className="row w-100 mx-auto">
        {/* Maps each deck from array onto Home Page by id */}
        {decks.map((deck) => (
          <DeckList key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  )
}

export default Home
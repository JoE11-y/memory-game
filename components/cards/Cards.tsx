'use client'
import { getImages } from '@/utils'
import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import CardPage from './CardPage';

export interface ImageDetails {
  id: string,
  width: number,
  height: number,
  url: string,
  src: {
    original: string;
  },
  matched: boolean
}

const Cards = () => {
  const [cards, setCards] = useState<ImageDetails[]>([])
  const [card1, setCard1] = useState<ImageDetails | null>(null)
  const [card2, setCard2] = useState<ImageDetails | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)

  const shuffleCards = async () => {
    setCards([])
    const queryResult = await getImages();
    if (!queryResult.photos) {
      throw new Error("unable to query")
    }
    const images = queryResult.photos as ImageDetails[];
    const shuffledCards = [...images, ...images].sort(() => Math.random() - 0.5);
    const final = shuffledCards.map((data, index) => (
      { ...data, matched: false, id: `${data.id}${index}` }
    ))
    setCards(final)
  }

  const handleCardPick = (card: ImageDetails) => {
    card1 ? setCard2(card) : setCard1(card)
  }

  const reset = () => {
    setCard1(null);
    setCard2(null);
    setDisabled(false);
  }

  useEffect(() => {
    if (card1 && card2) {
      setDisabled(true)
      if (card1.id == card2.id) {
        setCard2(null)
        return
      }
      if (card1.src.original == card2.src.original) {
        setCards(prev => {
          return prev.map(card => {
            if (card.src.original == card1.src.original) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        console.log('match')
        reset()
      } else {
        console.log('no match')
        setTimeout(reset, 1000)
      }
    }
  }, [card1, card2])

  return (
    <div>
      <Button onClick={() => shuffleCards()}>
        Start Game
      </ Button>

      <div className='grid grid-cols-4 mt-2'>
        {cards.map((card) => (
          <CardPage
            key={card.id}
            image={card}
            handleCardPick={handleCardPick}
            flipped={card === card1 || card === card2 || card.matched}
            disabled={disabled}
          />
        ))}

      </div>
    </div>
  )
}

export default Cards

import { getImages } from '@/utils'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { CardDetails } from './Card'
import Card from './Card'

const Playground = ({ gameId }: { gameId: string }) => {
  const [cards, setCards] = useState<CardDetails[]>([])
  const [card1, setCard1] = useState<CardDetails | null>(null)
  const [card2, setCard2] = useState<CardDetails | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)

  const shuffleCards = async () => {
    setCards([])
    const queryResult = await getImages();
    if (!queryResult.photos) {
      throw new Error("unable to query")
    }
    const images = queryResult.photos as CardDetails[];
    const shuffledCards = [...images, ...images].sort(() => Math.random() - 0.5);
    const final = shuffledCards.map((data, index) => (
      { ...data, matched: false, id: `${data.id}${index}` }
    ))
    setCards(final)
  }

  const handleCardPick = (card: CardDetails) => {
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
    <div className='w-full'>
      <div className='flex items-center justify-center mt-4'>
        <Button onClick={() => shuffleCards()}>
          Start Game
        </ Button>
      </div>

      <div className='grid grid-cols-4 gap-2 min-h-[347px]'>
        {cards.map((card) => (
          <Card
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

export default Playground

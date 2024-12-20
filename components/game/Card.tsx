import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion';
import { CardFlippedResult, CardsEvalResult, CardState, GameStateResult } from '@/interfaces';
import { useSocket } from '@/hooks/useSocket';

export interface CardDetails {
  id: string,
  width: number,
  height: number,
  url: string,
  src: {
    original: string;
  },
  matched: boolean
}


const Card = ({ image, disabled, card, gameId }: {
  image: string,
  disabled: boolean,
  card: CardState,
  gameId: string
}) => {
  const { socket } = useSocket()
  const [cardState, setCardState] = useState<CardState>(card)

  const handleClick = () => {
    if (!disabled) {
      socket.emit('flip-card', {
        cardId: card.id,
        gameId: gameId
      })
    }
  }

  socket.on('card-flipped', (data: CardFlippedResult) => {
    if (card.id == data.cardId) {
      const cardDetails = data.state.cards.find((scard) => scard.id === card.id)
      if (cardDetails) {
        setCardState(cardDetails)
        socket.emit('evaluate-flip', {
          gameId: gameId
        })
      }
    }
  })

  socket.on('card-flip-result', (data: CardsEvalResult) => {
    setTimeout(() => {
      if (data.cards.includes(card.id) && data.cards.length > 1) {
        const cardDetails = data.state.cards.find((scard) => scard.id === card.id)
        if (cardDetails) {
          setCardState(cardDetails)
        }
      }
    }, 1000)
  })

  return (
    <div className='flex items-center justify-center h-[8rem]'>
      <div className='flex items-center justify-center w-full h-full flip-card' onClick={handleClick}>
        <motion.div className='flip-card-inner w-full h-full'
          initial={false}
          animate={{ rotateY: !cardState.isOpen ? 180 : 360 }}
          transition={{ duration: 0.2, animationDirection: "normal" }}
          onAnimationComplete={() => console.log('done')}
        >
          <Image
            alt=""
            src={image}
            width={100}
            height={100}
            className="flip-card-front w-[6rem] h-[6rem] rounded-md"
          />
          <Image
            alt=""
            src="/imgs/back.png"
            width={100}
            height={100}
            className="flip-card-back w-[6rem] h-[6rem] rounded-md"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Card

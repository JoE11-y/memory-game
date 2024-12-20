import { getImages } from '@/utils'
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { CardDetails } from './Card'
import Card from './Card'
import { useGetProfileQuery } from '@/redux-services/auth.service';
import { useAccessToken } from '@/hooks/useAccessToken';
import { useSocket } from '@/hooks/useSocket'
import { CardState, GameState, GameStateResult } from '@/interfaces'

const Playground = ({ gameId }: { gameId: string }) => {
  const { accessToken } = useAccessToken()
  const { data, isLoading, refetch } = useGetProfileQuery({ accessToken })
  const [card1, setCard1] = useState<CardState | null>(null)
  const [card2, setCard2] = useState<CardState | null>(null)
  const [disabled, setDisabled] = useState<boolean>(true)
  const { socket } = useSocket();
  const [gameState, setGameState] = useState<GameState | null>(null)

  const handleCardPick = (card: CardDetails) => {
    // card1 ? setCard2(card) : setCard1(card)
    console.log('click')
  }

  // const reset = () => {
  //   setCard1(null);
  //   setCard2(null);
  //   setDisabled(false);
  // }

  // useEffect(() => {
  //   if (card1 && card2) {
  //     setDisabled(true)
  //     if (card1.id == card2.id) {
  //       setCard2(null)
  //       return
  //     }
  //     if (card1.src.original == card2.src.original) {
  //       setCards(prev => {
  //         return prev.map(card => {
  //           if (card.src.original == card1.src.original) {
  //             return { ...card, matched: true }
  //           } else {
  //             return card
  //           }
  //         })
  //       })
  //       console.log('match')
  //       reset()
  //     } else {
  //       console.log('no match')
  //       setTimeout(reset, 1000)
  //     }
  //   }
  // }, [card1, card2])

  socket.on('game-state', (data: GameStateResult) => {
    console.log(data)
    setGameState(data.state);
  })

  useEffect(() => {
    if (!gameState) {
      socket.emit('get-state', {
        gameId: gameId
      })
    }
  }, [])

  useEffect(() => {
    if (gameState && gameState.status === 'game-started') {
      setDisabled(false)
    }
  }, [gameState])

  return (
    <div className='w-full'>
      <div className='grid grid-cols-4 gap-2 min-h-[350px]'>
        {gameState && gameState?.cards.map((card) => (
          <Card
            key={card.id}
            image={card.url}
            handleCardPick={handleCardPick}
            flipped={card.isOpen}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default Playground

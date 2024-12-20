import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useSocket } from '@/hooks/useSocket'
import { CardState, GameState, GameStateResult } from '@/interfaces'

const Playground = ({ gameId }: { gameId: string }) => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const { socket } = useSocket();
  const [gameState, setGameState] = useState<GameState | null>(null)

  socket.on('game-state', (data: GameStateResult) => {
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
            disabled={disabled}
            card={card}
            gameId={gameId}
          />
        ))}
      </div>
    </div>
  )
}

export default Playground

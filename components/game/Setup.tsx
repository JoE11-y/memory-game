'use client'
import { Button, Input, Radio } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSocket } from '@/hooks/useSocket';
import { StartGameResult } from '@/interfaces';
import { toast } from 'react-toastify';

const Setup = () => {
  const router = useRouter();
  const { socket } = useSocket()
  const [gameMode, setGameMode] = useState<'solo' | 'multi'>('solo')
  const [isJoinGame, setIsJoinGame] = useState<boolean>(false);
  const [gameId, setGameId] = useState<string>("");

  const options = [
    { label: 'Solo', value: 'solo' },
    { label: 'Multiplayer', value: 'multi' }
  ];

  const handleSelect = (data: any) => {
    const value = data.target.value;
    setGameMode(value)
  }

  const handleStartGame = (noOfPlayers: number) => {
    console.log('start-game')
    socket.emit("start-game", {
      noOfPlayers: noOfPlayers
    })

    socket.on('game-created', (data: StartGameResult) => {
      console.log('game-started')
      toast.success('Game started successfully')
      setTimeout(() => {
        router.replace(`/game/${data.gameId}`)
      }, 2000)
    })
  }

  const handleJoinGame = () => {
    if (!gameId) return

    socket.emit("join-game", {
      gameId: gameId
    })

    router.replace(`/game/${gameId}`)
  }

  return (
    <div className='w-full min-h-[380px]'>
      <div className='flex items-end justify-end'>
        <Button>
          History
        </ Button>
      </div>

      Game Setup

      <div className='mt-8'>
        <p className='text-sm mb-2'>Choose mode</p>
        <Radio.Group
          block
          options={options}
          defaultValue="solo"
          optionType="button"
          buttonStyle="solid"
          className='mt-4'
          onChange={handleSelect}
        />
      </div>

      {gameMode == 'multi' &&
        <div className='mt-8 flex flex-col items-center justify-center gap-3'>
          {!isJoinGame && <Button color='primary' onClick={() => handleStartGame(2)}>
            New Game
          </Button>
          }

          {isJoinGame &&
            <div className='flex flex-col items-center justify-center'>
              <p className='text-sm mb-2'>Enter Game ID</p>
              <Input type='text' onChange={(e) => setGameId(e.target.value)} />
            </div>
          }

          <div>
            <Button color='danger' onClick={() => !isJoinGame ? setIsJoinGame(true) : handleJoinGame()}>
              Join Game
            </Button>

            {isJoinGame && <Button color='danger' onClick={() => setIsJoinGame(false)}>
              Go Back
            </Button>}
          </div>
        </div>
      }

      {gameMode == 'solo' &&
        <div className='mt-8 flex items-center justify-center'>
          <Button onClick={() => handleStartGame(1)}>
            Start Game
          </Button>
        </div>
      }
    </div>
  )
}

export default Setup

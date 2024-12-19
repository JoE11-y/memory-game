import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion';

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


const Card = ({ image, handleCardPick, flipped, disabled }: {
  image: CardDetails,
  handleCardPick: Function,
  flipped: boolean,
  disabled: boolean
}) => {
  const handleClick = () => {
    if (!disabled) {
      handleCardPick(image)
    }
  }

  return (
    <div className='flex items-center justify-center h-[8rem]'>
      <div className='flex items-center justify-center w-full h-full flip-card' onClick={handleClick}>
        <motion.div className='flip-card-inner w-full h-full'
          initial={false}
          animate={{ rotateY: !flipped ? 180 : 360 }}
          transition={{ duration: 0.2, animationDirection: "normal" }}
          onAnimationComplete={() => console.log('done')}
        >
          <Image
            alt=""
            src={image.src.original}
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

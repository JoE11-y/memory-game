import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { ImageDetails } from './Cards';
import { motion } from 'framer-motion';

const CardPage = ({ image, handleCardPick, flipped, disabled }: {
  image: ImageDetails,
  handleCardPick: Function,
  flipped: boolean,
  disabled: boolean
}) => {
  const { theme } = useTheme()
  const handleClick = () => {
    if (!disabled) {
      handleCardPick(image)
    }
  }

  return (
    <div className='flex items-center justify-center h-[12rem]'>
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
            className="flip-card-front w-[10rem] h-[10rem] rounded-md"
          />
          <Image
            alt=""
            src="/imgs/back.jpeg"
            width={100}
            height={100}
            className="flip-card-back w-[10rem] h-[10rem] rounded-md"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default CardPage

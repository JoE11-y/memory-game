import { useThemeMode } from 'antd-style';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const { isDarkMode } = useThemeMode()
  return (
    <div className='flex items-center justify-center'>
      <Link href="/">
        <h1 className="text-3xl font-bold flex space-x-1">
          <span>Memory Game</span>
          <div>
            <Image
              src={isDarkMode ? '/imgs/logo-dark.png' : '/imgs/logo.png'}
              alt="playing cards"
              className="ml-2 h-8"
              width={74}
              height={74}
            />
          </div>
        </h1>
      </Link>
    </div>
  );
}
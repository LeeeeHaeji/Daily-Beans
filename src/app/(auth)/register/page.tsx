'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Buyer from './components/buyer';
import Seller from './components/seller';
import '@/styles/auth/register/register.scss';
import '@/styles/auth/common.scss';
import '@/styles/button.scss';

export default function Register() {
  const [currentView, setCurrentView] = useState('buyer');

  return (
    <section className="container">
      <h1 className="a11y-hidden">Daily Beans</h1>
      <Link href="/" className="logo">
        <Image src="svg/Daily-Beans.svg" alt="logo" width={428} height={74} priority />
      </Link>
      <section className="join">
        <div className="typeTap">
          <button
            type="button"
            className={currentView === 'buyer' ? 'buyer' : 'none'}
            onClick={() => setCurrentView('buyer')}
          >
            구매회원가입
          </button>
          <button
            type="button"
            className={currentView === 'seller' ? 'seller' : 'none'}
            onClick={() => setCurrentView('seller')}
          >
            판매회원가입
          </button>
        </div>
        {currentView === 'buyer' && <Buyer />}
        {currentView === 'seller' && <Seller />}
      </section>
    </section>
  );
}

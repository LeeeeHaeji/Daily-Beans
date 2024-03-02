'use client';

import React, { useState } from 'react';
import Buyer from './components/Buyer';
import Seller from './components/seller';

export default function Register() {
  const [currentView, setCurrentView] = useState('buyer');

  return (
    <>
      <button type="button" onClick={() => setCurrentView('buyer')}>
        구매회원가입
      </button>
      <button type="button" onClick={() => setCurrentView('seller')}>
        판매회원가입
      </button>
      {currentView === 'buyer' && <Buyer />}
      {currentView === 'seller' && <Seller />}
    </>
  );
}

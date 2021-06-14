import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
import { io } from 'socket.io-client';

import './Finance.scss';


const socket = io.connect('http://localhost:4000');


export const Finance = () => {

  const [shares, setShares] = useState([]);

  useEffect(() => {
    socket.emit('start');

    socket.on('ticker', (data) => {
      setShares(data)
    })
  }, [])

  const normalizeCompanyName = (name) => {
    switch(name) {
      case 'AAPL':
        return 'Apple';
      case 'GOOGL':
        return 'Google';
      case 'MSFT':
        return 'Microsoft';
      case 'AMZN':
        return 'Amazon';
      case 'FB':
        return 'Facebook';
      case 'TSLA':
        return 'Tesla';
      default:
        return name;
    }
  }

  return (
    <div className="shares">
      <ul className="shares__list">
        {shares.map(share => (
          <li key={share.ticker} className="shares__item">
            <p>{normalizeCompanyName(share.ticker)}</p>
            <p>{share.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


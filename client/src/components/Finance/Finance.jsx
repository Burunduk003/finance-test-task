import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';

import { setTickers, getTickers } from '../../store';

import './Finance.scss';


const socket = io.connect('http://localhost:4000');


export const Finance = () => {

  const dispatch = useDispatch();

  const { tickers } = useSelector(getTickers);

  console.log(tickers)

  const [shares, setShares] = useState([]);

  useEffect(() => {
    socket.emit('start');

    socket.on('ticker', (data) => {
      setShares(data);
      dispatch(setTickers(data));
    })
  }, [])

  const getCompanyName = (ticker) => {
    switch(ticker) {
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
        return ticker;
    }
  }

  return (
    <div className="shares">
      <ul className="shares__list">
        {shares.map(share => (
          <li key={share.ticker} className="shares__item">
            <p>{getCompanyName(share.ticker)}</p>
            <p>{share.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


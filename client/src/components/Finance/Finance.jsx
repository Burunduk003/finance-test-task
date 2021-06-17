import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';

import { getState } from '../../store';
import { setTickers } from '../../store/tickers';

import './Finance.scss';


const socket = io.connect('http://localhost:4000');


export const Finance = () => {
  
  const dispatch = useDispatch();

  const { tickers } = useSelector(getState);

  // const updatedData = data.map(item => {
  //   let ticker = tickers.find(share => share.ticker === item.ticker) || [];
  //   console.log(tickers)
    
  //   return {
  //     ...item,
  //     oldPrice: ticker.price || 0,
  //   }
  // })

  useEffect(() => {
    socket.emit('start');

    socket.on('ticker', (data) => {
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
      <header className="promo">
        <ul className="promo__list">
          {tickers.map(share => (
            <li key={share.ticker} className="promo__item">
              <div>
              ↑ ↓
              </div>
              <div className="promo__data">
                <p>{getCompanyName(share.ticker)}</p>
                <p>{share.change_percent} %</p>
                <p>{share.price}</p>
                <p>{share.change}</p>
              </div>
            </li>
          ))}
        </ul>
      </header>
      <main className="content">
        <ul className="content__list">
          <li className="content__item">
            <p>Ticker</p>
            <p>Name</p>
            <p>Price</p>
            <p>Change</p>
            <p>Change %</p>
            <p>Dividend</p>
            <p>Yield</p>
            <p>Last trade</p>
          </li>
          {tickers.map(share => (
            <li key={share.ticker} className="content__item">
              <p>{share.ticker}</p>
              <p>{getCompanyName(share.ticker)}</p>
              <p>{share.price}</p>
              <p>{share.change}</p>
              <p>{share.change_percent}</p>
              <p>{share.dividend}</p>
              <p>{share.yield}</p>
              <p>
                {share.last_trade_time.slice(0, 10)}
                {share.last_trade_time.slice(11)}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}


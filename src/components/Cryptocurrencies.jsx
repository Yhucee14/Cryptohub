import React from 'react'
import { useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'

import { useGetCryptosQuery } from '../Services/cryptoApi'

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 50;
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
  const cryptos = cryptosList?.data?.coins;
  if(isFetching) return 'Loading...';

  // console.log(cryptos);

  return (
    <>
    <Row gutter={[32, 32]} className='crypto-card-container'>
       {cryptos && cryptos?.map((currency) => (
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
          <Link to={`/crypto/${currency.id}`}>
            <Card title={`${currency.rank}, ${currency.name}`}
            extra={<img className='crypto-image' 
            src={currency.iconUrl}/>}
            hoverable
            >
              <p>Price: {millify(currency.price)}</p>
              <p>Market Cap: {millify(currency.marketCap)}</p>
              <p>Daily Change: {millify(currency.change)}%</p>
            </Card>
          </Link>
        </Col>
       ))}
    </Row>
    </>
  )
}

export default Cryptocurrencies
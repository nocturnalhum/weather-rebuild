import Image from 'next/image';
import React, { useState } from 'react';
import Current from '../components/Current';
import Forecast from '../components/Forecast';
import Layout from '../components/Layout';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function City({ currentWeather, forecast }) {
  const [toggle, setToggle] = useState(true);
  console.log('CURRENT WEATHER', currentWeather);
  console.log('CURRENT FORECAST', forecast);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Layout title={currentWeather.name}>
      <div className='group m-auto max-w-3xl text-white perspective'>
        <button
          onClick={handleToggle}
          className='mb-2 w-40  rounded-full bg-black/20 p-2 backdrop-blur-sm'
        >
          <span>See: </span>
          {!toggle ? 'Current' : 'Forecast'}
        </button>
        <div
          className={`relative duration-500 preserve-3d ${
            toggle ? 'rotate-y-180' : ''
          }`}
        >
          {/* Side One: */}
          <div
            className={`absolute z-10 h-full w-full duration-300 rotate-y-180 ${
              toggle ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Current current={currentWeather} />
          </div>
          {/* Side Two: */}
          <div
            className={`absolute h-full w-full duration-300 ${
              toggle ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Forecast forecast={forecast} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// ============================================================================
// ===============<<< Get Server Side Props >>>================================
// ============================================================================
export async function getServerSideProps(context) {
  const cityParams = context.params.city.trim().split('&');
  const { 0: city, 1: id, 2: lat, 3: lon } = { ...cityParams };

  if (!lat || !lon) {
    return {
      notFound: true,
    };
  }

  // Get Weather:
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${API_KEY}`
  );
  const currentWeather = await weatherRes.json();

  // Get Forecast:
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=${API_KEY}`
  );
  const forecast = await forecastRes.json();

  if (!currentWeather || !forecast) {
    return {
      notFound: true,
    };
  }

  return {
    props: { currentWeather, forecast },
  };
}

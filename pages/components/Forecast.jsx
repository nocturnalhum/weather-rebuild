import getTime from '@/lib/getTime';
import React from 'react';

export default function Forecast({ forecast }) {
  return (
    <div className='bg-gray-500/20'>
      <h1 className='text-3xl'>5 Day Forecast</h1>
      <h1>
        {forecast.city.name} {forecast.city.state ? forecast.city.state : ''}{' '}
        {forecast.city.country}
      </h1>
      <h1>{forecast.city.coord.lat}</h1>
      <h1>{forecast.city.coord.lon}</h1>
      <h1>Sunrise: {getTime(forecast.city.sunrise, forecast.city.timezone)}</h1>
      <h1>Sunset: {getTime(forecast.city.sunset, forecast.city.timezone)}</h1>
      <button onClick={() => console.log('Clicked Forecast')}>Click</button>
    </div>
  );
}

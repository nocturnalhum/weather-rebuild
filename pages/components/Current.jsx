import React from 'react';

export default function Current({ current }) {
  return (
    <div className='flex flex-col bg-gray-500/20 text-white'>
      <h1 className='text-3xl'>Daily Weather</h1>
      {current.name}
      {current.sys.country}

      <h1>ID: {current.id}</h1>
      <h1>{current.coord.lat}</h1>
      <h1>{current.coord.lon}</h1>
      <button onClick={() => console.log('Clicked Daily')}>Click</button>
    </div>
  );
}

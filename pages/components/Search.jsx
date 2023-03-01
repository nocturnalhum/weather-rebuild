import useDebounce from '@/lib/useDebounce';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import cities from '@/lib/city.list.json';

export default function Search() {
  const [query, setQuery] = useState('');
  const [queryList, setQueryList] = useState([]);
  const [notFound, setNotFound] = useState(false);

  // const debounceSearch = useDebounce(query, 300);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    setNotFound(false);
    if (value.length < 1) {
      setQueryList([]);
    }
  };

  useEffect(() => {
    const getLocations = async () => {
      // Prevent illegal query searches:
      if (/^[! @ # $ % & * ( ) ]+$/.test(query)) {
        setNotFound(true);
        return;
      }
      // Get Geo Locations based on query search:
      if (query.length < 1) {
        setNotFound(true);
        setQueryList([]);
      } else {
        // const res = await fetch(
        //   `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        // );
        // const data = await res.json();
        if (query.length > 1) {
          const data = await cities.filter((city) => city.name.includes(query));
          console.log('LOCATIONS', data);
          setQueryList(data);
        }
      }
    };

    getLocations();
  }, [query]);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='container relative m-auto max-w-lg py-6'>
      <form onSubmit={onSubmit} className='flex rounded-xl border p-2 px-4'>
        <input
          type='text'
          onChange={onChange}
          placeholder='Search for a city'
          value={query}
          className='w-full bg-transparent text-xl text-white focus:outline-none'
        />
        <button>
          <BsSearch size={20} color={'white'} />
        </button>
      </form>
      {query && (
        <ul className='absolute z-20 mt-2 h-56    w-full divide-y divide-solid divide-gray-200/50   overflow-y-auto text-xl  text-gray-200'>
          {queryList.length >= 0 && !notFound ? (
            queryList.map((city, index) => (
              <li
                key={index}
                onClick={() => setQuery('')}
                className='cursor-pointer rounded-md bg-gray-600/50 py-2 px-6 backdrop-blur-md hover:bg-gray-200/20 hover:backdrop-blur-md'
              >
                <Link
                  href={`/location/${city.name}&${city.id}&${city.coord.lat}&${city.coord.lon}`}
                >
                  {city.name}, {city.state ? ` ${city.state}, ` : ''}
                  <span>{city.country}</span>
                </Link>
              </li>
            ))
          ) : (
            <li
              className={`rounded-md bg-gray-600/50 py-2 px-6 text-orange-400 backdrop-blur-md`}
            >
              Location not found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

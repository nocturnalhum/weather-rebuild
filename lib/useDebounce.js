import React, { useEffect, useState } from 'react';

export default function useDebounce(query, delay) {
  const [value, setValue] = useState(query);
  useEffect(() => {
    const handleTimeout = setTimeout(() => setValue(query), delay);

    return () => {
      clearTimeout(handleTimeout);
    };
  }, [query]);

  return value;
}

import { useState } from 'react';
import React from 'react';

export function CountButton() {
  const [count, setCount] = useState<number>(0);
  return <button onClick={() => setCount((count) => count + 1)}>
    count is {count}
  </button>;
}

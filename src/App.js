import React, { useEffect } from 'react';
import axios from 'axios';

export default function App() {

  useEffect(() => {
    axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
    .then(response => { console.log(response.data) });
  })

  return (
    <div>App</div>
  );
}

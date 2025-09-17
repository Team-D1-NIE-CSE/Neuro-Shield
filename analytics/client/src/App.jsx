import React from 'react'
import Axios from 'axios'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
// import { useEffect } from 'react'

const App = () => {
  const [getData, setGetData] = useState(false)
  let data = ''
  const apiCall = () => {
    try {
      Axios.get('http://localhost:3000/test1').then((data) => {
        setGetData(true)
        console.log(data);
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className='h1 text-red-400 text-3xl'>
      <h1>Hello Rishabh!</h1>
      <Button onClick={apiCall}>Call API</Button>
      {(getData) ?
        <h2>{data}</h2>
        :
        <h2></h2>
      }
    </div>
  )
}

export default App
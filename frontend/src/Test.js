import React from 'react'
import { Typography } from '@mui/material'
import { color } from '@mui/system'


const Test = () => {
  return (
    <div>
      <Typography variant='h1' fontWeight={700} sx={{color:"red", border:'2px solid black', borderRadius:10}}>hello world</Typography>
    </div>
  )
}

export default Test

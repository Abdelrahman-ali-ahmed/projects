import { Box, FormControl, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { handelMount } from '../redux/action';

function TextFieldComponent() {
    const dispatch=useDispatch();
    const handelChange=(e)=>{
        dispatch(handelMount(e.target.value))

    }
  return (
    <div> <Box mt={3} width="100%">
        <FormControl fullWidth size='small'>
            <TextField onChange={handelChange} variant='outlined' label="a Mount of Question" type='number' size='small'/>
        </FormControl>
        </Box></div>
  )
}

export default TextFieldComponent
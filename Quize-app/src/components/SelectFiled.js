import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { handelCategory, handelDifficulty, handelMount, handelScore, handelType } from '../redux/action';

function SelectFiled(props) {
    const {label,options}=props;
    const dispatch=useDispatch();
    const [Value,setValue]=useState('');

    const handelChange=(e)=>{
        switch(label){
            case "category":
                dispatch(handelCategory(e.target.value));
                break;
            case "Difficulty":
                dispatch(handelDifficulty(e.target.value));
                break;
            
            case "Type":
                dispatch(handelType(e.target.value));
                 break;
            
             default:
                return;
                
                            
            

        }
setValue(e.target.value);


    }

  return (
    <div><Box mt={3} width="100%">
        <FormControl size='small' fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select value={Value} label={label} onChange={handelChange}>
                {options.map((item)=>{
                    return (<MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>)
                })}
            </Select>
        </FormControl>
        
        
        </Box></div>
  )
}

export default SelectFiled
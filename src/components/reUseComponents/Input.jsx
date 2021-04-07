import React from 'react'
import {TextField, Grid, InputAdornment, IconButton} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'


const Input = ({
  half, name, label, handleChange, autoFocus, type, handleSnowPassword
}) => {
  return (
    <Grid item xs={12} sm={half ? (6) : (12)}>
      <TextField 
        name = {name}
        label = {label}
        onChange = {handleChange}
        autoFocus = {autoFocus}
        type = {type}
        variant = 'outlined'
        fullWidth
        required
        InputProps = { name === 'password' ? ({
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleSnowPassword}>
                {type === 'password' ? (<Visibility/>) : (<VisibilityOff/>)}
              </IconButton>
            </InputAdornment>
          )
        }) : (null)}
      />
    </Grid>
  )
}

export default Input

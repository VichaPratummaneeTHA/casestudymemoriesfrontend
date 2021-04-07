import {
  AUTH
} from '../constants/actionsTypes'
import * as api from '../api/indexApi'

export const signIn = (formData, history) => async(dispatch) => {
  console.log('signup got click')
  try {
     //sign in the user
     const {data} = await api.signIn(formData)

     dispatch({
       type: AUTH,
       data // get result && token from DB 
     })

     history.push('/')
  } catch (error) {
    console.log(error)
  }
}

export const signUp = (formData, history) => async(dispatch) => {
  console.log('signup got click')
  try {
    //sign up the user
    const {data} = await api.signUp(formData)

     dispatch({
       type: AUTH,
       data // get result && token from DB 
     })

    history.push('/')
  } catch (error) {
    console.log(error)
  }
}

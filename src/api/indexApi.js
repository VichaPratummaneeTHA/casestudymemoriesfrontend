import axios from 'axios'

const API = axios.create({baseURL: 'https://casestudypostmemories.herokuapp.com'})

API.interceptors.request.use(req => {
  if(localStorage.getItem('profile')){
    req.headers.Authorization = `Beare ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req;
})

//***** /posts *****//
export const fetchPosts = () => API.get('/posts')
export const createPost = newPost => API.post('/posts', newPost)
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData)
export const deletePost = id => API.delete(`/posts/${id}`)
export const likePost   = id => API.patch(`/posts/${id}/likePost`)

//***** /user *****//
export const signIn = formData => API.post('/user/signin', formData)
export const signUp = formData => API.post('/user/signup', formData)

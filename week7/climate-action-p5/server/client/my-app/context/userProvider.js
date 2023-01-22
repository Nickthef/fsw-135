import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

export default function UserProvider(props) {
    const initState = { user: {}, token: "" }
    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
            .then (res => {
                const {user, token} = res.data
                setUserState(prevUserState => ({
                  ...prevUserState,
                  user,
                  token
                }))
            })
            .catch (err => console.log(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then (res => {
              const {user, token} = res.data
              setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
              }))
          })
            .catch (err => console.dir(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider value={ { ...userState, signup, login} }>
            { props.children }
        </UserContext.Provider>
    )
}
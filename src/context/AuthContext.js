import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

const OPTIONS = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    CREATE: 'create'
}

export const authReducer = (state, action) => {
    switch(action.type) {
        case OPTIONS.LOGIN:
            return {...state, user: action.payload, name: action.payload.displayName, email: action.payload.email, isLoggedIn: true, isFirstTime: false}
        case OPTIONS.LOGOUT:
            return {...state, user: null, name: null, email: null, isLoggedIn: false, isFirstTime: false}
        case OPTIONS.CREATE:
            return {...state, user: action.payload, name: action.payload.displayName, email: action.payload.email, isLoggedIn: true, isFirstTime: true}
        case OPTIONS.LOGOUT:
        default:
            return state
    }
}

export function AuthProvider({ children }) {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isLoggedIn: false,
        name: null,
        email: null,
        password: null,
        isFirstTime: false
    })

    console.log('AuthContextState:', state)

    const login = (user) => {
        dispatch({type: OPTIONS.LOGIN, payload: user})
    }

    const logout = () => {
        dispatch({type: OPTIONS.LOGOUT})
    }

    const create = (user) => {
        dispatch({type: OPTIONS.CREATE, payload: user})
    }

    return (
    <AuthContext.Provider value={{...state, login, logout, create}}>
        {children}
    </AuthContext.Provider>
    )
}
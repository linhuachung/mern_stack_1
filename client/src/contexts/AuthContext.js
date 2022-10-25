import {createContext, useEffect, useReducer} from "react";
import {authReducer} from "../reducers/authReducer";
import axios from "axios";
import {apiurl, LOCAL_STORAGE_TOKEN_NAME} from "./constant";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticate: false,
        user: null
    })
//    authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${apiurl}/auth`)
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    authLoading: false,
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }
    useEffect(() => loadUser, [])
//    login
    const loginUser = async userForm => {
            try {
                const response = await axios.post(`${apiurl}/auth/login`, userForm)
                if (response.data.success)
                    localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
                return response.data
            } catch (error) {
                if (error.response.data) return error.response.data
                else return {success: false, message: error.message}
            }
        }
//    constext data
        const authContextData = {loginUser, authState}
//    return provider
        return (
            <AuthContext.Provider value={authContextData}>
                {children}
            </AuthContext.Provider>
        )
}
export default AuthContextProvider

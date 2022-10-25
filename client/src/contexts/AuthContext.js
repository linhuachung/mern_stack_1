import {createContext, useReducer} from "react";
import {authReducer} from "../reducers/authReducer";
import axios from "axios";
import {apiurl, LOCAL_STORAGE_TOKEN_NAME} from "./constant";

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticate: false,
        user: null
    })
//    login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiurl}/auth/login`,userForm)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }
//    constext data
    const authContextData = {loginUser}
//    return provider
    return(
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider

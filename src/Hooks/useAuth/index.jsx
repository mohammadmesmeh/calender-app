import { useContext } from "react"
import { AuthContext } from "../../context/authContext"

export const useAuth = () => {
    const { user, isLoading,isLoadingGoogle, signUpWithEmail,
        signUpWithGoogle } = useContext(AuthContext)
    return {
        user,
        isLoading,
        isLoadingGoogle,
        signUpWithEmail,
        signUpWithGoogle
    }
}
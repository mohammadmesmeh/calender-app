import { useContext } from "react"
import { AuthContext } from "@/features/auth/context/authContext/AuthContext"

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
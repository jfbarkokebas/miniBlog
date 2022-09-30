import { useContext, createContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children, value }) {
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
//VALUE É O VALOR QUE VAI SER COMPARTILHADO COMO CONTEXTO
//CHILDREN SÃO OS CONSUMIDORES DO VALUE
}

export function useAuthValue() {
    return useContext(AuthContext)
}
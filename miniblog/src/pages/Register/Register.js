import styles from './Register.module.css'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
    //variaveis front end
    const[displayName, setDisplayName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const[error, setError] = useState('')

    //variaveis back end
    const{createUser, error: authError, loading } = useAuthentication()

    //.............................

    const handleSubmit = async (e) =>{
        e.preventDefault()

        setError('')

        const user={
          displayName,
          email,
          password
        }

        if(password !== confirmPassword){
          setError('As senhas precisam ser iguais')
    
          return
        }

        const res = await createUser(user)

        console.log(res);
    }
    
    useEffect(()=>{
      if(authError){
        setError(authError)
      }
    },[authError])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuario e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name='displayName'
            value = {displayName}
            onChange={e => setDisplayName(e.target.value)}
            required 
            placeholder='Nome do usuário' />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name='email'
            value = {email}
            onChange={e => setEmail(e.target.value)}
            required 
            placeholder='E-mail do usuário' />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            name='password'
            value = {password}
            onChange={e => setPassword(e.target.value)}
            required 
            placeholder='Insira sua senha' />
        </label>
        <label>
          <span>Confirmação da Senha</span>
          <input
            type="password"
            name='password'
            value = {confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required 
            placeholder='Confirme sua senha' />
        </label>
        {!loading &&  <button className='btn'>Cadastrar</button>}
        {loading &&  <button className='btn' disabled>Aguarde...</button>}

        {error && <p className="error">{error}</p>}
        
      </form>

    </div>
  )
}

export default Register
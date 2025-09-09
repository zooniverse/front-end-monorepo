import { useState } from 'react'
import AuthModal from './AuthModal'

export default {
  title: 'Components / AuthModal',
  component: AuthModal
}

export function SignIn() {
  const [activeIndex, setActiveIndex] = useState(0)
  function closeModal() {
    setActiveIndex(-1)
  }
  function signIn() {
    setActiveIndex(0);
  }

  return [
    <button onClick={signIn}>Sign In</button>,
    <AuthModal activeIndex={activeIndex} closeModal={closeModal} onActive={setActiveIndex} />
  ]
}

export function Register() {
  const [activeIndex, setActiveIndex] = useState(1)
  function closeModal() {
    setActiveIndex(-1)
  }
  function register() {
    setActiveIndex(1);
  }

  return [
    <button onClick={register}>Register</button>,
    <AuthModal activeIndex={activeIndex} closeModal={closeModal} onActive={setActiveIndex} />
  ]
}

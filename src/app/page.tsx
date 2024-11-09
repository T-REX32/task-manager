"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

interface LoginProps {
  email?: string;
  password?: string;
  onLoginSuccess?: () => void;
  redirectPath?: string;
}

export default function LoginPage({ 
  email: initialEmail = '', 
  password: initialPassword = '', 
  onLoginSuccess, 
  redirectPath = '/tasks' 
}: LoginProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Controla entre login e cadastro
  const router = useRouter();

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Cadastro bem-sucedido! Agora faça login.');
        setIsRegister(false); // Volta para a tela de login
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful');
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        router.push(redirectPath);
      }
    } catch (error) {
      setError((error instanceof Error) ? error.message : String(error));
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? 'Cadastre-se' : 'Login'}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {isRegister ? 'Cadastrar' : 'Login'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        
        <p className="mt-4 text-center">
          {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
          <span 
            onClick={() => setIsRegister(!isRegister)} 
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {isRegister ? 'Login' : 'Cadastre-se'}
          </span>
        </p>
      </div>
    </div>
  );
}

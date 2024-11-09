"use client"

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginProps {
  email: string;
  password: string;
  onLoginSuccess?: () => void;
  redirectPath?: string;
}

export default function LoginPage({ 
  email: initialEmail, 
  password: initialPassword, 
  onLoginSuccess, 
  redirectPath = '/tasks' 
}: LoginProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      router.push(redirectPath);
    } catch (error) {
      setError("Login failed: " + (error instanceof Error ? error.message : String(error)));
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>)    => setPassword(e.target.value);

  return (
<>teste</>
    );
}
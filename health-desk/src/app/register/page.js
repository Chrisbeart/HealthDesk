"use client";  // Macht diese Datei zu einer Client-Komponente

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Verwende `next/navigation` anstelle von `next/router`

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
  });

  const router = useRouter();  // Verwende `useRouter` aus `next/navigation`

  const validatePassword = (password) => {
    setPasswordRequirements({
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.email) {
        alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return;
      }

      console.log('Sending SignUp Request:', { email: form.email, password: form.password });
      
      const response = await axios.post('/api/signup', {
        username: form.email,
        password: form.password,
      });
    
      console.log('SignUp Response:', response.data);
      alert('Registrierung erfolgreich! Sie können sich nun anmelden.');
      router.push('/confirm');
    } catch (error) {
      console.error('Error during SignUp:', error);
    
      if (error.response) {
        console.error('Error Data:', error.response.data);
        alert(error.response.data.error || 'Registrierung fehlgeschlagen! Bitte versuchen Sie es erneut.');
      } else {
        alert('Netzwerkfehler oder Server nicht erreichbar. Bitte versuchen Sie es später erneut.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center z-20">
      <div className="bg-custom-dark-gray bg-opacity-65 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-4xl mb-6 text-center font-bold font-ibm-plex-mono drop-shadow-xl text-white">Registrierung</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg font-thin text-custom-light-gray">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-thin text-custom-light-gray">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              minLength="12"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{12,}"
              title="Das Passwort muss mindestens 12 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten."
            />
            <ul className="mt-2 text-sm">
              <li className={passwordRequirements.length ? 'text-green-500' : 'text-red-500'}>
                Mindestens 12 Zeichen
              </li>
              <li className={passwordRequirements.uppercase ? 'text-green-500' : 'text-red-500'}>
                Mindestens ein Großbuchstabe
              </li>
              <li className={passwordRequirements.lowercase ? 'text-green-500' : 'text-red-500'}>
                Mindestens ein Kleinbuchstabe
              </li>
              <li className={passwordRequirements.digit ? 'text-green-500' : 'text-red-500'}>
                Mindestens eine Zahl
              </li>
              <li className={passwordRequirements.specialChar ? 'text-green-500' : 'text-red-500'}>
                Mindestens ein Sonderzeichen
              </li>
            </ul>
          </div>
          <div>
            <button type="submit" className="w-full bg-custom-green drop-shadow-xl hover:bg-custom-light-blue transition-all duration-300 hover:text-white text-black hover:rounded-xl p-2 rounded-md">
              Registrieren
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

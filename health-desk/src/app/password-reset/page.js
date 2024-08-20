"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PasswordResetPage = () => {
  const [step, setStep] = useState(1);  // Um die Schritte zu verwalten
  const [form, setForm] = useState({
    email: '',
    code: '',
    newPassword: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/password-reset', {
        email: form.email,
      });
  
      console.log('Password reset request successful:', response.data);
      alert('Verification code sent! Please check your email.');
      setStep(2);  // Zum nächsten Schritt wechseln
    } catch (error) {
      console.error('Password reset request error:', error.response?.data || error.message);
      alert('Password reset request failed! Please check your email address.');
    }
  };
  

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/password-reset-request', {
        email: form.email,
        code: form.code,
        newPassword: form.newPassword,
      });

      console.log('Password reset successful:', response.data);
      alert('Password reset successful! You can now log in with your new password.');

      router.push('/login');
    } catch (error) {
      console.error('Password reset error:', error.response?.data || error.message);
      alert('Password reset failed! Please check your information.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-dark-gray bg-opacity-15">
      <div className="bg-black bg-opacity-45 p-16 rounded-2xl shadow-md w-full max-w-xl">
        {step === 1 && (
          <>
            <h2 className="text-5xl tracking-widest text-white font-bold text-center mb-4 font-fjalla">RESET PASSWORD</h2>
            <p className="text-center text-white text-lato mb-8">ENTER YOUR EMAIL</p>
            <form className="space-y-4" onSubmit={handleEmailSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="ENTER YOUR EMAIL"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-custom-dark-gray focus:ring-opacity-35"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-b from-custom-green to-custom-light-gray text-black font-Beba text-xl py-2 rounded-full hover:border hover:border-black hover:border-opacity-10 hover:from-custom-green hover:drop-shadow-md transition duration-300"
                >
                  SEND VERIFICATION CODE
                </button>
              </div>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-5xl tracking-widest text-white font-bold text-center mb-4 font-fjalla">RESET PASSWORD</h2>
            <p className="text-center text-white text-lato mb-8">ENTER VERIFICATION CODE AND NEW PASSWORD</p>
            <form className="space-y-4" onSubmit={handlePasswordResetSubmit}>
              <div>
                <input
                  type="text"
                  name="code"
                  placeholder="ENTER VERIFICATION CODE"
                  value={form.code}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-custom-dark-gray focus:ring-opacity-35"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="ENTER NEW PASSWORD"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-custom-dark-gray focus:ring-opacity-35"
                  required
                  minLength="12"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{12,}"
                  title="Das Passwort muss mindestens 12 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten."
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-b from-custom-green to-custom-light-gray text-black font-Beba text-xl py-2 rounded-full hover:border hover:border-black hover:border-opacity-10 hover:from-custom-green hover:drop-shadow-md transition duration-300"
                >
                  RESET PASSWORD
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;

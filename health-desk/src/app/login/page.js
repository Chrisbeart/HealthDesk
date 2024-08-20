"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signin', {
        username: form.email,
        password: form.password,
      });
      console.log(response.data);
      alert('Anmeldung erfolgreich!');

      const userAttributesResponse = await axios.get('/api/userAttributes');
      const userAttributes = userAttributesResponse.data;

      router.push('/mitarbeiterprofil', { query: { ...userAttributes } });
    } catch (error) {
      console.error('Anmeldefehler:', error.response?.data || error.message);
      alert('Anmeldung fehlgeschlagen! Bitte überprüfen Sie Ihre Anmeldedaten.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-dark-gray bg-opacity-15">
      <div className="bg-black bg-opacity-45 p-16 rounded-2xl shadow-md w-full max-w-xl">
        <h2 className="text-5xl tracking-widest text-white font-bold text-center mb-4 font-fjalla">WELCOME BACK</h2>
        <p className="text-center text-white text-lato mb-8">SIGN IN TO SEE IF EVERYTHING IS ALL RIGHT</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            <input
              type="password"
              name="password"
              placeholder="ENTER YOUR PASSWORD"
              value={form.password}
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
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

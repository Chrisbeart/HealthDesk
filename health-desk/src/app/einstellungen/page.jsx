"use client"
import React, { useState } from 'react';

const Einstellungen = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const [theme, setTheme] = useState('light');

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const saveSettings = () => {
    // Implement save settings logic
    console.log('Settings saved:', {
      userInfo,
      passwords,
      notifications,
      theme
    });
  };

  return (
    <div className="p-6 pb-20 h-screen flex flex-col rounded-xl overflow-y-auto bg-opacity-80 custom-scrollbar-container custom-scrollbar text-black" 
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-out"
      data-aos-duration="1000"
      data-aos-once="true" 
    >
      <h1 className="text-6xl tracking-wide mb-4 font-fjalla">Einstellungen</h1>
      
      <div className="space-y-4">
        <section className="p-4 bg-white rounded-xl drop-shadow-md">
          <h2 className="text-2xl font-bold mb-4">Benutzerinformationen</h2>
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userInfo.name}
              onChange={handleUserInfoChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleUserInfoChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefon"
              value={userInfo.phone}
              onChange={handleUserInfoChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </section>
        
        <section className="p-4 bg-white rounded-xl drop-shadow-md">
          <h2 className="text-2xl font-bold mb-4">Passwort ändern</h2>
          <div className="space-y-2">
            <input
              type="password"
              name="currentPassword"
              placeholder="Aktuelles Passwort"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="Neues Passwort"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Neues Passwort bestätigen"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </section>
        
        <section className="p-4 bg-white rounded-xl drop-shadow-md">
          <h2 className="text-2xl font-bold mb-4">Benachrichtigungen</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="email"
                checked={notifications.email}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              Email-Benachrichtigungen
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sms"
                checked={notifications.sms}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              SMS-Benachrichtigungen
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="push"
                checked={notifications.push}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              Push-Benachrichtigungen
            </label>
          </div>
        </section>
        
        <section className="p-4 bg-white rounded-xl drop-shadow-md">
          <h2 className="text-2xl font-bold mb-4">Theme</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={handleThemeChange}
                className="mr-2"
              />
              Light Mode
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={handleThemeChange}
                className="mr-2"
              />
              Dark Mode
            </label>
          </div>
        </section>
        
        <button
          onClick={saveSettings}
          className="p-2 bg-custom-dark-gray text-white rounded-xl hover:bg-opacity-80 transition duration-200"
        >
          Einstellungen speichern
        </button>
      </div>
    </div>
  );
};

export default Einstellungen;
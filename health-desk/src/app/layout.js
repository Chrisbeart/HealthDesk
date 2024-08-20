"use client"
import store from './aufnahme/state/store';
import Navbar from './components/Navbar';
import './globals.css';
import WaveBackground from './components/WaveBackground';
import { Provider } from 'react-redux';

export default function RootLayout({ children }) {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <html lang="en">
      <body className="relative flex w-full h-full max-h-screen overflow-hidden">
        {/* Hintergrund hinzufügen */}
        <WaveBackground />
        
        {/* Navbar hinzufügen */}
        <Navbar currentPath={currentPath} />

        {/* Hauptinhalt */}
        <main className="flex w-full h-full max-h-screen overflow-hidden relative z-10">
          <Provider store={store}>
            {children}
          </Provider>
        </main>
      </body>
    </html>
  );
}

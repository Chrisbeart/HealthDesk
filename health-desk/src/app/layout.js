import Navbar from './components/navbar/Navbar';
import './globals.css';
import WaveBackground from './components/backgrounds/WaveBackground';

export default function RootLayout({ children }) {
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <html lang="en">
      <body className="relative flex">
        {/* Hintergrund hinzufügen */}
        <WaveBackground />
        
        {/* Navbar hinzufügen */}
        <Navbar currentPath={currentPath} />

        {/* Hauptinhalt */}
        <main className="flex-1 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}

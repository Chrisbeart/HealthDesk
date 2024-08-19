import WaveBackground from './components/backgrounds/WaveBackground';

export default function Home() {
  return (
    <div className="relative w-full h-screen flex">
      {/* Navbar hinzufügen */}

      <div className="flex flex-col flex-1 items-center justify-center bg-gray-100 overflow-hidden">
        {/* Hintergrund hinzufügen */}
        <WaveBackground />

        {/* Zentrale Überschrift */}
        <h1 className="text-6xl font-bold text-gray-900 z-10">Health Desk</h1>
      </div>
    </div>
  );
}

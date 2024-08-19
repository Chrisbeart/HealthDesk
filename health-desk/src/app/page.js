import WaveBackground from './components/backgrounds/WaveBackground';

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gray-100">
      {/* Hintergrund hinzufügen */}
      <WaveBackground />

      {/* Zentrale Überschrift */}
      <h1 className="text-6xl font-bold text-gray-900 z-10">Health Desk</h1>
    </main>
  );
}

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Food Waste Tracker</h1>

      <p className="text-gray-700 mb-6">
        Track your daily food waste and reduce environmental impact.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Today's Waste</h2>
          <p className="text-gray-600">No entries yet.</p>
        </div>

        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Weekly Stats</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>

        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-2">Tips</h2>
          <p className="text-gray-600">Reduce waste by storing food properly!</p>
        </div>
      </div>
    </main>
  );
}

'use client';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#f0fdf4',
        color: '#166534',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        🌍 Food Waste Tracker
      </h1>
      <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px' }}>
        Successfully deployed! Supporting <strong>UN SDG 12</strong> — Responsible Consumption and Production.
      </p>
      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#65a30d' }}>
        Build: {new Date().toISOString().split('T')[0]}
      </div>
    </div>
  );
}

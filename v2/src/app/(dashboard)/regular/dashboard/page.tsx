export default function RegularDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Créditos IA</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Créditos Consultoria</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Tickets Abertos</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>
    </div>
  );
}

export default function LawyerPanelPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Painel do Advogado</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Tickets Pendentes</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Agendamentos Hoje</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Casos Concluídos</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold">Avaliação</h3>
          <p className="text-3xl font-bold mt-2">5.0⭐</p>
        </div>
      </div>
    </div>
  );
}

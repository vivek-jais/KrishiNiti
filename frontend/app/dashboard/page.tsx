export default function Dashboard() {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl">
          <h2 className="font-semibold">Current Crop</h2>
          <p className="text-zinc-600">Wheat</p>
        </div>

        <div className="p-6 border rounded-xl">
          <h2 className="font-semibold">Best Mandi</h2>
          <p className="text-zinc-600">Itarsi</p>
        </div>

        <div className="p-6 border rounded-xl">
          <h2 className="font-semibold">Expected Profit</h2>
          <p className="text-zinc-600">₹7,900</p>
        </div>
      </div>
    </div>
  );
}
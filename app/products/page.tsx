import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function DummyPage() {
  return (
    <div className="flex bg-[#fcfcfd] min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-8 flex flex-col items-center justify-center h-[80vh] text-gray-400">
          <h1 className="text-2xl font-bold">Coming Soon</h1>
          <p>This module is under development.</p>
        </main>
      </div>
    </div>
  );
}

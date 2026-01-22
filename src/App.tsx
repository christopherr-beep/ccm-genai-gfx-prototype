import { PizzaTracker } from './components/PizzaTracker';
import { mockCampaign } from './mockData';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CCM - Campaign & Content Management</h1>
              <p className="text-sm text-gray-600 mt-1">GenAI GFX Cards & Approval Process</p>
            </div>
            <div className="text-sm text-gray-500">
              Campaign ID: {mockCampaign.id}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {mockCampaign.name}
          </h2>
          <p className="text-sm text-gray-600">
            Track asset progress, generate GenAI GFX cards, and manage approval workflow
          </p>
        </div>

        <PizzaTracker campaign={mockCampaign} />
      </main>

      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-sm text-gray-500 text-center">
            CCM GenAI GFX Prototype - For Testing & Demonstration Purposes Only
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

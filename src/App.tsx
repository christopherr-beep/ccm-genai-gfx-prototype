import React from 'react';
import { PizzaTracker } from './components/PizzaTracker';
import { mockCampaign } from './mockData';

function App() {
  return <PizzaTracker campaign={mockCampaign} />;
}

export default App;

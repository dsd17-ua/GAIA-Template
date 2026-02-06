import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NewMatchPage } from '@/features/live-match/pages/NewMatchPage';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/matches/new" replace />} />
          <Route path="/matches/new" element={<NewMatchPage />} />
          {/* Dashboard route placeholder */}
          <Route path="/matches/:id/dashboard" element={<div>Match Dashboard (Placeholder)</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

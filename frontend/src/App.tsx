import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NewMatchPage } from '@/features/live-match/pages/NewMatchPage';
import { MatchDashboardPage } from '@/features/live-match/pages/MatchDashboardPage';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/matches/new" replace />} />
          <Route path="/matches/new" element={<NewMatchPage />} />
          <Route path="/matches/:id/dashboard" element={<MatchDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

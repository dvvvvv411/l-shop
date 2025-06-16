
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingSpinner from './components/LoadingSpinner';
import { OrderProvider } from './contexts/OrderContext';
import { TooltipProvider } from './components/ui/tooltip';
import ConditionalRouter from './components/ConditionalRouter';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <OrderProvider>
          <Router>
            <div className="App">
              <Suspense fallback={<LoadingSpinner />}>
                <ConditionalRouter />
              </Suspense>
            </div>
          </Router>
        </OrderProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

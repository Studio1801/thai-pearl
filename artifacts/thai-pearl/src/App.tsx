import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

const PREVIEW = import.meta.env.VITE_PREVIEW === '1';
import { lazy, Suspense, useEffect } from 'react';
import Home from '@/pages/home';
import MenuPage from '@/pages/menu';
import OrderStatusPage from '@/pages/order-status';

// The owner dashboard is its own bundle so guests never download it.
const Dashboard = lazy(() => import('@/pages/dashboard'));

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/menu" component={MenuPage} />
        <Route path="/order/:id">{(params) => <OrderStatusPage params={params as { id: string }} />}</Route>
        <Route path="/dashboard">
          <Suspense fallback={<div className="min-h-screen bg-[#180E06]" />}>
            <Dashboard />
          </Suspense>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter {...(PREVIEW ? { hook: useHashLocation } : { base: import.meta.env.BASE_URL.replace(/\/$/, '') })}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

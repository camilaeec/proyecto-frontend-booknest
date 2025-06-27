import Navbar from './components/ui/Navbar';
import { Toaster } from 'react-hot-toast';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="min-h-screen bg-booknest-light-gray">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <AppRouter />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Estoque from './pages/Estoque.jsx';
import CarDetail from './pages/CarDetail.jsx';
import Contato from './pages/Contato.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminCars from './pages/admin/AdminCars.jsx';
import AdminCarForm from './pages/admin/AdminCarForm.jsx';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/estoque"      element={<Estoque />} />
          <Route path="/carro/:id"    element={<CarDetail />} />
          <Route path="/contato"      element={<Contato />} />

          <Route path="/admin/login"  element={<AdminLogin />} />
          <Route path="/admin"        element={<AdminLayout />}>
            <Route index               element={<AdminCars />} />
            <Route path="novo"         element={<AdminCarForm />} />
            <Route path="editar/:id"   element={<AdminCarForm />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

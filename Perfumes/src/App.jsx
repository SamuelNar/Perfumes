import './App.css'
import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import CartDrawer from './components/CartDrawer'

const Elixires = lazy(() => import('./pages/Elixires'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Tienda = lazy(() => import('./pages/Tienda'))
const ProductoDetalle = lazy(() => import('./pages/ProductoDetalle'))
const AdminRoute = lazy(() => import('./components/AdminRoute'))
const Login = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminHome = lazy(() => import('./pages/admin/AdminHome'))
const ProductList = lazy(() => import('./pages/admin/ProductList'))
const ProductForm = lazy(() => import('./pages/admin/ProductForm'))
const CategoryList = lazy(() => import('./pages/admin/CategoryList'))
const CategoryForm = lazy(() => import('./pages/admin/CategoryForm'))
const IntentionList = lazy(() => import('./pages/admin/IntentionList'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CartDrawer />
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-9 h-9 border-[3px] border-gold/20 border-t-gold rounded-full animate-spin" />
          </div>
        }>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>}>
            <Route index element={<AdminHome />} />
            <Route path="productos" element={<ProductList />} />
            <Route path="productos/nuevo" element={<ProductForm />} />
            <Route path="productos/:id/editar" element={<ProductForm />} />
            <Route path="categorias" element={<CategoryList />} />
            <Route path="categorias/nueva" element={<CategoryForm />} />
            <Route path="categorias/:id/editar" element={<CategoryForm />} />
            <Route path="intenciones" element={<IntentionList />} />
          </Route>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/elixires" element={<Elixires />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
          </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

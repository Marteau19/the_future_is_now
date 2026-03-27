import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { JourneyProvider, useJourney } from './context/JourneyContext'
import { CartProvider } from './context/CartContext'
import { TutorialProvider } from './context/TutorialContext'

import Configurator from './pages/Configurator'
import CreateAccount from './pages/CreateAccount'
import BookSoilAnalysis from './pages/BookSoilAnalysis'
import SoilReport from './pages/SoilReport'
import BookInstallation from './pages/BookInstallation'
import InstallationComplete from './pages/InstallationComplete'
import Dashboard from './pages/Dashboard'
import BookMaintenance from './pages/BookMaintenance'
import PartsStore from './pages/PartsStore'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import MySystem from './pages/MySystem'
import Account from './pages/Account'

function RootRedirect() {
  const { hasSystem } = useJourney()
  return <Navigate to={hasSystem ? '/dashboard' : '/'} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <JourneyProvider>
        <CartProvider>
          <TutorialProvider>
            <Routes>
              {/* Pre-ownership flow */}
              <Route path="/" element={<Configurator />} />
              <Route path="/account/create" element={<CreateAccount />} />
              <Route path="/book-soil-analysis" element={<BookSoilAnalysis />} />
              <Route path="/soil-report" element={<SoilReport />} />
              <Route path="/book-installation" element={<BookInstallation />} />
              <Route path="/installation-complete" element={<InstallationComplete />} />

              {/* Post-ownership flow */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/system" element={<MySystem />} />
              <Route path="/book" element={<BookMaintenance />} />
              <Route path="/parts" element={<PartsStore />} />
              <Route path="/parts/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/account" element={<Account />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </TutorialProvider>
        </CartProvider>
      </JourneyProvider>
    </BrowserRouter>
  )
}

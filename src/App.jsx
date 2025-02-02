import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Admin from './pages/Admin';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ServiceManagement from './pages/ServiceManagement';
import StaffManagement from './pages/StaffManagement';
import BookingCalendarView from './pages/BookingCalendarView';
import CustomerManagement from './pages/CustomerManagement';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <NotificationsProvider>
            <div className="min-h-screen">
              <Navbar />
              <main>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

                  {/* Protected Routes */}
                  <Route
                    path="/booking/:serviceId"
                    element={
                      <ProtectedRoute>
                        <Booking />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/confirmation/:bookingId"
                    element={
                      <ProtectedRoute>
                        <Confirmation />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireAdmin>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/services"
                    element={
                      <ProtectedRoute requireAdmin>
                        <ServiceManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/staff"
                    element={
                      <ProtectedRoute requireAdmin>
                        <StaffManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/calendar"
                    element={
                      <ProtectedRoute requireAdmin>
                        <BookingCalendarView />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/customers"
                    element={
                      <ProtectedRoute requireAdmin>
                        <CustomerManagement />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
            </div>
          </NotificationsProvider>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

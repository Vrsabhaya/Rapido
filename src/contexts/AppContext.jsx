import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as api from '../services/api';

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export function AppProvider({ children }) {
  const { currentUser } = useAuth();
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchInitialData();
    }
  }, [currentUser]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [servicesData, bookingsData, staffData] = await Promise.all([
        api.getServices(),
        api.getBookings(),
        api.getStaffMembers()
      ]);
      setServices(servicesData);
      setBookings(bookingsData);
      setStaff(staffData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNewBooking = async (bookingData) => {
    try {
      const newBooking = await api.createBooking(bookingData);
      setBookings(prev => [newBooking, ...prev]);
      return newBooking;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const createNewService = async (serviceData) => {
    try {
      const newService = await api.createService(serviceData);
      setServices(prev => [newService, ...prev]);
      return newService;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const createNewStaffMember = async (staffData) => {
    try {
      const newStaff = await api.createStaffMember(staffData);
      setStaff(prev => [newStaff, ...prev]);
      return newStaff;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    services,
    bookings,
    staff,
    loading,
    error,
    createNewBooking,
    createNewService,
    createNewStaffMember,
    refreshData: fetchInitialData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
} 
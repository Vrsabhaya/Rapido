import { useState, useEffect } from 'react';
import { 
  FunnelIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import BookingCalendar from '../components/BookingCalendar';

const BookingCalendarView = () => {
  const [bookings, setBookings] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    staff: 'all',
    service: 'all'
  });

  useEffect(() => {
    // In a real app, this would be an API call
    const mockBookings = [
      {
        id: 1,
        customerName: 'Alice Johnson',
        serviceName: 'House Cleaning',
        serviceId: 1,
        staffId: 1,
        date: '2024-02-20',
        time: '09:00',
        status: 'confirmed',
        location: '123 Main St'
      },
      {
        id: 2,
        customerName: 'Bob Smith',
        serviceName: 'Plumbing Repair',
        serviceId: 2,
        staffId: 2,
        date: '2024-02-20',
        time: '14:00',
        status: 'pending',
        location: '456 Oak Ave'
      }
    ];

    const mockStaff = [
      {
        id: 1,
        name: 'John Doe',
        role: 'technician',
        skills: ['Cleaning']
      },
      {
        id: 2,
        name: 'Jane Smith',
        role: 'technician',
        skills: ['Plumbing']
      }
    ];

    setBookings(mockBookings);
    setStaff(mockStaff);
    setLoading(false);
  }, []);

  const handleBookingUpdate = (updatedBooking) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    setBookings(updatedBookings);
    // In a real app, this would be an API call
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const filteredBookings = bookings.filter(booking => {
    if (filters.status !== 'all' && booking.status !== filters.status) return false;
    if (filters.staff !== 'all' && booking.staffId !== parseInt(filters.staff)) return false;
    if (filters.service !== 'all' && booking.serviceId !== parseInt(filters.service)) return false;
    return true;
  });

  const services = [...new Set(bookings.map(b => ({ id: b.serviceId, name: b.serviceName })))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <ArrowPathIcon className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking Calendar</h1>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Staff Member
                  </label>
                  <select
                    value={filters.staff}
                    onChange={(e) => setFilters({ ...filters, staff: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="all">All Staff</option>
                    {staff.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service
                  </label>
                  <select
                    value={filters.service}
                    onChange={(e) => setFilters({ ...filters, service: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="all">All Services</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <BookingCalendar
          bookings={filteredBookings}
          staff={staff}
          onBookingUpdate={handleBookingUpdate}
        />
      </div>
    </div>
  );
};

export default BookingCalendarView; 
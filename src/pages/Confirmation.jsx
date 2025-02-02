import { useParams, Link, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import { format } from 'date-fns';

const Confirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  // Get booking from localStorage
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const booking = bookings.find(b => b.id === parseInt(bookingId));

  if (!booking) {
    navigate('/services');
    return null;
  }

  const service = services.find(s => s.id === booking.serviceId);

  const formatDateTime = (date, time) => {
    const [hours, minutes] = time.split(':');
    const dateObj = new Date(date);
    dateObj.setHours(parseInt(hours), parseInt(minutes));
    return format(dateObj, 'EEEE, MMMM d, yyyy h:mm a');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your service has been scheduled successfully.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4">
              <div>
                <h3 className="font-semibold">{service.title}</h3>
                <p className="text-gray-600">{service.category}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary-600">
                  ${service.startingPrice}
                </p>
                <p className="text-sm text-gray-500">{service.priceUnit}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Schedule</h3>
              <p className="text-gray-700">
                {formatDateTime(booking.date, booking.time)}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-gray-900">{booking.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900">{booking.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-gray-900">{booking.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-gray-900">{booking.address}</p>
                </div>
              </div>
            </div>

            {booking.notes && (
              <div>
                <h3 className="font-semibold mb-2">Special Instructions</h3>
                <p className="text-gray-700">{booking.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <Link to="/" className="btn btn-secondary">
            Return Home
          </Link>
          <Link to="/services" className="btn btn-primary">
            Book Another Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation; 
import { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const BookingCalendar = ({ bookings, onBookingUpdate, staff }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [draggingBooking, setDraggingBooking] = useState(null);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  useEffect(() => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const dates = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    setWeekDates(dates);
  }, [selectedDate]);

  const handlePrevWeek = () => {
    setSelectedDate(date => addDays(date, -7));
  };

  const handleNextWeek = () => {
    setSelectedDate(date => addDays(date, 7));
  };

  const getBookingsForSlot = (date, hour) => {
    return bookings.filter(booking => {
      const bookingDate = parseISO(booking.date);
      const bookingHour = parseInt(booking.time.split(':')[0]);
      return isSameDay(bookingDate, date) && bookingHour === hour;
    });
  };

  const handleDragStart = (booking) => {
    setDraggingBooking(booking);
  };

  const handleDragOver = (e, date, hour) => {
    e.preventDefault();
    setHoveredSlot({ date, hour });
  };

  const handleDrop = (e, date, hour) => {
    e.preventDefault();
    if (!draggingBooking) return;

    const updatedBooking = {
      ...draggingBooking,
      date: format(date, 'yyyy-MM-dd'),
      time: `${hour}:00`
    };

    onBookingUpdate(updatedBooking);
    setDraggingBooking(null);
    setHoveredSlot(null);
  };

  const getAssignedStaff = (booking) => {
    return staff.find(s => s.id === booking.staffId);
  };

  const getSlotColor = (date, hour) => {
    if (hoveredSlot && isSameDay(hoveredSlot.date, date) && hoveredSlot.hour === hour) {
      return 'bg-primary-100';
    }
    return 'bg-white';
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={handlePrevWeek}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleNextWeek}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="ml-4 text-lg font-semibold text-gray-900">
              {format(weekDates[0], 'MMMM d')} - {format(weekDates[6], 'MMMM d, yyyy')}
            </h2>
          </div>
          <div className="flex space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600">Booked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="grid grid-cols-8 border-b border-gray-200">
            {/* Time column header */}
            <div className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </div>
            {/* Day column headers */}
            {weekDates.map(date => (
              <div
                key={date.toString()}
                className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {format(date, 'EEE d')}
              </div>
            ))}
          </div>

          {/* Time slots */}
          {timeSlots.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-gray-200">
              {/* Time column */}
              <div className="py-4 text-sm text-gray-500 text-center">
                {format(new Date().setHours(hour), 'ha')}
              </div>
              {/* Day columns */}
              {weekDates.map(date => {
                const slotBookings = getBookingsForSlot(date, hour);
                return (
                  <div
                    key={date.toString()}
                    className={`p-2 border-l border-gray-200 min-h-[100px] ${getSlotColor(date, hour)}`}
                    onDragOver={(e) => handleDragOver(e, date, hour)}
                    onDrop={(e) => handleDrop(e, date, hour)}
                  >
                    {slotBookings.map(booking => {
                      const assignedStaff = getAssignedStaff(booking);
                      return (
                        <div
                          key={booking.id}
                          draggable
                          onDragStart={() => handleDragStart(booking)}
                          className={`p-2 mb-2 rounded-lg shadow-sm cursor-move
                            ${booking.status === 'confirmed' ? 'bg-green-50 border border-green-200' :
                              booking.status === 'pending' ? 'bg-yellow-50 border border-yellow-200' :
                              'bg-gray-50 border border-gray-200'}`}
                        >
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {booking.serviceName}
                          </div>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <UserIcon className="h-3 w-3 mr-1" />
                            {booking.customerName}
                          </div>
                          {assignedStaff && (
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <UserIcon className="h-3 w-3 mr-1" />
                              {assignedStaff.name}
                            </div>
                          )}
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            {format(parseISO(booking.date), 'MMM d')} at {booking.time}
                          </div>
                          {booking.location && (
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              {booking.location}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar; 
import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 5,
    comment: 'Absolutely amazing service! The team was professional, efficient, and left my home spotless.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 5,
    comment: 'Best service provider in town. Their staff is well-trained and always punctual.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Interior Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    rating: 5,
    comment: 'Their attention to detail is unmatched. I recommend them to all my clients.',
  },
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        <div className="mt-16 relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
                    <div className="flex items-center gap-x-4">
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={review.image}
                        alt={review.name}
                      />
                      <div>
                        <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">
                          {review.name}
                        </h3>
                        <p className="text-sm leading-6 text-gray-600">{review.role}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-5 w-5 text-yellow-400"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-gray-600 italic">"{review.comment}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCarousel; 
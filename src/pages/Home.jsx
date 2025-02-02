import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { services, categories } from '../data/services';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import ReviewCarousel from '../components/ReviewCarousel';
import StatsSection from '../components/StatsSection';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/services?search=${searchQuery}`);
  };

  const popularServices = services.slice(0, 4);

  return (
    <div className="bg-white">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <ReviewCarousel />
      
      {/* Call to Action Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
              <br />
              Book your service today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Join thousands of satisfied customers who trust us with their service needs.
              Experience the difference of professional service.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/services"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Browse Services
              </a>
              <a href="/contact" className="text-sm font-semibold leading-6 text-white">
                Contact Us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
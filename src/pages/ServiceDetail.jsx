import { useParams, Link, useNavigate } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <p className="mb-8">The service you're looking for doesn't exist.</p>
        <Link to="/services" className="btn btn-primary">
          View All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Service Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
          <p className="text-gray-600 text-lg">{service.category}</p>
        </div>

        {/* Service Image */}
        <div className="rounded-lg overflow-hidden mb-8 shadow-lg">
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-[400px] object-cover"
            onError={(e) => {
              e.target.src = 'https://placehold.co/800x400?text=Service+Image';
            }}
          />
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">About This Service</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {service.longDescription}
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Pricing</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary-600">
                ${service.startingPrice}
              </span>
              <span className="text-gray-500"> {service.priceUnit}</span>
            </div>
            <button
              onClick={() => navigate(`/booking/${service.id}`)}
              className="w-full btn btn-primary mb-4"
            >
              Book Now
            </button>
            <div className="text-sm text-gray-600">
              <p>✓ Professional service</p>
              <p>✓ Satisfaction guaranteed</p>
              <p>✓ Flexible scheduling</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="border-t pt-8">
          <Link to="/services" className="text-primary-600 hover:text-primary-700">
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail; 
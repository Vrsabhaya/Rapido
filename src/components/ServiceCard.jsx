import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const { id, title, description, startingPrice, priceUnit, imageUrl, slug } = service;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400?text=Service+Image';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="text-primary-600">
            <span className="text-2xl font-bold">${startingPrice}</span>
            <span className="text-sm text-gray-500"> {priceUnit}</span>
          </div>
          <Link
            to={`/services/${slug}`}
            className="btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 
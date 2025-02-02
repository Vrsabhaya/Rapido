import { useState, useEffect } from 'react';
import { 
  PencilIcon, TrashIcon, PlusIcon, 
  CheckIcon, XMarkIcon 
} from '@heroicons/react/24/outline';
import { services } from '../data/services';

const ServiceManagement = () => {
  const [servicesList, setServicesList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    startingPrice: '',
    imageUrl: '',
    category: ''
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // In a real app, this would be an API call
    setServicesList(services);
  }, []);

  const categories = [...new Set(services.map(service => service.category))];

  const handleEdit = (service) => {
    setEditingId(service.id);
    setNewService({
      title: service.title,
      description: service.description,
      startingPrice: service.startingPrice,
      imageUrl: service.imageUrl,
      category: service.category
    });
  };

  const handleSave = (id) => {
    const updatedServices = servicesList.map(service =>
      service.id === id
        ? { ...service, ...newService }
        : service
    );
    setServicesList(updatedServices);
    setEditingId(null);
    // In a real app, this would be an API call to update the service
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updatedServices = servicesList.filter(service => service.id !== id);
      setServicesList(updatedServices);
      // In a real app, this would be an API call to delete the service
      localStorage.setItem('services', JSON.stringify(updatedServices));
    }
  };

  const handleAddNew = () => {
    const newId = Math.max(...servicesList.map(s => s.id)) + 1;
    const serviceToAdd = {
      id: newId,
      ...newService,
      startingPrice: parseFloat(newService.startingPrice)
    };
    
    const updatedServices = [...servicesList, serviceToAdd];
    setServicesList(updatedServices);
    setIsAddingNew(false);
    setNewService({
      title: '',
      description: '',
      startingPrice: '',
      imageUrl: '',
      category: ''
    });
    // In a real app, this would be an API call to create the service
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const filteredServices = servicesList.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
            <button
              onClick={() => setIsAddingNew(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Service
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Services
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or description..."
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Service Form */}
          {isAddingNew && (
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Add New Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newService.category}
                      onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Starting Price
                    </label>
                    <input
                      type="number"
                      value={newService.startingPrice}
                      onChange={(e) => setNewService({ ...newService, startingPrice: e.target.value })}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={newService.imageUrl}
                      onChange={(e) => setNewService({ ...newService, imageUrl: e.target.value })}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      rows={3}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNew}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Add Service
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Services List */}
          <div className="bg-white shadow rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredServices.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === service.id ? (
                          <input
                            type="text"
                            value={newService.title}
                            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                          />
                        ) : (
                          <div className="flex items-center">
                            <img
                              src={service.imageUrl}
                              alt={service.title}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{service.title}</div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === service.id ? (
                          <input
                            type="text"
                            value={newService.category}
                            onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">{service.category}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === service.id ? (
                          <input
                            type="number"
                            value={newService.startingPrice}
                            onChange={(e) => setNewService({ ...newService, startingPrice: e.target.value })}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">${service.startingPrice}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === service.id ? (
                          <textarea
                            value={newService.description}
                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                            rows={2}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">{service.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingId === service.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSave(service.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(service)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(service.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement; 
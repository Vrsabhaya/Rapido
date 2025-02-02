export const services = [
  {
    id: 1,
    title: "Plumbing Repair",
    slug: "plumbing-repair",
    category: "Plumbing",
    description: "Professional plumbing repair services including leak fixes, pipe repairs, and drain cleaning.",
    longDescription: "Our expert plumbers provide comprehensive repair services for all your plumbing needs. We handle everything from minor leaks to major pipe repairs and complete drain cleaning services. All our work comes with a satisfaction guarantee.",
    startingPrice: 89,
    priceUnit: "per hour",
    imageUrl: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Electrical Installation",
    slug: "electrical-installation",
    category: "Electrical",
    description: "Licensed electricians for all your electrical installation and repair needs.",
    longDescription: "Our certified electricians can handle any electrical job, from new installations to repairs and maintenance. We ensure all work meets local codes and safety standards.",
    startingPrice: 95,
    priceUnit: "per hour",
    imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80",
    featured: true,
  },
  {
    id: 3,
    title: "HVAC Service",
    slug: "hvac-service",
    category: "HVAC",
    description: "Complete heating, ventilation, and air conditioning services.",
    longDescription: "Keep your home comfortable year-round with our comprehensive HVAC services. We offer maintenance, repair, and installation for all major brands of heating and cooling systems.",
    startingPrice: 99,
    priceUnit: "per visit",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80",
    featured: true,
  },
  {
    id: 4,
    title: "House Cleaning",
    slug: "house-cleaning",
    category: "Cleaning",
    description: "Professional house cleaning services for a spotless home.",
    longDescription: "Our thorough house cleaning service covers all areas of your home. We use eco-friendly products and follow a detailed cleaning checklist to ensure your complete satisfaction.",
    startingPrice: 120,
    priceUnit: "per visit",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    id: 5,
    title: "Lawn Care",
    slug: "lawn-care",
    category: "Outdoor",
    description: "Complete lawn maintenance and landscaping services.",
    longDescription: "Keep your lawn looking its best with our professional lawn care services. We offer mowing, edging, fertilization, and complete landscape maintenance packages.",
    startingPrice: 75,
    priceUnit: "per visit",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    id: 6,
    title: "Pest Control",
    slug: "pest-control",
    category: "Home Maintenance",
    description: "Effective pest control solutions for your home.",
    longDescription: "Our pest control services eliminate unwanted pests and prevent future infestations. We use safe, environmentally friendly methods to protect your home and family.",
    startingPrice: 110,
    priceUnit: "per treatment",
    imageUrl: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80",
    featured: false,
  }
];

export const categories = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Appliances",
  "Cleaning",
];

export const getFeaturedServices = () => {
  return services.filter(service => service.featured);
};

export const getServiceBySlug = (slug) => {
  return services.find(service => service.slug === slug);
};

export const getServicesByCategory = (category) => {
  return services.filter(service => service.category === category);
}; 
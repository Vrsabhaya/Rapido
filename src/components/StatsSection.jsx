const stats = [
  { id: 1, name: 'Happy Customers', value: '10,000+' },
  { id: 2, name: 'Professional Staff', value: '500+' },
  { id: 3, name: 'Services Completed', value: '50,000+' },
  { id: 4, name: 'Years of Experience', value: '10+' },
];

const StatsSection = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by thousands of customers
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We take pride in our numbers and the trust our customers place in us
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 
import {
  ClockIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: '24/7 Availability',
    description: 'Book our services any time, day or night. We\'re always here for you.',
    icon: ClockIcon,
  },
  {
    name: 'Professional Staff',
    description: 'Our team consists of highly trained and vetted professionals.',
    icon: UserGroupIcon,
  },
  {
    name: 'Secure Booking',
    description: 'Your data is protected with bank-level security measures.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Quality Service',
    description: 'We guarantee satisfaction with every service we provide.',
    icon: SparklesIcon,
  },
  {
    name: 'Competitive Pricing',
    description: 'Get the best value for your money with our transparent pricing.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Easy Scheduling',
    description: 'Flexible booking system that works around your schedule.',
    icon: CalendarIcon,
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            Why Choose Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for quality service
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We provide comprehensive solutions with a focus on quality, reliability, and customer satisfaction.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection; 
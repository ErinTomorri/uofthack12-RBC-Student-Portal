'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ArrowRightIcon,
  BoltIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  CheckIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  CakeIcon,
  QrCodeIcon,
  PhoneIcon,
  StarIcon,
  ArrowDownTrayIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Active Students',
    value: '10,000+',
    description: '+25% this semester',
    icon: UserGroupIcon,
  },
  {
    name: 'Total Transactions',
    value: '$1B+',
    description: '+40% this quarter',
    icon: BoltIcon,
  },
  {
    name: 'Universities Supported',
    value: '11,000+',
    description: 'Across 100+ countries',
    icon: BuildingLibraryIcon,
  },
  {
    name: 'Student Satisfaction',
    value: '98%',
    description: 'Based on 5K+ reviews',
    icon: SparklesIcon,
  },
];

const features = [
  {
    name: 'No Monthly Fee Banking',
    description: 'Free everyday banking for students with unlimited transactions.',
    icon: CreditCardIcon,
  },
  {
    name: 'Student Line of Credit',
    description: 'Flexible financing options for your education needs.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Advanced Security',
    description: 'Bank securely with 2-factor authentication and real-time alerts.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Financial Insights',
    description: 'Track your spending and get personalized financial advice.',
    icon: ChartBarIcon,
  },
];

const testimonials = [
  {
    content: "RBC's student banking platform has made managing my finances so much easier. The no-fee account is perfect for students!",
    author: "Sarah Chen",
    role: "Computer Science Student",
    university: "University of Toronto"
  },
  {
    content: "The budgeting tools and spending insights have helped me stay on track with my finances throughout the semester.",
    author: "Michael Patel",
    role: "Engineering Student",
    university: "University of Waterloo"
  },
  {
    content: "Getting student loans and managing my education expenses has never been easier. Great customer service too!",
    author: "Emma Wilson",
    role: "Medical Student",
    university: "McGill University"
  }
];

const integrations = [
  { 
    name: 'Shopify', 
    icon: ShoppingBagIcon,
    color: 'from-green-500 to-green-600'
  },
  { 
    name: 'Amazon', 
    icon: BuildingStorefrontIcon,
    color: 'from-orange-500 to-orange-600'
  },
  { 
    name: 'Uber', 
    icon: TruckIcon,
    color: 'from-gray-700 to-gray-800'
  },
  { 
    name: 'DoorDash', 
    icon: TruckIcon,
    color: 'from-red-500 to-red-600'
  },
  { 
    name: 'Skip The Dishes', 
    icon: TruckIcon,
    color: 'from-orange-500 to-red-500'
  },
  { 
    name: 'Tim Hortons', 
    icon: CakeIcon,
    color: 'from-red-600 to-red-700'
  },
];

const pricingTiers = [
  {
    name: 'Student Basic',
    price: '0',
    description: 'Perfect for students starting their financial journey',
    features: [
      'No monthly fee',
      'Unlimited transactions',
      'Mobile banking',
      'Student rewards program',
      'Basic financial insights',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Student Plus',
    price: '4.95',
    description: 'Enhanced features for growing financial needs',
    features: [
      'All Basic features',
      'Advanced analytics',
      'Investment options',
      'Premium rewards',
      'Priority support',
      'International transfers',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Student Pro',
    price: '9.95',
    description: 'Comprehensive banking for power users',
    features: [
      'All Plus features',
      'Dedicated advisor',
      'Custom financial planning',
      'Travel insurance',
      'Extended overdraft',
      'Family accounts',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const additionalFeatures = [
  {
    name: 'Mobile Banking',
    description: 'Bank on the go with our award-winning mobile app',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'Global Access',
    description: 'Use your card worldwide with no foreign transaction fees',
    icon: GlobeAltIcon,
  },
  {
    name: '24/7 Support',
    description: 'Get help anytime with our dedicated student support team',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Instant Transfers',
    description: 'Send and receive money in real-time with e-Transfer',
    icon: BoltIcon,
  },
  {
    name: 'Flexible Hours',
    description: 'Extended branch hours for student schedules',
    icon: ClockIcon,
  },
  {
    name: 'Student Discounts',
    description: 'Exclusive discounts at popular retailers',
    icon: CurrencyDollarIcon,
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const appStats = [
  {
    name: 'App Rating',
    value: '4.9/5',
    icon: StarIcon,
  },
  {
    name: 'Active Users',
    value: '500K+',
    icon: UserGroupIcon,
  },
  {
    name: 'Downloads',
    value: '1M+',
    icon: ArrowDownTrayIcon,
  },
  {
    name: 'Reviews',
    value: '50K+',
    icon: ChatBubbleOvalLeftIcon,
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#0A1628] relative">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0A1628]" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#003168] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#00A6FF] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#FEDF01] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="fixed w-full bg-[#0A1628]/80 backdrop-blur-md z-50 border-b border-gray-800">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
                <span className="text-[#FEDF01] bg-[#003168] px-2 py-1 rounded">RBC</span>
                <span className="text-white">Student Banking</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-300 hover:text-white">Features</Link>
              <Link href="/testimonials" className="text-gray-300 hover:text-white">Testimonials</Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white">Pricing</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-[#00A6FF] to-[#00D1FF] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Enhanced Hero Section */}
      <div className="relative pt-16 overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16"
        >
          <motion.div
            variants={fadeIn}
            className="mx-auto max-w-3xl text-center relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <div className="w-40 h-40 bg-gradient-to-r from-[#00A6FF] to-[#00D1FF] rounded-full filter blur-3xl opacity-20 animate-pulse" />
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center rounded-full bg-gradient-to-r from-[#003168]/20 to-[#00A6FF]/20 px-3 py-1 text-sm leading-6 text-[#00A6FF] ring-1 ring-[#003168]/20 hover:ring-[#003168]/30 transition-all duration-200 backdrop-blur-sm"
            >
              <span className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A6FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A6FF]"></span>
                </span>
                <span>Introducing RBC Student Banking 2.0</span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl font-bold tracking-tight text-white sm:text-7xl bg-clip-text"
            >
              Transform Your{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FF] to-[#00D1FF]">
                  Financial Future
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#00A6FF] to-[#00D1FF] rounded-full transform scale-x-0 animate-expandWidth" />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mt-6 text-lg leading-8 text-gray-300 relative z-10"
            >
              Connect your accounts, analyze your spending, and make better financial decisions with our modern student banking platform.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A6FF]"
              >
                <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-br from-[#00A6FF] to-[#00D1FF]"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-gradient-to-br from-[#00A6FF] to-[#00D1FF] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span className="relative">Get Started Free</span>
              </Link>

              <Link
                href="/learn-more"
                className="group flex items-center text-gray-300 font-semibold hover:text-white transition-colors duration-200"
              >
                Learn more
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex justify-center gap-x-8"
          >
            {[
              { icon: ShieldCheckIcon, text: 'Bank-grade security' },
              { icon: BoltIcon, text: 'Real-time updates' },
              { icon: UserGroupIcon, text: 'Team collaboration' }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-gray-400 bg-gradient-to-r from-[#111927]/50 to-[#111927]/30 px-4 py-2 rounded-lg backdrop-blur-sm ring-1 ring-white/10"
              >
                <item.icon className="h-5 w-5 text-[#00A6FF]" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Stats Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="border-y border-gray-800 bg-gradient-to-b from-[#0A1628]/50 to-[#111927]/50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                className="group bg-[#111927] rounded-2xl p-8 ring-1 ring-gray-800/10 hover:ring-[#00A6FF]/20 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00A6FF]/0 via-[#00A6FF]/5 to-[#00A6FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="relative">
                  <div className="flex items-center gap-x-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#003168] to-[#00A6FF]/20">
                      <stat.icon className="h-8 w-8 text-[#00A6FF]" />
                    </div>
                    <div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-3xl font-bold text-white"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-gray-400">{stat.name}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-[#00A6FF] flex items-center">
                    <span>{stat.description}</span>
                    <div className="ml-2 w-12 h-1 bg-gradient-to-r from-[#00A6FF] to-transparent rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Integration Logos */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-16 border-b border-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#111927]/30 backdrop-blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <motion.h2
            variants={fadeIn}
            className="text-center text-lg font-semibold leading-8 text-gray-300"
          >
            Integrated with your favorite student services
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="mx-auto mt-10 grid max-w-lg grid-cols-3 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6"
          >
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                variants={fadeIn}
                whileHover={{ scale: 1.1 }}
                className="relative group"
              >
                <div className={`flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br ${integration.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                  <integration.icon className="h-8 w-8 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <span className="mt-2 text-xs text-gray-400 group-hover:text-white text-center transition-colors duration-300">
                    {integration.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Additional Features Grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Designed specifically for students, our banking solutions help you focus on what matters most - your education.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="bg-[#111927] rounded-2xl p-8 ring-1 ring-gray-800/10 hover:ring-gray-800/30 transition-all duration-200"
                >
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-white">
                    <feature.icon className="h-6 w-6 text-[#00A6FF]" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-gray-300">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              More Than Just Banking
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Discover all the ways RBC Student Banking helps you succeed
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {additionalFeatures.map((feature) => (
                <div
                  key={feature.name}
                  className="bg-[#111927] rounded-2xl p-8 ring-1 ring-gray-800/10 hover:ring-gray-800/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-x-3">
                    <feature.icon className="h-8 w-8 text-[#00A6FF]" />
                    <h3 className="text-lg font-semibold leading-7 text-white">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 sm:py-32 bg-[#111927]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Choose the plan that best fits your banking needs
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col justify-between rounded-2xl p-8 ring-1 ${
                  tier.highlighted
                    ? 'bg-[#003168] ring-[#00A6FF]'
                    : 'bg-[#0A1628] ring-gray-800/10 hover:ring-gray-800/30'
                } transition-all duration-200`}
              >
                <div>
                  <h3 className="text-lg font-semibold leading-8 text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-gray-300">
                    {tier.description}
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-white">${tier.price}</span>
                    <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-[#00A6FF]" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={tier.highlighted ? '/register' : '#'}
                  className={`mt-8 block rounded-lg px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-[#00A6FF] to-[#00D1FF] text-white hover:opacity-90'
                      : 'bg-[#111927] text-white hover:bg-[#1a2537]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile App Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Bank Anywhere, Anytime
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Download our mobile app and take control of your finances on the go. Available for iOS and Android.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link 
                    href="#" 
                    className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-200"
                  >
                    <QrCodeIcon className="h-8 w-8" />
                    <div className="flex flex-col">
                      <span className="text-xs">Download on the</span>
                      <span className="text-lg font-semibold">App Store</span>
                    </div>
                  </Link>
                  <Link 
                    href="#" 
                    className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-200"
                  >
                    <PhoneIcon className="h-8 w-8" />
                    <div className="flex flex-col">
                      <span className="text-xs">Get it on</span>
                      <span className="text-lg font-semibold">Google Play</span>
                    </div>
                  </Link>
                </div>
                <dl className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                  {appStats.map((stat) => (
                    <div key={stat.name} className="relative overflow-hidden rounded-lg bg-[#111927] p-4 group hover:bg-[#1a2537] transition-colors duration-200">
                      <dt className="text-sm leading-6 text-gray-300 flex items-center gap-2">
                        <stat.icon className="h-5 w-5 text-[#00A6FF]" />
                        {stat.name}
                      </dt>
                      <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-white">
                        {stat.value}
                      </dd>
                      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#00A6FF] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  ))}
                </dl>
              </div>
              <div className="relative">
                <div className="relative z-10 rounded-2xl bg-[#111927] p-8 shadow-2xl ring-1 ring-white/10">
                  <DevicePhoneMobileIcon className="absolute -top-4 -right-4 h-16 w-16 text-[#00A6FF] opacity-20" />
                  <div className="space-y-4">
                    <div className="h-2 w-8 rounded-full bg-[#00A6FF]" />
                    <div className="h-2 w-16 rounded-full bg-gray-700" />
                    <div className="h-2 w-12 rounded-full bg-gray-700" />
                    <div className="mt-8 space-y-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-[#003168]" />
                          <div className="flex-1 space-y-2">
                            <div className="h-2 w-3/4 rounded-full bg-gray-700" />
                            <div className="h-2 w-1/2 rounded-full bg-gray-700" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-[#00A6FF] to-[#00D1FF] rounded-2xl blur-2xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 sm:py-32 bg-[#111927]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What Students Are Saying
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col bg-[#0A1628] p-8 shadow-lg rounded-2xl ring-1 ring-gray-800/10 hover:ring-gray-800/30 transition-all duration-200"
              >
                <blockquote className="flex-1 text-lg leading-8 text-gray-300">
                  "{testimonial.content}"
                </blockquote>
                <div className="mt-6 border-t border-gray-800 pt-4">
                  <div className="text-base font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-[#00A6FF]">{testimonial.role}</div>
                  <div className="text-sm text-gray-400">{testimonial.university}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
            <div className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#003168] to-[#004C9B] opacity-30"></div>
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join thousands of students who trust RBC for their banking needs. Open an account in minutes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="bg-gradient-to-r from-[#00A6FF] to-[#00D1FF] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 text-lg font-semibold"
              >
                Get Started Free
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 font-semibold hover:text-white"
              >
                Contact Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A1628] border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gray-300">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-gray-300">
              Contact
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-400">
              &copy; 2024 RBC Royal Bank of Canada. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes expandWidth {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-expandWidth {
          animation: expandWidth 1s ease-out forwards;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}

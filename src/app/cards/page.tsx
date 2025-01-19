'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { CreditCardIcon, PlusIcon, ShieldCheckIcon, DocumentTextIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const cards = [
  {
    id: 1,
    name: 'Student No Fee Banking',
    number: '**** **** **** 1234',
    expiry: '12/25',
    type: 'Visa Debit',
    color: 'bg-gradient-to-r from-[#003168] to-[#004C9B]',
    benefits: ['No Monthly Fee', 'Unlimited Transactions', 'Student Rewards'],
  },
  {
    id: 2,
    name: 'Student Cash Back Card',
    number: '**** **** **** 5678',
    expiry: '09/24',
    type: 'RBC Rewards+',
    color: 'bg-gradient-to-r from-[#DA291C] to-red-500',
    benefits: ['2% Cash Back on Books', '1% on Everything', 'No Annual Fee'],
  },
];

const quickActions = [
  {
    name: 'View Statements',
    description: 'Access your monthly statements',
    icon: DocumentTextIcon,
    href: '#',
  },
  {
    name: 'Security Settings',
    description: 'Manage card security and limits',
    icon: ShieldCheckIcon,
    href: '#',
  },
  {
    name: 'Report Issue',
    description: 'Report lost or stolen card',
    icon: ExclamationTriangleIcon,
    href: '#',
  },
];

export default function CardsPage() {
  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-[#003168] to-[#004C9B] rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Your Cards</h2>
        <p className="text-gray-200">Manage your RBC student banking cards and rewards.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative group"
          >
            <div
              className={`${card.color} rounded-2xl p-8 text-white shadow-lg group-hover:shadow-xl transition-all duration-200`}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-1">{card.name}</h3>
                  <p className="text-sm opacity-90">{card.type}</p>
                </div>
                <CreditCardIcon className="h-8 w-8" />
              </div>
              <div className="space-y-6">
                <p className="text-2xl tracking-widest font-mono">{card.number}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm opacity-80">Valid Thru</p>
                    <p className="font-medium">{card.expiry}</p>
                  </div>
                  <img
                    src="/rbc-logo-white.png"
                    alt="RBC Logo"
                    className="h-8 opacity-50"
                  />
                </div>
              </div>
            </div>
            {/* Card Benefits */}
            <div className="mt-4 space-y-2">
              {card.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#003168] mr-2"></div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add New Card Button */}
        <button className="rounded-2xl p-8 text-center border-2 border-dashed border-gray-300 hover:border-[#003168] group transition-colors duration-200">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-full bg-gray-100 group-hover:bg-blue-50 transition-colors duration-200">
              <PlusIcon className="h-8 w-8 text-gray-400 group-hover:text-[#003168]" />
            </div>
            <span className="text-sm font-medium text-gray-900">Add New Card</span>
            <span className="text-sm text-gray-500">Apply for a new credit card</span>
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-[#003168] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <a
              key={action.name}
              href={action.href}
              className="flex items-center p-4 rounded-xl border border-gray-200 hover:border-[#003168] hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-[#003168] transition-colors duration-200">
                <action.icon className="h-6 w-6 text-[#003168] group-hover:text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{action.name}</p>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#003168] mb-2">Special Student Offer</h3>
            <p className="text-gray-600 mb-4">Get 10% extra cash back on textbook purchases with your RBC Student Card</p>
            <button className="bg-[#003168] text-white px-4 py-2 rounded-lg hover:bg-[#004C9B] transition-colors duration-200">
              Learn More
            </button>
          </div>
          <div className="hidden md:block">
            <img
              src="/student-card-promo.png"
              alt="Student Card Promotion"
              className="h-24 w-auto"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
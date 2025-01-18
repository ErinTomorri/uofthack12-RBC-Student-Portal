'use client';

import { Analytics } from '../../components/Analytics';
import { NotificationList } from '../../components/Notification';
import { TransactionForm } from '../../components/TransactionForm';
import { TransactionHistory } from '../../components/TransactionHistory';
import { DashboardLayout } from '../../components/DashboardLayout';
import Link from 'next/link';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CreditCardIcon,
  BanknotesIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline';

const quickActions = [
  {
    name: 'New Deposit',
    description: 'Add money to your account',
    icon: ArrowUpIcon,
    color: 'bg-gradient-to-br from-green-600 to-green-500',
    onClick: () => {
      const element = document.querySelector('#transaction-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
  {
    name: 'New Withdrawal',
    description: 'Withdraw from your account',
    icon: ArrowDownIcon,
    color: 'bg-gradient-to-br from-[#DA291C] to-red-500',
    onClick: () => {
      const element = document.querySelector('#transaction-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
  {
    name: 'Transfer Money',
    description: 'Send money to others',
    icon: BanknotesIcon,
    color: 'bg-gradient-to-br from-[#003168] to-[#004C9B]',
    href: '/cards',
  },
  {
    name: 'Manage Cards',
    description: 'View and manage your cards',
    icon: CreditCardIcon,
    color: 'bg-gradient-to-br from-purple-600 to-purple-500',
    href: '/cards',
  },
];

const studentServices = [
  {
    name: 'Student Line of Credit',
    description: 'Flexible financing for your education',
    icon: AcademicCapIcon,
    href: '#',
  },
  {
    name: 'Student Resources',
    description: 'Financial guides and tips',
    icon: BookOpenIcon,
    href: '#',
  },
  {
    name: 'Loan Calculator',
    description: 'Plan your student finances',
    icon: CalculatorIcon,
    href: '#',
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-[#003168] to-[#004C9B] rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-gray-200">Manage your student finances with ease.</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#003168] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const ActionComponent = action.href ? Link : 'button';
            return (
              <ActionComponent
                key={action.name}
                href={action.href as string}
                onClick={action.onClick}
                className="relative flex items-center space-x-3 rounded-xl border-0 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}>
                  <action.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-semibold text-gray-900">{action.name}</p>
                  <p className="truncate text-sm text-gray-500">{action.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </ActionComponent>
            );
          })}
        </div>
      </div>

      {/* Student Services */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#003168] mb-4">Student Services</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {studentServices.map((service) => (
            <Link
              key={service.name}
              href={service.href}
              className="group relative rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#003168] group-hover:bg-[#004C9B] transition-colors duration-200">
                  <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-[#003168] mb-4">Financial Overview</h2>
        <Analytics />
      </div>

      {/* Transaction Form and History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div id="transaction-form" className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#003168] mb-4">New Transaction</h2>
          <TransactionForm />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#003168] mb-4">Recent Transactions</h2>
          <TransactionHistory />
        </div>
      </div>

      {/* Notifications */}
      <div className="mt-8">
        <NotificationList />
      </div>
    </DashboardLayout>
  );
} 
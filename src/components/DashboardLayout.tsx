'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  HomeIcon,
  ChartBarIcon,
  CreditCardIcon,
  UserIcon,
  Cog6ToothIcon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useBankStore } from '../lib/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Cards', href: '/cards', icon: CreditCardIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { balance } = useBankStore();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[#003168]">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex flex-shrink-0 items-center px-4">
                    <Link href="/" className="text-2xl font-bold text-white flex items-center space-x-2">
                      <span className="text-[#FEDF01]">RBC</span>
                      <span>Student Banking</span>
                    </Link>
                  </div>
                  <nav className="mt-8 space-y-1 px-2">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            isActive
                              ? 'bg-[#004C9B] text-white'
                              : 'text-gray-100 hover:bg-[#004C9B] hover:text-white',
                            'group flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition duration-150'
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon
                            className={classNames(
                              isActive ? 'text-white' : 'text-gray-300',
                              'mr-4 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                <div className="flex flex-shrink-0 border-t border-[#004C9B] p-4">
                  <Link href="/profile" className="group block w-full flex-shrink-0">
                    <div className="flex items-center">
                      <div>
                        <div className="inline-block h-9 w-9 rounded-full bg-[#004C9B] overflow-hidden">
                          <div className="h-full w-full flex items-center justify-center bg-[#004C9B] text-white font-medium">
                            JD
                          </div>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">John Doe</p>
                        <p className="text-xs font-medium text-gray-300">Student Advantage</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-[#003168]">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Link href="/" className="text-2xl font-bold text-white flex items-center space-x-2">
                <span className="text-[#FEDF01]">RBC</span>
                <span>Student Banking</span>
              </Link>
            </div>
            <nav className="mt-8 flex-1 space-y-1 bg-[#003168] px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isActive
                        ? 'bg-[#004C9B] text-white'
                        : 'text-gray-100 hover:bg-[#004C9B] hover:text-white',
                      'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition duration-150'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        isActive ? 'text-white' : 'text-gray-300',
                        'mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          {/* Profile section */}
          <div className="flex flex-shrink-0 border-t border-[#004C9B] p-4">
            <Link href="/profile" className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <div className="inline-block h-9 w-9 rounded-full bg-[#004C9B] overflow-hidden">
                    <div className="h-full w-full flex items-center justify-center bg-[#004C9B] text-white font-medium">
                      JD
                    </div>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs font-medium text-gray-300">Student Advantage</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#003168]"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-[#003168]">
              {navigation.find((item) => item.href === pathname)?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="text-gray-400 hover:text-gray-500 relative">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#DA291C] flex items-center justify-center">
                  <span className="text-xs text-white">3</span>
                </span>
              </button>
              {/* Balance */}
              <div className="flex items-center bg-[#003168] px-4 py-2 rounded-lg text-white">
                <span className="text-sm font-medium">Balance:</span>
                <span className="ml-2 text-sm font-bold">
                  ${balance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 
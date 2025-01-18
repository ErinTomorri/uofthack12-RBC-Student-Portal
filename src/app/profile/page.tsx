'use client';

import { DashboardLayout } from '../../components/DashboardLayout';
import { CameraIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg border border-gray-200 hover:bg-gray-50">
                <CameraIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-sm text-gray-500">Premium Account Member since 2023</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                defaultValue="John"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                defaultValue="Doe"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <hr className="my-6" />

          <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive updates about your account activity</p>
              </div>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300">
                Manage
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
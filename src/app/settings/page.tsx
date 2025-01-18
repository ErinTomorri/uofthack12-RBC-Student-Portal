'use client';

import { DashboardLayout } from '../../components/DashboardLayout';
import { Switch } from '@headlessui/react';
import { useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    privacy: {
      shareData: false,
      showBalance: true,
    },
    security: {
      twoFactor: true,
      biometric: false,
    },
  });

  const updateSetting = (category: keyof typeof settings, setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Notifications Settings */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onChange={(value) => updateSetting('notifications', 'email', value)}
                className={classNames(
                  settings.notifications.email ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out'
                )}
              >
                <span className="sr-only">Enable email notifications</span>
                <span
                  className={classNames(
                    settings.notifications.email ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications on your device</p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onChange={(value) => updateSetting('notifications', 'push', value)}
                className={classNames(
                  settings.notifications.push ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out'
                )}
              >
                <span className="sr-only">Enable push notifications</span>
                <span
                  className={classNames(
                    settings.notifications.push ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                <p className="text-sm text-gray-500">Receive text message alerts</p>
              </div>
              <Switch
                checked={settings.notifications.sms}
                onChange={(value) => updateSetting('notifications', 'sms', value)}
                className={classNames(
                  settings.notifications.sms ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out'
                )}
              >
                <span className="sr-only">Enable SMS notifications</span>
                <span
                  className={classNames(
                    settings.notifications.sms ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Share Usage Data</h3>
                <p className="text-sm text-gray-500">Help us improve our services</p>
              </div>
              <Switch
                checked={settings.privacy.shareData}
                onChange={(value) => updateSetting('privacy', 'shareData', value)}
                className={classNames(
                  settings.privacy.shareData ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out'
                )}
              >
                <span className="sr-only">Enable data sharing</span>
                <span
                  className={classNames(
                    settings.privacy.shareData ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Show Balance</h3>
                <p className="text-sm text-gray-500">Display balance in header</p>
              </div>
              <Switch
                checked={settings.privacy.showBalance}
                onChange={(value) => updateSetting('privacy', 'showBalance', value)}
                className={classNames(
                  settings.privacy.showBalance ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out'
                )}
              >
                <span className="sr-only">Show balance</span>
                <span
                  className={classNames(
                    settings.privacy.showBalance ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500">Additional security for your account</p>
              </div>
              <Switch
                checked={settings.security.twoFactor}
                onChange={(value) => updateSetting('security', 'twoFactor', value)}
                className={classNames(
                  settings.security.twoFactor ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out'
                )}
              >
                <span className="sr-only">Enable two-factor authentication</span>
                <span
                  className={classNames(
                    settings.security.twoFactor ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Biometric Login</h3>
                <p className="text-sm text-gray-500">Use fingerprint or face recognition</p>
              </div>
              <Switch
                checked={settings.security.biometric}
                onChange={(value) => updateSetting('security', 'biometric', value)}
                className={classNames(
                  settings.security.biometric ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out'
                )}
              >
                <span className="sr-only">Enable biometric login</span>
                <span
                  className={classNames(
                    settings.security.biometric ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
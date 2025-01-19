'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Analytics } from '@/components/Analytics';
import { NotificationList } from '@/components/NotificationList';
import { TransactionHistory } from '@/components/TransactionHistory';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Analytics */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
              <Analytics />
            </div>
          </div>

          {/* Right Column - Notifications and Transaction History */}
          <div className="space-y-8">
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
              <NotificationList />
            </div>
            
            {/* Transaction History */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
              <TransactionHistory />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
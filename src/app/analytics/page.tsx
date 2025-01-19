'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Analytics as AnalyticsComponent } from '@/components/Analytics';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <AnalyticsComponent />
      </div>
    </DashboardLayout>
  );
} 
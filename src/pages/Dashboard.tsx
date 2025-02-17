
import React from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { ImageUploader } from '@/components/ImageUploader';
import { ScenarioInput } from '@/components/ScenarioInput';

const Dashboard = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <DashboardSidebar />
      <main className="p-4 sm:p-6 lg:p-8 pt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
            <h1 className="text-2xl font-semibold text-fashion-text mb-6">
              AI Fashion Advisor
            </h1>
            <div className="space-y-6">
              <ImageUploader />
              <ScenarioInput />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

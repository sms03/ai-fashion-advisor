
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import ImageUploader from '@/components/ImageUploader';
import ScenarioInput from '@/components/ScenarioInput';
import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';
import { Footer } from '@/components/shared/Footer';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <DashboardSidebar />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4"
        onClick={() => navigate('/profile')}
      >
        <UserRound className="h-6 w-6" />
      </Button>
      <main className="p-4 sm:p-6 lg:p-8 pt-20 flex-grow">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 dark:bg-black/20">
            <h1 className="text-2xl font-semibold text-fashion-text mb-6 font-playfair dark:text-[#F2FCE2]">
              AI Fashion Advisor
            </h1>
            <div className="space-y-6">
              <ImageUploader onImageSelect={(file) => console.log(file)} />
              <ScenarioInput onScenarioSubmit={(scenario) => console.log(scenario)} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

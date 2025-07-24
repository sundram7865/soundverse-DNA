import React from 'react';
import Step1Upload from './components/Step1Upload';
import Step2Sensitivity from './components/Step2Sensitivity';
import Step3Profile from './components/Step3Profile';
import Step4Tags from './components/Step4Tags';

const CreateDNAPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold text-white">Build Your DNA</h1>
      
      <div className="space-y-8">
        <Step1Upload />
        <Step2Sensitivity />
        <Step3Profile />
        <Step4Tags />
      </div>

      <div className="flex justify-end pt-8 border-t border-gray-800">
        <button className="px-6 py-3 bg-soundverse-purple rounded-full hover:bg-purple-700 transition-colors font-medium">
          Publish DNA
        </button>
      </div>
    </div>
  );
};

export default CreateDNAPage;
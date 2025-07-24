'use client'
import React, { useState } from 'react'

const Step2Sensitivity = () => {
  const [sensitivity, setSensitivity] = useState<'low' | 'medium' | 'high'>('medium')

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Step 2: DNA Sensitivity</h2>
      
      <div className="space-y-6">
        <p className="text-gray-300">
          Set the level of sensitivity for DNA creation. Higher sensitivity captures more audio details.
        </p>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Low Sensitivity</span>
          <span className="text-sm text-gray-400">High Sensitivity</span>
        </div>

        <div className="relative pt-1">
          <input
            type="range"
            min="0"
            max="2"
            value={sensitivity === 'low' ? 0 : sensitivity === 'medium' ? 1 : 2}
            onChange={(e) => {
              const val = parseInt(e.target.value)
              setSensitivity(val === 0 ? 'low' : val === 1 ? 'medium' : 'high')
            }}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs px-2 pt-2 text-gray-400">
            <span>Generic</span>
            <span>Balanced</span>
            <span>Niche</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-medium mb-2">
            {sensitivity === 'low' ? 'Generic Genre DNA' : 
             sensitivity === 'medium' ? 'Balanced DNA Profile' : 
             'Niche Genre DNA'}
          </h3>
          <p className="text-sm text-gray-300">
            {sensitivity === 'low' ? 
             'Captures broad genre characteristics for wider use' : 
             sensitivity === 'medium' ? 
             'Balanced detail level suitable for most creators' : 
             'Highly detailed capture for specific sub-genres'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Step2Sensitivity
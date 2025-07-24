'use client'

import { useState } from 'react'

export default function Step2DnaSensitivity() {
  const [sensitivity, setSensitivity] = useState(5) // Step 1 to 10

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSensitivity(Number(e.target.value))
  }

  return (
    <section className="px-6 md:px-12 py-6" id="step-2">
      <h2 className="text-white text-sm mb-2">Step 2</h2>
      <h1 className="text-white text-2xl font-semibold mb-6" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>DNA Sensitivity</h1>

      <div className="rounded-2xl bg-[#1A1A1A] p-8 md:p-12 border border-[#2A2A2A] max-w-3xl text-white">
        <h2 className="text-xl md:text-2xl font-medium mb-2" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>
          Set the level of sensitivity for the DNA creation
        </h2>
        <p className="text-gray-400 text-sm mb-10">
          Less sensitivity will result in less number of DNAs, higher sensitivity will result in many niche DNAs.
        </p>

        {/* Slider */}
        <div className="relative mb-6">
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={sensitivity}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-full appearance-none bg-gray-700 accent-white"
          />
          <div className="flex justify-between text-xs mt-2 text-gray-300">
            <div className="text-left">
              <p>Least Sensitive</p>
              <p className="text-gray-500 text-[11px]">(Generic Genre DNAs)</p>
            </div>
            <div className="text-center">
              <p>Recommended</p>
              <p className="text-gray-500 text-[11px]">(Step 5)</p>
            </div>
            <div className="text-right">
              <p>Highly Sensitive</p>
              <p className="text-gray-500 text-[11px]">(Niche Genre DNAs)</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 justify-center mt-8 flex-wrap">
          <button
            className="bg-[#007D49] hover:bg-[green-800] transition px-6 py-2 rounded-full font-medium text-white text-sm cursor-pointer"
            onClick={() => console.log('Sensitivity level:', sensitivity)}
          >
            Set Sensitivity
          </button>
          <button
            className="text-white text-sm hover:underline"
            onClick={() => console.log('Skipped')}
          >
            Skip
          </button>
        </div>
      </div>
    </section>
  )
}

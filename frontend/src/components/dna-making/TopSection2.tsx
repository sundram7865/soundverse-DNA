'use client'

import Image from 'next/image'
import { useState } from 'react'

type TopSection2Props = {
    onStepClick: (step: number) => void
}

const steps = [
    'Step 1: Upload Audio',
    'Step 2: DNA Sensitivity',
    'Step 3: Profile Creation',
    'Step 4: Tagging and Categorization',
    'Publish',
]

export default function TopSection2({ onStepClick }: TopSection2Props) {
    const [activeStep, setActiveStep] = useState(1)
    return (
        <div className="relative flex flex-col justify-between px-10 sm:px-20 py-5 sm:py-9 sticky top-0 z-10" style={{
            backgroundImage: 'linear-gradient(to left, #121212 5%, #1E2B3A 95%, #232323 100%)',
        }}>
            {/* Avatar at top right */}
            <div className="absolute top-6 right-10 md:top-8 md:right-20 z-10">
                <Image
                    src="/images/avatar.png"
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="rounded-full shadow-lg"
                />
            </div>
            <div>
                <h1 className="text-2xl md:text-4xl font-light font-grotesk" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>
                    Build DNA by Uploading Audio Tracks
                </h1>
                <p className="mt-4 text-gray-400 text-sm md:text-base">
                    You can upload your music, and build your DNA.
                </p>
            </div>
            <div className="flex gap-4 mt-4 flex-wrap">
                {steps.map((step, idx) => {
                    const isActive = idx + 1 === activeStep
                    return (
                        <button
                            key={step}
                            onClick={() => {
                                setActiveStep(idx + 1)
                                onStepClick(idx + 1)
                            }}
                            className={`px-6 py-2 rounded-full text-sm transition-all duration-200 ${isActive
                                    ? 'bg-[#007D49] text-white'
                                    : 'bg-[#1A1A1A] text-gray-300 shadow-md'
                                }`}
                        >
                            {step}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

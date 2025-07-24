'use client'

import { motion } from 'framer-motion'

export default function Step4Tagging() {
  return (
    <section className="px-6 md:px-12 py-6 text-white" id="step-4">
      <h2 className="text-sm mb-2 text-gray-400">Step 4</h2>
      <h1 className="text-2xl font-semibold mb-12" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>Tagging and Categorization</h1>

      <div className="flex flex-col items-center justify-center">
        {/* Animated Glow + Circle */}
        <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]">
          {/* Glow Background */}
          <div className="absolute inset-0 rounded-full bg-[#9164FF] blur-3xl opacity-3 animate-pulse" />

          {/* Animated SVG Ring */}
          <motion.img
            src="/icons/building-ring.svg"
            alt="Loading Ring"
            className="absolute inset-0 w-full h-full object-contain z-5"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
          />

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 font-bold text-center leading-tight z-7" style={{ fontFamily: 'Power Grotesk', fontWeight: 'bold' }}>
            <span className="block text-2xl sm:text-5xl tracking-tight leading-none m-0">WE’RE</span>
            <span className="block text-2xl sm:text-5xl tracking-tight leading-none m-0">BUILDING</span>
            <span className="block text-2xl sm:text-5xl tracking-tight leading-none m-0">YOUR</span>
            <span className="block text-2xl sm:text-5xl font-bold tracking-tight leading-none m-0">DNA</span>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-xs text-gray-400 max-w-sm text-center">
          YOUR DNA WILL BE READY IN A FEW MINUTES. WE’LL INFORM YOU ONCE IT’S READY. YOU CAN USE THE STUDIO MEANWHILE.
        </p>
      </div>
    </section>
  )
}

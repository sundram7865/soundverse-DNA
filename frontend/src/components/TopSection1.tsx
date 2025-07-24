'use client'

import Image from 'next/image'

export default function TopSection() {
    return (
        <div className="relative flex flex-1 items-center justify-between px-10 sm:px-20 py-10 sm:py-15 sticky top-0 z-10" style={{
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
                    BUILD <span className="font-bold font-grotesk   " style={{ fontFamily: 'Power Grotesk', fontWeight: 'bold' }}>DNA</span>
                </h1>
                <p className="mt-4 text-gray-400 text-sm md:text-base">
                    Build a DNA on Soundverse and earn passive income as your DNA is used by other creators.&nbsp;
                    <a href="#" className="underline hover:text-gray-200 transition">Learn more</a>.
                </p>
            </div>

        </div>
    )
}

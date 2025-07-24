'use client'

import Image from 'next/image'
import { useState } from 'react'

const navItems = [
  { src: '/icons/plus.svg', alt: 'Add', label: 'Add' },
  { src: '/icons/home.svg', alt: 'Home', label: 'Home' },
  { src: '/icons/search.svg', alt: 'Search', label: 'Search' },
  { src: '/icons/library.svg', alt: 'Library', label: 'Library' },
]

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-30 flex flex-col items-center py-6 px-2 bg-black min-h-screen">
      {/* Logo */}
      <Image src="/images/logo.svg" alt="Logo" width={32} height={32} />

      {/* Navigation */}
      <div className="flex flex-col gap-8 mt-8">
        {navItems.map((item, idx) => (
          <SidebarIcon key={idx} src={item.src} alt={item.alt} label={item.label} />
        ))}
        <button className="bg-[#121212] text-white text-xs font-bold px-2 py-2 rounded-xl hover:bg-gray-700 transition mt-auto mb-4" onClick={() => window.location.href = "/"}>
          DNA
        </button>
      </div>
    </aside>
  )
}

function SidebarIcon({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Image src={src} alt={alt} width={20} height={20} className="hover:opacity-80 transition" />

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-10 bg-gray-800 text-white text-xs rounded px-2 py-1">
          {label}
        </div>
      )}
    </div>
  )
}

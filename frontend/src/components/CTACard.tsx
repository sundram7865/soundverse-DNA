'use client'

import Link from 'next/link'

export default function CTACard({
  title,
  description,
  buttons,
  listItems = [],
}: {
  title: string
  description: string
  buttons: { label: string; href: string; variant: 'primary' | 'secondary' }[]
  listItems?: string[]
}) {
  return (
    <div className="bg-[#121212] rounded-xl p-6 md:p-8 border border-[#2A2A2A] text-white">
      <h2 className="text-lg md:text-xl font-semibold mb-2" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>

      {listItems.length > 0 && (
        <ul className="text-gray-400 mb-4 list-disc ml-5 space-y-1">
          {listItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}

      <div className="flex gap-4 flex-wrap">
        {buttons.map((btn, i) => (
          <Link
            key={i}
            href={btn.href}
            className={`px-5 py-2 rounded-full font-medium ${
              btn.variant === 'primary'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-[#2A2A2A] hover:bg-[#3A3A3A]'
            } transition`}
          >
            {btn.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

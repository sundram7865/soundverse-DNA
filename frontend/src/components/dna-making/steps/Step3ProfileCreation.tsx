'use client'
import Image from 'next/image'
import { useState } from 'react'

const addIcon = {src: '/icons/add.svg', alt: 'Add', width: 45, height: 45}

export default function Step3ProfileCreation() {
  const [creatorName, setCreatorName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const [form, setForm] = useState({
    visibility: 'Public',
    price: '$9.99',
    license: 'Distribution',
    tracks: 'Visible',
    partner: 'Yes',
  })

  const handleTagAdd = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImage(file)
  }

  const handleDone = () => {
    console.log({ creatorName, description, tags, ...form, image })
  }

  return (
    <section className="px-6 md:px-12 py-6" id="step-3">
      <h2 className="text-white text-sm mb-2">Step 3</h2>
      <h1 className="text-white text-2xl font-semibold mb-6" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>Profile Creation</h1>
      <div className="rounded-2xl bg-[#1A1A1A] p-6 md:p-10 border border-[#2A2A2A] text-white max-w-7xl flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row gap-10">
          {/* Left - Form */}
        <div className="flex-1 space-y-4 text-sm">
          {/* Creator Name */}
          <div>
            <label className="block mb-1" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>Creator Name</label>
            <input
              type="text"
              placeholder="Name such as Skrillex, Coldplay"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-full focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>Description</label>
            <textarea
              placeholder="Up to 300 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-xl resize-none h-20"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>Tags</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="flex-1 bg-[#2A2A2A] text-white px-4 py-2 rounded-full"
              />
              <button
                onClick={handleTagAdd}
              >
                <Image src={addIcon.src} alt={addIcon.alt} width={addIcon.width} height={addIcon.height} className="cursor-pointer" />
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#333] px-3 py-1 rounded-full text-xs text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Dropdown fields */}
          {[
            { label: 'DNA Visibility', key: 'visibility', options: ['Public', 'Private', 'Draft'] },
            { label: 'Price', key: 'price', options: ['$9.99', '$4.99', 'Free'] },
            {
              label: 'License',
              key: 'license',
              options: ['Distribution', 'Royalty Free', 'Sample', 'Sync', 'Full Ownership'],
            },
            { label: 'Tracks', key: 'tracks', options: ['Visible', 'Invisible'] },
            { label: 'Become Partner', key: 'partner', options: ['Yes', 'No'] },
          ].map(({ label, key, options }) => (
            <div key={key}>
              <label className="block mb-1" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>{label}</label>
              <select
                value={form[key as keyof typeof form]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                className="w-full bg-[#2A2A2A] text-white px-4 py-2 rounded-full"
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Right - Upload Picture */}
        <div className="flex flex-col items-center justify-start w-full md:w-1/3">
          <div className="relative w-40 h-40 rounded-full border border-[#333] bg-[#121212] flex items-center justify-center">
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Image src={addIcon.src} alt={addIcon.alt} width={addIcon.width} height={addIcon.height} />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profile-upload"
            onChange={handleImageChange}
          />
          <label
            htmlFor="profile-upload"
            className="mt-4 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white px-6 py-2 rounded-full cursor-pointer text-sm"
          >
            Upload Picture
          </label>
        </div>
        </div>
        {/* Done Button */}
      <div className="flex justify-center">
        <button
          onClick={handleDone}
          className="bg-[#007D49] hover:bg-[green-800] transition px-10 py-3 rounded-full font-medium text-white text-sm cursor-pointer"
        >
          Done
        </button>
      </div>
      </div>

      
    </section>
  )
}

'use client'

import Image from 'next/image'
import { useRef } from 'react'

export default function Step1UploadAudio() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      console.log('Selected files:', files)
      // You can handle file upload here
    }
  }

  return (
    <section className="px-6 md:px-12 py-6" id="step-1">
      <h2 className="text-white text-sm mb-2">Step 1</h2>
      <h1 className="text-white text-2xl font-semibold mb-6" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>Upload Audio</h1>

      <div className="rounded-2xl bg-[#1A1A1A] p-8 md:p-12 border border-[#2A2A2A] text-center max-w-3xl">
        {/* Upload Icon */}
        <div className="flex justify-center mb-6">
          <Image
            src="/icons/uploadAudio.svg"
            alt="Upload"
            width={48}
            height={48}
          />
        </div>

        {/* Instructions */}
        <p className="text-white text-sm mb-1">
          Choose audio file(s)/folder(s) or drag it here
        </p>
        <p className="text-gray-400 text-xs mb-6">
          Supported formats: .mp3, .wav, .aac, .ogg, .flac
        </p>

        {/* Upload Button */}
        <button
          onClick={handleClick}
          className="bg-[#9333EA] hover:bg-[#7e22ce] transition text-white text-sm font-medium px-6 py-2 rounded-full"
        >
          Upload audio file(s)
        </button>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".mp3,.wav,.aac,.ogg,.flac"
          className="hidden"
        />

        {/* Disclaimer */}
        <p className="text-gray-500 text-xs mt-6">
          By uploading files, you agree that you have the ownership and authority to upload them.
        </p>
      </div>
    </section>
  )
}

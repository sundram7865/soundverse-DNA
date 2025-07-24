'use client'
import React, { useState } from 'react'

const Step3Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    isPublic: true,
    licenseType: 'free'
  })

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Step 3: Profile Creation</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Creator Name
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-soundverse-purple focus:outline-none"
            placeholder="Your artist name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Description (max 500 chars)
          </label>
          <textarea
            value={profile.description}
            onChange={(e) => setProfile({...profile, description: e.target.value})}
            maxLength={500}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-soundverse-purple focus:outline-none"
            placeholder="Describe your musical style"
          />
          <p className="text-xs text-gray-400 text-right">
            {profile.description.length}/500
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Visibility
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={profile.isPublic}
                  onChange={() => setProfile({...profile, isPublic: true})}
                  className="text-soundverse-purple focus:ring-soundverse-purple"
                />
                <span className="ml-2 text-gray-300">Public</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={!profile.isPublic}
                  onChange={() => setProfile({...profile, isPublic: false})}
                  className="text-soundverse-purple focus:ring-soundverse-purple"
                />
                <span className="ml-2 text-gray-300">Private</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              License Type
            </label>
            <select
              value={profile.licenseType}
              onChange={(e) => setProfile({...profile, licenseType: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-soundverse-purple focus:outline-none"
            >
              <option value="free">Free Use</option>
              <option value="premium">Premium License</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3Profile
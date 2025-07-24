'use client'
import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'

const Step4Tags = () => {
  const [tags, setTags] = useState<string[]>(['Electronic', 'Ambient'])
  const [inputValue, setInputValue] = useState('')

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()])
      }
      setInputValue('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Step 4: Tagging & Categorization</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Add Tags (Press Enter to add)
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-soundverse-purple focus:outline-none"
            placeholder="e.g. Electronic, Lo-fi, Cinematic"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Selected Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700 text-sm text-gray-200"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1.5 rounded-full hover:bg-gray-600 p-0.5"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-400">No tags added yet</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Primary Genre
          </label>
          <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-soundverse-purple focus:outline-none">
            <option value="">Select a genre</option>
            <option value="electronic">Electronic</option>
            <option value="hiphop">Hip Hop</option>
            <option value="rock">Rock</option>
            <option value="ambient">Ambient</option>
            <option value="pop">Pop</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Step4Tags
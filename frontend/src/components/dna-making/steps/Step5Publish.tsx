'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'

export default function Step5Publish() {
  // Mock summary data (replace with real data via props or context as needed)
  const profile = {
    creatorName: 'Your Name',
    description: 'Your DNA description goes here.',
    tags: ['pop', 'upbeat', '2025'],
    imageUrl: 'your-image-url',
  };

  const [published, setPublished] = useState(false);
  const handlePublish = () => {
    setPublished(true);
    // Optionally trigger API call here
  };

  // Type for DNA Artist
  type DNAArtist = {
    id: number;
    name: string;
    image_url: string;
    genres: string;
    description: string;
    tags: string[];
    audio_preview_url: string;
  };
  // Fetch DNA artists from backend
  const [artists, setArtists] = useState<DNAArtist[]>([]);
  const [loadingArtists, setLoadingArtists] = useState(true);
  const [artistError, setArtistError] = useState('');

  // Howler.js playback state
  const [playingId, setPlayingId] = useState<number | null>(null);
  const soundRef = useRef<Howl | null>(null);

  // Play/Pause handler
  const handlePlayPause = (artist: DNAArtist) => {
    // Pause if already playing this artist
    if (playingId === artist.id) {
      soundRef.current?.pause();
      setPlayingId(null);
      return;
    }
    // Stop previous sound
    soundRef.current?.stop();
    // Start new sound
    const sound = new Howl({
      src: [artist.audio_preview_url],
      html5: true,
      onend: () => setPlayingId(null),
    });
    soundRef.current = sound;
    sound.play();
    setPlayingId(artist.id);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      soundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/artists`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch DNA artists');
        return res.json();
      })
      .then(data => setArtists(data))
      .catch(err => setArtistError(err.message))
      .finally(() => setLoadingArtists(false));
  }, []);

  return (
    <section className="px-6 md:px-12 py-6" id="step-5">
      <h2 className="text-white text-sm mb-2">Step 5</h2>
      <h1 className="text-white text-2xl font-semibold mb-6" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>Publish & Suggested DNA Artists</h1>

      {/* Profile Summary Card */}
      <div className="mb-10 max-w-xl mx-auto bg-[#191919] border border-[#333] rounded-2xl p-6 flex flex-col items-center gap-4 shadow">
        <Image src="/images/avatar.png" alt="Profile" width={100} height={100} className="w-24 h-24 rounded-full object-cover border border-[#444]" />
        <div className="text-xl font-semibold text-white">{profile.creatorName}</div>
        <div className="text-gray-400 text-center">{profile.description}</div>
        <div className="flex gap-2 flex-wrap justify-center">
          {profile.tags.map((tag, i) => (
            <span key={i} className="bg-[#333] px-3 py-1 rounded-full text-xs text-white">{tag}</span>
          ))}
        </div>
      </div>

      {/* Publish Button & Confirmation */}
      <div className="mb-8 flex flex-col items-center">
        {!published ? (
          <button
            className="bg-[#007D49] hover:bg-green-800 transition px-10 py-3 rounded-full font-medium text-white text-lg shadow-lg"
            onClick={handlePublish}
          >
            Publish DNA
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-green-400 text-xl font-bold">🎉 DNA Published Successfully!</span>
            <span className="text-gray-300">Share your DNA with the world or explore more artists below.</span>
          </div>
        )}
      </div>

      {/* Tips / Next Steps */}
      <div className="mb-10 max-w-2xl mx-auto bg-[#181F2C] border border-[#2A2A2A] rounded-xl p-6 text-center text-white">
        <h4 className="font-bold mb-2">What’s Next?</h4>
        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
          <li>Share your DNA profile with your audience and collaborators.</li>
          <li>Browse and connect with other DNA artists below.</li>
          <li>Return to previous steps to make edits if needed.</li>
        </ul>
      </div>

      {/* DNA Artists List (from backend) */}
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4">Suggested DNA Artists</h3>
        {loadingArtists && <div className="text-gray-400">Loading artists...</div>}
        {artistError && <div className="text-red-400">{artistError}</div>}
        {!loadingArtists && !artistError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map(artist => (
              <div key={artist.id} className="bg-[#222] rounded-xl p-4 flex flex-col gap-2 border border-[#333]">
                <div className="flex items-center gap-4">
                  <img src={artist.image_url} alt={artist.name} width={100} height={100} className="w-16 h-16 rounded-full object-cover border border-[#444]" />
                  <div>
                    <div className="font-semibold text-base">{artist.name}</div>
                    <div className="text-xs text-gray-400">{artist.genres}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-300 mt-2">{artist.description}</div>
                {artist.tags && artist.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {artist.tags.map((tag: string, i: number) => (
                      <span key={i} className="bg-[#333] px-2 py-1 rounded-full text-xs text-white">{tag}</span>
                    ))}
                  </div>
                )}
                {artist.audio_preview_url && (
                  <button
                    className={`mt-2 px-4 py-2 rounded-full text-sm font-medium transition ${playingId === artist.id ? 'bg-green-700 text-white' : 'bg-[#333] text-white hover:bg-[#444]'}`}
                    onClick={() => handlePlayPause(artist)}
                  >
                    {playingId === artist.id ? 'Pause Preview' : 'Play Preview'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

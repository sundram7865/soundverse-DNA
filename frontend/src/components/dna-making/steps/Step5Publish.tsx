'use client'
import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import Image from 'next/image';

type DNAArtist = {
  id: number;
  name: string;
  image_url: string;
  genres: string;
  description: string;
  tags: string[];
  audio_preview_url: string;
};

export default function Step5Publish() {
  const [profile, setProfile] = useState({
    creatorName: '',
    description: '',
    tags: [] as string[],
    imageUrl: '',
    audioUrl: ''
  });

  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [artists, setArtists] = useState<DNAArtist[]>([]);
  const [loadingArtists, setLoadingArtists] = useState(true);
  const [artistError, setArtistError] = useState('');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const soundRef = useRef<Howl | null>(null);

  const handlePublish = async () => {
    setPublishing(true);
    setPublishError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artists/dna-profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName: profile.creatorName,
          description: profile.description,
          tags: profile.tags,
          imageUrl: profile.imageUrl,
          audioUrl: profile.audioUrl
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text.substring(0, 100)}`);
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP error ${response.status}`);
      }

      setPublished(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setPublishError(message);
      console.error('Publish error:', error);
    } finally {
      setPublishing(false);
    }
  };

  const handlePlayPause = (artist: DNAArtist) => {
    if (playingId === artist.id) {
      soundRef.current?.pause();
      setPlayingId(null);
      return;
    }
    
    soundRef.current?.stop();
    const sound = new Howl({
      src: [artist.audio_preview_url],
      html5: true,
      onend: () => setPlayingId(null),
    });
    soundRef.current = sound;
    sound.play();
    setPlayingId(artist.id);
  };

  useEffect(() => {
    return () => {
      soundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    const savedProfile = localStorage.getItem('dnaProfile');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artists`);
        if (!res.ok) throw new Error('Failed to fetch artists');
        const data = await res.json();
        setArtists(data.data || data);
      } catch (err) {
        setArtistError(err instanceof Error ? err.message : 'Fetch failed');
      } finally {
        setLoadingArtists(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <section className="px-6 md:px-12 py-6" id="step-5">
      <h2 className="text-white text-sm mb-2">Step 5</h2>
      <h1 className="text-white text-2xl font-semibold mb-6" style={{ fontFamily: 'Power Grotesk', fontWeight: 'normal' }}>
        Publish & Suggested DNA Artists
      </h1>

      {/* Profile Summary Card */}
      <div className="mb-10 max-w-xl mx-auto bg-[#191919] border border-[#333] rounded-2xl p-6 flex flex-col items-center gap-4 shadow">
        {profile.imageUrl ? (
          <Image 
            src={profile.imageUrl} 
            alt="Profile" 
            width={100} 
            height={100} 
            className="w-24 h-24 rounded-full object-cover border border-[#444]" 
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-700 border border-[#444] flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        <div className="text-xl font-semibold text-white">{profile.creatorName || 'Your Name'}</div>
        <div className="text-gray-400 text-center">{profile.description || 'No description provided'}</div>
        <div className="flex gap-2 flex-wrap justify-center">
          {profile.tags?.length > 0 ? (
            profile.tags.map((tag, i) => (
              <span key={i} className="bg-[#333] px-3 py-1 rounded-full text-xs text-white">{tag}</span>
            ))
          ) : (
            <span className="text-gray-500 text-xs">No tags</span>
          )}
        </div>
      </div>

      {/* Publish Button & Confirmation */}
      <div className="mb-8 flex flex-col items-center">
        {!published ? (
          <>
            <button
              onClick={handlePublish}
              disabled={publishing || !profile.creatorName}
              className={`bg-[#007D49] hover:bg-green-800 transition px-10 py-3 rounded-full font-medium text-white text-lg shadow-lg ${
                publishing ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                !profile.creatorName ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {publishing ? 'Publishing...' : 'Publish DNA'}
            </button>
            {publishError && (
              <div className="text-red-500 mt-2 text-sm max-w-md text-center">
                {publishError}
              </div>
            )}
            {!profile.creatorName && (
              <div className="text-yellow-500 mt-2 text-sm">
                Please complete all previous steps before publishing
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-green-400 text-xl font-bold">🎉 DNA Published Successfully!</span>
            <span className="text-gray-300">Share your DNA with the world or explore more artists below.</span>
          </div>
        )}
      </div>

      {/* Tips / Next Steps */}
      <div className="mb-10 max-w-2xl mx-auto bg-[#181F2C] border border-[#2A2A2A] rounded-xl p-6 text-center text-white">
        <h4 className="font-bold mb-2">What's Next?</h4>
        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
          <li>Share your DNA profile with your audience and collaborators.</li>
          <li>Browse and connect with other DNA artists below.</li>
          <li>Return to previous steps to make edits if needed.</li>
        </ul>
      </div>

      {/* DNA Artists List */}
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4">Suggested DNA Artists</h3>
        {loadingArtists ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : artistError ? (
          <div className="text-red-400 text-center">{artistError}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map(artist => (
              <div key={artist.id} className="bg-[#222] rounded-xl p-4 flex flex-col gap-2 border border-[#333] hover:border-green-500 transition">
                <div className="flex items-center gap-4">
                  <Image 
                    src={artist.image_url || '/images/default-artist.jpg'} 
                    alt={artist.name} 
                    width={64} 
                    height={64} 
                    className="w-16 h-16 rounded-full object-cover border border-[#444]"
                  />
                  <div>
                    <div className="font-semibold text-base">{artist.name}</div>
                    <div className="text-xs text-gray-400">{artist.genres}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-300 mt-2 line-clamp-2">
                  {artist.description || 'No description available'}
                </div>
                {artist.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {artist.tags.map((tag, i) => (
                      <span key={i} className="bg-[#333] px-2 py-1 rounded-full text-xs text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {artist.audio_preview_url && (
                  <button
                    className={`mt-3 px-4 py-2 rounded-full text-sm font-medium transition flex items-center justify-center gap-2 ${
                      playingId === artist.id ? 'bg-green-700 text-white' : 'bg-[#333] text-white hover:bg-[#444]'
                    }`}
                    onClick={() => handlePlayPause(artist)}
                  >
                    {playingId === artist.id ? (
                      <>
                        <PauseIcon />
                        Pause Preview
                      </>
                    ) : (
                      <>
                        <PlayIcon />
                        Play Preview
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Simple icon components
function PlayIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
}
'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

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
  const profile = {
    creatorName: 'Your Name',
    description: 'Your DNA description goes here.',
    tags: ['pop', 'upbeat', '2025'],
    imageUrl: '/images/avatar.png',
  };

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatorName: profile.creatorName,
          description: profile.description,
          genres: profile.tags.join(', '),
          imageUrl: profile.imageUrl,
          tags: profile.tags,
          audioUrl: 'your-audio-url',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Publishing failed');
      }

      setPublished(true);
    } catch (error) {
      console.error('Publishing error:', error);
      setPublishError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setPublishing(false);
    }
  };

  const handlePlayPause = (artist: DNAArtist) => {
    if (!artist.audio_preview_url) return;

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
      onloaderror: () => {
        console.error('Failed to load audio');
        setPlayingId(null);
      },
      onplayerror: () => {
        console.error('Failed to play audio');
        setPlayingId(null);
      },
    });
    soundRef.current = sound;
    sound.play();
    setPlayingId(artist.id);
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artists`);
        const result = await res.json();
        setArtists(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error('Fetch error:', error);
        setArtistError('Failed to load artists');
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
        <Image 
          src={profile.imageUrl} 
          alt="Profile" 
          width={100} 
          height={100} 
          className="w-24 h-24 rounded-full object-cover border border-[#444]" 
          priority
        />
        <div className="text-xl font-semibold text-white">{profile.creatorName}</div>
        <div className="text-gray-400 text-center">{profile.description}</div>
        <div className="flex gap-2 flex-wrap justify-center">
          {profile.tags.map((tag, i) => (
            <span key={i} className="bg-[#333] px-3 py-1 rounded-full text-xs text-white">{tag}</span>
          ))}
        </div>
      </div>

      {/* Publish Button */}
      <div className="mb-8 flex flex-col items-center">
        {!published ? (
          <>
            <button
              onClick={handlePublish}
              disabled={publishing}
              className={`bg-[#007D49] hover:bg-green-800 transition px-10 py-3 rounded-full font-medium text-white text-lg shadow-lg ${
                publishing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {publishing ? 'Publishing...' : 'Publish DNA'}
            </button>
            {publishError && (
              <div className="text-red-500 mt-2 text-sm max-w-md text-center">{publishError}</div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-green-400 text-xl font-bold">🎉 DNA Published Successfully!</span>
            <span className="text-gray-300">Share your DNA with the world or explore more artists below.</span>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="mb-10 max-w-2xl mx-auto bg-[#181F2C] border border-[#2A2A2A] rounded-xl p-6 text-center text-white">
        <h4 className="font-bold mb-2">What's Next?</h4>
        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
          <li>Share your DNA profile with your audience and collaborators</li>
          <li>Browse and connect with other DNA artists below</li>
          <li>Return to previous steps to make edits if needed</li>
        </ul>
      </div>

      {/* Artists List */}
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4 text-white">Suggested DNA Artists</h3>

        {loadingArtists ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-[#222] rounded-xl p-4 flex flex-col gap-4 border border-[#333] animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#333]"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[#333] rounded w-3/4"></div>
                    <div className="h-3 bg-[#333] rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-[#333] rounded w-full"></div>
                  <div className="h-3 bg-[#333] rounded w-5/6"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 bg-[#333] rounded-full w-12"></div>
                  <div className="h-6 bg-[#333] rounded-full w-16"></div>
                </div>
                <div className="h-10 bg-[#333] rounded-full mt-2"></div>
              </div>
            ))}
          </div>
        ) : artistError ? (
          <div className="text-red-400 text-center py-4">
            {artistError}
            <button 
              onClick={() => window.location.reload()}
              className="ml-2 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              Try Again
            </button>
          </div>
        ) : artists.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            No artists available
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map(artist => (
              <div key={artist.id} className="bg-[#222] rounded-xl p-4 flex flex-col gap-2 border border-[#333] hover:border-[#444] transition">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={artist.image_url}
                      alt={artist.name}
                      fill
                      className="rounded-full object-cover border border-[#444]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base text-white truncate">{artist.name}</div>
                    <div className="text-xs text-gray-400 truncate">{artist.genres}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-300 mt-2 line-clamp-2">{artist.description}</div>
                {artist.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {artist.tags.map((tag, i) => (
                      <span key={i} className="bg-[#333] px-2 py-1 rounded-full text-xs text-white">{tag}</span>
                    ))}
                  </div>
                )}
                {artist.audio_preview_url && (
                  <button
                    className={`mt-3 px-4 py-2 rounded-full text-sm font-medium transition flex items-center justify-center gap-2 ${
                      playingId === artist.id ? 
                        'bg-green-700 text-white' : 
                        'bg-[#333] text-white hover:bg-[#444]'
                    }`}
                    onClick={() => handlePlayPause(artist)}
                  >
                    {playingId === artist.id ? (
                      <>
                        <span className="w-2 h-4 bg-white mx-0.5 inline-block animate-pulse"></span>
                        <span className="w-2 h-6 bg-white mx-0.5 inline-block animate-pulse"></span>
                        <span className="w-2 h-4 bg-white mx-0.5 inline-block animate-pulse"></span>
                        Pause
                      </>
                    ) : (
                      'Play Preview'
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

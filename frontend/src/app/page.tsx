import TopSection from '@/components/TopSection1'
import CTACard from '@/components/CTACard'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="flex bg-[#121212] text-white">
        <Sidebar />
        <div className="flex flex-col w-full ml-15">
          <TopSection />
          <div className="flex flex-col gap-8 p-4 sm:p-8">
            <CTACard
              title="Verify your creator identity → Unlock your DNA"
              description="Simply claim your profile, and we'll build your DNA automatically. Are you a creator with music already on Spotify, Youtube etc?"
              buttons={[
                { label: 'Claim your profile', href: '/dna-making', variant: 'primary' },
                { label: "This doesn't apply to me", href: '/dna-making', variant: 'secondary' },
              ]}
            />

            <CTACard
              title="Build DNA by Uploading Audio Tracks"
              description="You can upload your music, and build your Sonic DNA. Please note that by default all DNAs remain private."
              listItems={[
                'Build with AI: With this, AI will take care of captions, categorisations, tags.',
                'Build Manually: You’ll have to manually add captions, categorisations and tags.',
              ]}
              buttons={[{ label: 'Upload audio', href: '/dna-making', variant: 'primary' }]}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

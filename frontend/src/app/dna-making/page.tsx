'use client'

import TopSection2 from '@/components/dna-making/TopSection2'
import Sidebar from '@/components/Sidebar'
import Step1UploadAudio from '@/components/dna-making/steps/Step1UploadAudio'
import Step2DnaSensitivity from '@/components/dna-making/steps/Step2DNASenstivity'
import Step3ProfileCreation from '@/components/dna-making/steps/Step3ProfileCreation';
import Step4Tagging from '@/components/dna-making/steps/Step4Tagging';
import Step5Publish from '@/components/dna-making/steps/Step5Publish';
import { useRef } from 'react'

export default function Home() {
    const step1Ref = useRef<HTMLDivElement>(null)
    const step2Ref = useRef<HTMLDivElement>(null)
    const step3Ref = useRef<HTMLDivElement>(null)
    const step4Ref = useRef<HTMLDivElement>(null)
    const step5Ref = useRef<HTMLDivElement>(null)

    const scrollToStep = (step: number) => {
        const stepRefs = [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref]
        stepRefs[step - 1]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return (
        <main className="min-h-screen bg-black">
            <div className="flex bg-[#121212] text-white">
                <Sidebar />
                <div className="flex flex-col w-full ml-15">
                    <TopSection2 onStepClick={scrollToStep} />
                    <div className="flex flex-col gap-8 p-4 sm:p-8">
                        <div ref={step1Ref} className="scroll-mt-45">
                            <Step1UploadAudio />
                        </div>
                        <div ref={step2Ref} className="scroll-mt-45">
                            <Step2DnaSensitivity />
                        </div>
                        <div ref={step3Ref} className="scroll-mt-45">
                            <Step3ProfileCreation />
                        </div>
                        <div ref={step4Ref} className="scroll-mt-45">
                            <Step4Tagging />
                        </div>
                        <div ref={step5Ref} className="scroll-mt-45">
                            <Step5Publish />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

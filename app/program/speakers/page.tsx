import { SpeakerHeroBanner } from '@/components/sections/speaker-hero-banner';
import { SpeakerInfoSection } from '@/components/sections/speaker-info-section';
import { SpeakerGrid } from '@/components/sections/speaker-grid';

export default function SpeakersPage() {
    return (
        <main>
            <SpeakerHeroBanner />
            <SpeakerInfoSection />
            <SpeakerGrid />
        </main>
    );
}

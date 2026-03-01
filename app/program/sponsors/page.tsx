import { SponsorHeroBanner } from '@/components/sections/sponsor-hero-banner';
import { SponsorShowcase } from '@/components/sections/sponsor-showcase';

export default function SponsorsProgramPage() {
    return (
        <main className="flex min-h-screen w-full flex-col bg-[#060010]">
            <SponsorHeroBanner />
            <SponsorShowcase />
        </main>
    );
}

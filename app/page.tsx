import { Hero } from '@/components/sections/hero';
import { WhyHRWest } from '@/components/sections/why-hrwest';
import { EventMetrics } from '@/components/sections/event-metrics';
import { TracksSection } from '@/components/sections/tracks-section';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhyHRWest />
      <EventMetrics />
      <TracksSection />
    </main>
  );
}

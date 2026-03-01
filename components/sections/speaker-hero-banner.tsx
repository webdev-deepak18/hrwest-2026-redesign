/**
 * SpeakerHeroBanner
 *
 * Thin wrapper around PageHeroBanner with speaker-specific defaults.
 * For other pages, import PageHeroBanner directly and pass the appropriate props.
 */
import { PageHeroBanner } from '@/components/ui/page-hero-banner';

export function SpeakerHeroBanner() {
    return (
        <PageHeroBanner
            eyebrow="Conference Speakers"
            eyebrowIconName="Mic"
            headline="Meet Our Speakers"
            tagline="Shaping the Future of Work"
            ctaText="Apply to Speak"
            ctaHref="#"
            blendImage="/images/speakers-mic-blend.png"
        />
    );
}


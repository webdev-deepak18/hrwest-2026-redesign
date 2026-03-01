import { PageHeroBanner } from '@/components/ui/page-hero-banner';

export function AgendaHeroBanner() {
    return (
        <PageHeroBanner
            eyebrow="Schedule & Sessions"
            eyebrowIconName="Calendar"
            headline="HRWest Agenda"
            tagline="We're busy working on HRWest 2026!"
            description="Peruse our 2025 agenda below to see what to expect."
            ctaText="Register Now"
            ctaHref="/attend"
            blendImage="/images/agenda-blend.png"
            blendImageAlt="Confident HR professional holding a clipboard"
        />
    );
}

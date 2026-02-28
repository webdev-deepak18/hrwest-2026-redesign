export function GlobalSponsorLogos() {
    return (
        <section className="py-16 bg-muted/30 border-t border-border/50 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                        Powered by our 2026 Visionary Sponsors
                    </p>
                </div>

                {/* Placeholder for dynamic sponsor logos */}
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="h-12 w-32 bg-foreground/10 rounded animate-pulse" />
                    <div className="h-12 w-40 bg-foreground/10 rounded animate-pulse" />
                    <div className="h-12 w-32 bg-foreground/10 rounded animate-pulse" />
                    <div className="h-12 w-36 bg-foreground/10 rounded animate-pulse" />
                    <div className="h-12 w-48 hidden md:block bg-foreground/10 rounded animate-pulse" />
                </div>
            </div>
        </section>
    );
}

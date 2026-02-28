import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">

                    {/* BRAND */}
                    <div className="md:col-span-1 space-y-4">
                        <h3 className="text-2xl font-bold tracking-tighter text-white">
                            HR<span className="text-muted-foreground">West</span>
                        </h3>
                        <p className="text-sm text-secondary-foreground/80 max-w-xs">
                            The premier event for HR professionals to discover the future of work, connect with innovators, and build high-performance teams.
                        </p>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Program</h4>
                        <ul className="space-y-3 text-sm text-secondary-foreground/80">
                            <li><Link href="/program/speakers" className="hover:text-primary transition-colors">Speakers</Link></li>
                            <li><Link href="/program/agenda" className="hover:text-primary transition-colors">2025 Agenda</Link></li>
                            <li><Link href="/program/sponsors" className="hover:text-primary transition-colors">Sponsors</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Attend</h4>
                        <ul className="space-y-3 text-sm text-secondary-foreground/80">
                            <li><Link href="/attend/team" className="hover:text-primary transition-colors">Attend as a Team</Link></li>
                            <li><Link href="/attend/volunteer" className="hover:text-primary transition-colors">Volunteer</Link></li>
                            <li><Link href="/attend/ask-employer" className="hover:text-primary transition-colors">Ask Your Employer</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <ul className="space-y-3 text-sm text-secondary-foreground/80">
                            <li><Link href="/sponsor" className="hover:text-primary transition-colors">Why Sponsor</Link></li>
                            <li><Link href="/testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
                            <li><a href="mailto:hello@hrwest.com" className="hover:text-primary transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-xs text-secondary-foreground/60">
                        &copy; {new Date().getFullYear()} HRWest Conference. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-secondary-foreground/60">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

import React from 'react';

interface BrandMotifProps {
    className?: string;
    size?: number; // Diameter of each dot in pixels
    gap?: number;  // Gap between dots in pixels
}

/**
 * HR.com Legacy Elements Motif
 * A simple line of four colored dots representing the parent brand's identity:
 * Red/Orange, Cyan/Blue, Green, Yellow.
 */
export function BrandMotif({ className = '', size = 6, gap = 8 }: BrandMotifProps) {
    const dots = [
        { color: '#EF4A3D', label: 'HR.com Red' },
        { color: '#4AC4D6', label: 'HR.com Cyan' },
        { color: '#94C83D', label: 'HR.com Green' },
        { color: '#FDB414', label: 'HR.com Yellow' },
    ];

    const width = (size * 4) + (gap * 3);

    return (
        <div
            className={`inline-flex items-center justify-center ${className}`}
            aria-label="HR.com Brand Motif"
            role="img"
        >
            <svg
                width={width}
                height={size}
                viewBox={`0 0 ${width} ${size}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {dots.map((dot, index) => {
                    const cx = (size / 2) + (index * (size + gap));
                    const cy = size / 2;
                    const r = size / 2;

                    return (
                        <circle
                            key={dot.label}
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill={dot.color}
                        />
                    );
                })}
            </svg>
        </div>
    );
}

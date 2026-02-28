'use client';
import { useEffect, useRef } from 'react';

// Hydration safe wrapper since window/document is needed for dat.gui
export default function SplashCursor(props: any) {
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <SplashCursorImpl {...props} />;
}

import * as React from 'react';

function SplashCursorImpl({
    SIM_RESOLUTION = 128,
    DYE_RESOLUTION = 1440,
    CAPTURE_RESOLUTION = 512,
    DENSITY_DISSIPATION = 3.5,
    VELOCITY_DISSIPATION = 2,
    PRESSURE = 0.1,
    PRESSURE_ITERATIONS = 20,
    CURL = 3,
    SPLAT_RADIUS = 0.2,
    SPLAT_FORCE = 6000,
    SHADING = true,
    COLOR_UPDATE_SPEED = 10,
    BACK_COLOR = { r: 0, g: 0, b: 0 },
    TRANSPARENT = true,
    BLOOM = false,
    BLOOM_ITERATIONS = 8,
    BLOOM_RESOLUTION = 256,
    BLOOM_INTENSITY = 0.8,
    BLOOM_THRESHOLD = 0.6,
    BLOOM_SOFT_KNEE = 0.7,
    SUNRAYS = false,
    SUNRAYS_RESOLUTION = 196,
    SUNRAYS_WEIGHT = 1.0,
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // ... we need the actual implementation here
        // The previous attempt was incomplete. 
        // I will search for a working WebGL fluid simulation snippet.

    }, [SIM_RESOLUTION, DYE_RESOLUTION, CAPTURE_RESOLUTION, DENSITY_DISSIPATION, VELOCITY_DISSIPATION, PRESSURE, PRESSURE_ITERATIONS, CURL, SPLAT_RADIUS, SPLAT_FORCE, SHADING, COLOR_UPDATE_SPEED, BACK_COLOR, TRANSPARENT, BLOOM, BLOOM_ITERATIONS, BLOOM_RESOLUTION, BLOOM_INTENSITY, BLOOM_THRESHOLD, BLOOM_SOFT_KNEE, SUNRAYS, SUNRAYS_RESOLUTION, SUNRAYS_WEIGHT]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none"
        />
    );
}

'use client';

import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';

/* ─────────────────────────────────────────────
   Inline CSS (avoids separate .css import in Next.js)
   ───────────────────────────────────────────── */
const scrollStackStyles = `
  .scroll-stack-scroller {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: visible;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }

  /* Hide scrollbar */
  .scroll-stack-scroller::-webkit-scrollbar {
    display: none;
  }
  .scroll-stack-scroller {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scroll-stack-scroller.use-window-scroll {
    overflow: visible;
    height: auto;
  }

  .scroll-stack-inner {
    padding: 20vh 5rem 50rem;
    min-height: 100vh;
  }

  .scroll-stack-card {
    /* Only transform-origin matters here; GPU compositing is handled via will-change */
    transform-origin: top center;
    will-change: transform, filter;
    /* 
      IMPORTANT: No preserve-3d / backface-visibility here.
      Those create new stacking contexts that fight with translate3d pinning
      and cause flickering when the browser promotes/demotes layers.
    */
    width: 100%;
    margin: 30px 0;
    border-radius: 28px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    /* Promote to GPU layer without preserve-3d side-effects */
    transform: translateZ(0);
  }

  .scroll-stack-end {
    width: 100%;
    height: 1px;
  }
`;

/* ─────────────────────────────────────────────
   StyleInjector — renders the CSS once
   ───────────────────────────────────────────── */
function StyleInjector() {
    return <style dangerouslySetInnerHTML={{ __html: scrollStackStyles }} />;
}

/* ─────────────────────────────────────────────
   ScrollStackItem
   ───────────────────────────────────────────── */
export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
    children,
    itemClassName = '',
}) => (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

/* ─────────────────────────────────────────────
   ScrollStack
   ───────────────────────────────────────────── */
interface ScrollStackProps {
    className?: string;
    children: ReactNode;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete,
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lastTransformsRef = useRef(new Map<number, any>());

    // Cache card/end offsets so we never call getBoundingClientRect during a scroll frame.
    // These are only refreshed on layout changes (mount, resize).
    const cardOffsetsRef = useRef<number[]>([]);
    const endOffsetRef = useRef<number>(0);

    // The live Lenis scroll position — set from the Lenis 'scroll' event so it's always
    // in-sync with Lenis' interpolated value rather than raw window.scrollY.
    const lenisScrollRef = useRef<number>(0);

    const parsePercentage = useCallback(
        (value: string | number, containerHeight: number) => {
            if (typeof value === 'string' && value.includes('%')) {
                return (parseFloat(value) / 100) * containerHeight;
            }
            return parseFloat(value as string);
        },
        []
    );

    /** Re-snapshot all element offsets from the DOM. Called on mount and on resize. */
    const snapshotOffsets = useCallback(() => {
        const cards = cardsRef.current;
        if (!cards.length) return;

        // CRITICAL: We MUST measure offsets while cards are NOT transformed (un-pinned),
        // otherwise getBoundingClientRect/offsetTop include the scroll translation.
        const originalTransforms = cards.map((c) => c.style.transform);
        cards.forEach((c) => (c.style.transform = 'none'));

        if (useWindowScroll) {
            // getBoundingClientRect + scrollY = documentOffset.
            cardOffsetsRef.current = cards.map(
                (c) => c.getBoundingClientRect().top + window.scrollY
            );
            const endEl = document.querySelector('.scroll-stack-end') as HTMLElement | null;
            endOffsetRef.current = endEl
                ? endEl.getBoundingClientRect().top + window.scrollY
                : 0;
        } else {
            cardOffsetsRef.current = cards.map((c) => c.offsetTop);
            const scroller = scrollerRef.current;
            const endEl = scroller?.querySelector('.scroll-stack-end') as HTMLElement | null;
            endOffsetRef.current = endEl ? endEl.offsetTop : 0;
        }

        // Restore transforms immediately after measurement
        cards.forEach((c, i) => {
            c.style.transform = originalTransforms[i] || 'translateZ(0)';
        });
    }, [useWindowScroll]);

    const updateCardTransforms = useCallback(
        (scrollTop: number) => {
            const cards = cardsRef.current;
            if (!cards.length) return;

            const containerHeight = useWindowScroll
                ? window.innerHeight
                : (scrollerRef.current?.clientHeight ?? window.innerHeight);

            const stackPositionPx = parsePercentage(stackPosition, containerHeight);
            const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
            const endElementTop = endOffsetRef.current;

            cards.forEach((card, i) => {
                if (!card) return;

                // Use pre-cached offset — never getBoundingClientRect in the hot path.
                const cardTop = cardOffsetsRef.current[i] ?? 0;

                const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
                const triggerEnd = cardTop - scaleEndPositionPx;
                const pinStart = triggerStart;

                // pinEnd should allow enough room for the last card to pin and the user to see the stack.
                // We base it on the end marker which is at the bottom of the content.
                const pinEnd = endElementTop - containerHeight * 0.4;

                // Scale progress
                let scaleProgress = 0;
                if (scrollTop >= triggerStart && scrollTop <= triggerEnd) {
                    scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
                } else if (scrollTop > triggerEnd) {
                    scaleProgress = 1;
                }

                const targetScale = baseScale + i * itemScale;
                const scale = 1 - scaleProgress * (1 - targetScale);
                const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

                // Blur
                let blur = 0;
                if (blurAmount) {
                    let topCardIndex = 0;
                    for (let j = 0; j < cards.length; j++) {
                        const jCardTop = cardOffsetsRef.current[j] ?? 0;
                        const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
                        if (scrollTop >= jTriggerStart) topCardIndex = j;
                    }
                    if (i < topCardIndex) {
                        blur = Math.max(0, (topCardIndex - i) * blurAmount);
                    }
                }

                // Pinning / translateY
                let translateY = 0;
                const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isPinned) {
                    translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
                } else if (scrollTop > pinEnd) {
                    translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
                }

                // Round to avoid sub-pixel thrash
                const ty = Math.round(translateY * 10) / 10;
                const sc = Math.round(scale * 1000) / 1000;
                const ro = Math.round(rotation * 10) / 10;
                const bl = Math.round(blur * 10) / 10;

                const last = lastTransformsRef.current.get(i);
                const changed =
                    !last ||
                    Math.abs(last.ty - ty) > 0.05 ||
                    Math.abs(last.sc - sc) > 0.0005 ||
                    Math.abs(last.ro - ro) > 0.05 ||
                    Math.abs(last.bl - bl) > 0.05;

                if (changed) {
                    // Use translate3d so the browser keeps this on a composited layer.
                    // No rotate() when 0 to avoid forcing a different compositing path.
                    card.style.transform = ro
                        ? `translate3d(0,${ty}px,0) scale(${sc}) rotate(${ro}deg)`
                        : `translate3d(0,${ty}px,0) scale(${sc})`;
                    card.style.filter = bl > 0 ? `blur(${bl}px)` : '';
                    lastTransformsRef.current.set(i, { ty, sc, ro, bl });
                }

                if (i === cards.length - 1) {
                    const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
                    if (inView && !stackCompletedRef.current) {
                        stackCompletedRef.current = true;
                        onStackComplete?.();
                    } else if (!inView && stackCompletedRef.current) {
                        stackCompletedRef.current = false;
                    }
                }
            });
        },
        [
            itemScale,
            itemStackDistance,
            stackPosition,
            scaleEndPosition,
            baseScale,
            rotationAmount,
            blurAmount,
            useWindowScroll,
            onStackComplete,
            parsePercentage,
        ]
    );

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : scroller.querySelectorAll('.scroll-stack-card')
        ) as HTMLElement[];

        cardsRef.current = cards;
        const transformsCache = lastTransformsRef.current;

        // Style cards for GPU compositing — no preserve-3d / backface-visibility
        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            // Explicit z-index ensures later cards (higher index) always paint ON TOP
            // of earlier ones in the stack — critical for the "last card on top" look.
            card.style.zIndex = String(i + 1);
            // Initial GPU promotion without preserve-3d
            card.style.transform = 'translateZ(0)';
        });

        // Snapshot offsets after styles are applied
        snapshotOffsets();

        // Initial draw using actual scrollY/scrollTop
        const initialScroll = useWindowScroll
            ? window.scrollY
            : (scroller.scrollTop ?? 0);
        lenisScrollRef.current = initialScroll;
        updateCardTransforms(initialScroll);

        // Re-snapshot on resize (layout shift)
        const resizeObserver = new ResizeObserver(() => {
            snapshotOffsets();
            updateCardTransforms(lenisScrollRef.current);
        });
        resizeObserver.observe(document.documentElement);

        // Setup Lenis — listen to its 'scroll' event to get Lenis' interpolated position
        let lenis: Lenis;

        if (useWindowScroll) {
            lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 2,
                infinite: false,
                wheelMultiplier: 1,
                lerp: 0.1,
                syncTouch: true,
                syncTouchLerp: 0.075,
            });
        } else {
            lenis = new Lenis({
                wrapper: scroller,
                content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 2,
                infinite: false,
                gestureOrientation: 'vertical',
                wheelMultiplier: 1,
                lerp: 0.1,
                syncTouch: true,
                syncTouchLerp: 0.075,
            });
        }

        // Use Lenis' own scroll value — this is the smoothly interpolated position
        // that Lenis has already applied to the page, so we stay in exact sync.
        lenis.on('scroll', ({ scroll }: { scroll: number }) => {
            lenisScrollRef.current = scroll;
            updateCardTransforms(scroll);
        });

        const raf = (time: number) => {
            lenis.raf(time);
            animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);
        lenisRef.current = lenis;

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            lenis.destroy();
            resizeObserver.disconnect();
            stackCompletedRef.current = false;
            cardsRef.current = [];
            transformsCache.clear();
            cardOffsetsRef.current = [];
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        scaleDuration,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        snapshotOffsets,
        updateCardTransforms,
    ]);

    return (
        <>
            <StyleInjector />
            <div
                className={`scroll-stack-scroller ${useWindowScroll ? 'use-window-scroll' : ''} ${className}`.trim()}
                ref={scrollerRef}
            >
                <div className="scroll-stack-inner">
                    {children}
                    <div className="scroll-stack-end" />
                </div>
            </div>
        </>
    );
};

export default ScrollStack;

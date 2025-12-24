'use client';

import { useEffect, useRef } from 'react';

const seed = 12;
const text = 'Merry Christmas! Wishing you chill vibes and epic holidays.\n\n       Astro & Maggie';

export default function CursiveText() {
    const pRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!pRef.current) return;

        function seededRandom(s: number) {
            let x = Math.sin(s) * 10000;
            return x - Math.floor(x);
        }

        function wrapLetters(str: string, element: HTMLElement, seed: number = 1) {
            const fonts = [
                'caveat',
                'cedarville-cursive',
                'indie-flower',
                'nothing-you-could-do',
                'oooh-baby',
                'reenie-beanie',
                'shadows-into-light'
            ];

            const blacklist: Record<string, string[]> = {
                l: ['cedarville-cursive', 'oooh-baby', 'nothing-you-could-do']
            };

            const lastUsed: Record<string, string> = {};
            element.innerHTML = '';

            let currentSeed = seed;

            for (const char of str) {
                if (char === '\n') {
                    element.appendChild(document.createElement('br'));
                    continue;
                }
                const lowerChar = char.toLowerCase();
                let availableFonts = fonts;

                if (blacklist[lowerChar]) {
                    availableFonts = fonts.filter(f => !blacklist[lowerChar].includes(f));
                }

                if (lastUsed[lowerChar]) {
                    availableFonts = availableFonts.filter(f => f !== lastUsed[lowerChar]);
                }

                const fontIndex = Math.floor(seededRandom(currentSeed) * availableFonts.length);
                const font = availableFonts[fontIndex] || fonts[0];
                lastUsed[lowerChar] = font;

                const span = document.createElement('span');
                span.className = font;
                span.textContent = char;
                element.appendChild(span);

                currentSeed++;
            }
        }

        wrapLetters(text, pRef.current, seed);
    }, []);

    return <p ref={pRef}></p>;
}

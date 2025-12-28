'use client';

import React, { useMemo } from 'react';

const NetflixBackground = () => {
    const backgroundImages = [
        '/styles/ceo_style.png',
        '/styles/halloween_style.png',
        '/styles/linkedin_style.png',
        '/styles/floating-product.jpg',
        '/styles/golden-hour.jpg',
        '/styles/lifestyle-context.jpg',
        '/styles/luxury-display.jpg',
        '/styles/minimal-studio.jpg',
        '/styles/neon-glow.jpg',
        '/styles/snowy-winter.jpg',
        '/styles/tropical-summer.jpg',
        '/styles/water-splash.png',
        '/background/image1.png',
        '/background/image2.png',
        '/background/image3.png',
        '/background/image4.png',
        '/background/image5.png',
        '/background/image6.png',
        '/background/image7.png',
        '/background/image8.png',
        '/background/image9.png',
        '/background/image10.png',
        '/background/image11.png',
        '/background/image12.png',
        '/background/image13.png',
        '/background/image14.png',
        '/background/image15.png',
        '/background/image16.png',
        '/background/image17.png',
        '/background/image18.png',
        '/background/image19.png',
        '/background/image20.png',
    ];

    const boxes = useMemo(() => {
        const boxCount = 6;
        const thumbnailsPerBox = 20;

        return Array.from({ length: boxCount }, (_, boxIndex) => (
            <div key={boxIndex} className="netflix-box">
                {Array.from({ length: thumbnailsPerBox }, (_, thumbnailIndex) => {
                    const imageIndex = (boxIndex * thumbnailsPerBox + thumbnailIndex) % backgroundImages.length;
                    return (
                        <div
                            key={`${boxIndex}-${thumbnailIndex}`}
                            className="netflix-thumbnail"
                            style={{
                                backgroundImage: `url(${backgroundImages[imageIndex]})`
                            }}
                        />
                    );
                })}
            </div>
        ));
    }, []);

    return (
        <div className="netflix-container">
            <div className="netflix-container-perspective">
                <div className="netflix-container-background">
                    {boxes}
                </div>
            </div>
            <div className="netflix-gradient" />
        </div>
    );
};

export default NetflixBackground;

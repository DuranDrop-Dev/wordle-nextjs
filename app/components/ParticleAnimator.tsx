import type { CSSProperties } from "react";

type ParticleStyle = CSSProperties & {
    "--particle-left": string;
    "--particle-size": string;
    "--particle-duration": string;
    "--particle-delay": string;
    "--particle-drift": string;
    "--particle-opacity": string;
};

const PARTICLE_COUNT = 52;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const left = (index * 37) % 100;
    const size = 2 + (index % 4);
    const duration = 12 + (index % 9);
    const delay = -1 * ((index * 0.73) % duration);
    const drift = ((index % 7) - 3) * 10;
    const opacity = 0.16 + ((index % 5) * 0.05);

    return {
        id: `particle-${index}`,
        style: {
            "--particle-left": `${left}%`,
            "--particle-size": `${size}px`,
            "--particle-duration": `${duration}s`,
            "--particle-delay": `${delay}s`,
            "--particle-drift": `${drift}px`,
            "--particle-opacity": opacity.toFixed(2),
        } as ParticleStyle,
    };
});

const ParticleAnimator = () => {
    return (
        <div className="particle-field" aria-hidden="true">
            {particles.map((particle) => (
                <span
                    className="particle-dot"
                    key={particle.id}
                    style={particle.style}
                />
            ))}
        </div>
    );
};

export default ParticleAnimator;

import { useState, useEffect } from 'react';

interface StageSize {
    width: number;
    height: number;
}

interface RectSize {
    width: number;
    height: number;
    spacing: number;
}

export function useResponsiveStage(): { stageSize: StageSize; rectSize: RectSize } {
    const [stageSize, setStageSize] = useState<StageSize>({ width: 600, height: 400 });
    const [rectSize, setRectSize] = useState<RectSize>({ width: 50, height: 50, spacing: 60 });

    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth > 1024) {
                // For large screens (like 24-inch monitors)
                setStageSize({ width: 1200, height: 800 });
                setRectSize({ width: 40, height: 40, spacing: 50 });
            } else {
                // For small screens (like 6-inch phones)
                setStageSize({ width: window.innerWidth - 20, height: (window.innerHeight / 2) - 20 });
                setRectSize({ width: 25, height: 25, spacing: 30 });
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize(); // Set the initial size

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return { stageSize, rectSize };
}

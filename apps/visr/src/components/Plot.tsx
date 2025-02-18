import { useEffect, useState } from 'react';

function Plot() {
    const [plotUrl, setPlotUrl] = useState<string>('');

    useEffect(() => {
        const fetchPlot = async () => {
            const response: Response = await fetch(`/api/plot`);
            console.log(response);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPlotUrl(url);
        };

        fetchPlot();
    }, []);

    return (
        <div className="plot">
            <h1>Matplotlib Plot</h1>
            {plotUrl && <img src={plotUrl} alt="Matplotlib Plot" />}
        </div>
    );
}

export default Plot;

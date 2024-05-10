import { useCanvas } from './useCanvas'


export function Canvas({ width, height, draw, params })
{
    const { canvasRef } = useCanvas( width, height, draw, params)

    return (
        <canvas ref={ canvasRef }></canvas>
    )
}
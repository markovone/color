import { useCanvas } from 'src/ui/Canvas/useCanvas'

export function Canvas({ width, height })
{
    const { canvasRef } = useCanvas((ctx) => {
        ctx.fillRect(10,10,10,10)
    }, { width, height })

    return (
        <canvas ref={ canvasRef }></canvas>
    )
}
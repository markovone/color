import { drawHueSlice } from 'src/draw'
import { useCanvas } from 'src/ui/Canvas/useCanvas'
import { Cursor } from './Cursor'
import { position2Coordinates } from 'src/utils'


export function ColorArea({ colorData, cursor, setState })
{
    const { selected, setSelected } = cursor

    const { canvasRef } = useCanvas([ 
        (ctx) => drawHueSlice(ctx, colorData),
    ])

    const onClick = (e) => {
        const [ x, y ] = position2Coordinates(e)

        setState(current => current.map(
            layer => {
                if (layer.data.colorModel === 'hsv' || layer.data.colorModel === 'hsl')
                {
                    return {
                        ...layer,
                        data: layer.data.change(color => ({
                            ...color,
                            channels: [ color.channels[0], x, y ]
                        }))
                    }
                }
                else
                {
                    return layer
                }
            }
        ))

        setSelected([ x, y ])
    }

    return (
        <div className="color-area" onClick={ onClick }>
            <Cursor selected={ selected } />
            <canvas ref={ canvasRef }></canvas>
        </div>
    )
}
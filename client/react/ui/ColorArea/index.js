import { Canvas } from 'src/ui/Canvas'
import { drawHueSlice } from 'src/draw'


export function ColorArea({ colorData })
{
    const { colorModel, channels } = colorData

    return (
        <div className="color-area">
            <Canvas 
                params={{ 
                    colorModel,
                    hue: channels[0] 
                }}
                draw={ drawHueSlice } />
        </div>
    )
}
import { Canvas } from 'src/ui/Canvas'
import { Slider } from 'src/ui/Slider'

export function App()
{

    return (
        <>
            <div className="f-r">
                <Slider className="slider-hue" min={ 0 } max={ 359 } step={ 1 } defaultValue={ 180 } />
                <Canvas width={ 500 } height={ 500 } />
            </div>    
        </>
    )
}
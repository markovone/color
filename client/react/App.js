import { useState } from 'react'
import { Canvas } from 'src/ui/Canvas'
import { Slider } from 'src/ui/Slider'
import { draw } from 'src/ui/Canvas/draw'

export function App()
{
    const [ value, setValue ] = useState(180)

    return (
        <>
            <div className="c-f-r-c">
                <Slider 
                    className="slider-hue" 
                    min={ 0 } max={ 359 } step={ 1 } 
                    value={ value } 
                    onChange={ (e) => {
                        setValue(parseInt(e.target.value))
                    }}
                />
                <Canvas 
                    width={ 500 } height={ 500 } 
                    params={{ hue: 359-value }}
                    draw={ draw } />
            </div>    
        </>
    )
}
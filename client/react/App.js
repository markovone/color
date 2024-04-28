import { useState } from 'react'
import { Canvas } from 'src/ui/Canvas'
import { Slider } from 'src/ui/Slider'
import { draw } from 'src/ui/Canvas/draw'
import { OptionList } from './ui/OptionList'

export function App()
{
    const [ colorModel, setColorModel ] = useState('hsl')

    const [ hue, setHue ] = useState(180)

    return (
        <div className="picker">
            
            <OptionList 
                name="colorModel" 
                onChange={ (e) => { setColorModel(e.target.value) }} 
                checkedValue={ colorModel }
                items={[
                    { label: 'HSL', value: 'hsl' },
                    { label: 'HSV', value: 'hsv' }
                ]}
            />

            <Slider 
                className="slider-hue" 
                min={ 0 } max={ 359 } step={ 1 } 
                value={ hue } 
                onChange={ (e) => {
                    setHue(parseInt(e.target.value))
                }}
            />

            <Canvas 
                width={ 500 } height={ 500 } 
                params={{ 
                    colorModel,
                    hue: 359-hue 
                }}
                draw={ draw } />
 
        </div>
    )
}
import { useState } from 'react'
import { ColorArea } from './ui/ColorArea'
import { color } from './color'
import { SliderHue, SliderGradient } from './ui/Slider'


export function App()
{
    const [ state, setState ] = useState([
        {
            name: 'color',
            data: color({ channels: [ 238, 100, 50 ], colorModel: 'hsv' }),
            Slider: SliderHue,
            isSelected: true,
        },
        {
            name: 'gradient',
            data: [],
            Slider: SliderGradient,
        }
    ])

    const changeMode = e => {
        setState(current => current.map(item => ({
            ...item,
            isSelected: item.name === e.target.value
        })))
    }

    const changeColorData = (changeData) => {
        setState(current => current.map(
            item => item.isSelected ? { ...item, data: changeData(item.data) } : item
        ))
    }

    return (
        <div className="picker f-c">
            
            <ColorArea colorData={ state.find(mode => mode.isSelected).data } />

            <fieldset className="option-list f-r">

                { state.map(item => (
                    <div key={ item.name }>
                        <input 
                            type="radio" 
                            id={ 'id-' + item.name } 
                            name={ 'mode' } 
                            value={ item.name } 
                            onChange={ changeMode } 
                            defaultChecked={ item.isSelected }
                        />
                        <label htmlFor={ 'id-' + item.name }>
                            { item.name }
                        </label>
                    </div>
                ))}

            </fieldset>

            { state.filter(mode=> mode.isSelected).map(({ Slider, name, data }) => (

                <div className={ 'mode f-c' } key={ 'key-' + name }>
                    <Slider 
                        value={ data.getChannel(0) } 
                        onChange={ e => { 
                            changeColorData(color => color.change(current => ({
                                ...current,
                                channels: [ parseInt(e.target.value), 100, 50 ], 
                            }))) 
                        }}
                    />

                    <div className="color-info f-r-b">
                        <div className="f-r">
                            <select 
                                className="select"
                                name="color-model" 
                                defaultValue={ data.colorModel }
                                onChange={ e => { 
                                    changeColorData(color => color.convert(data.colorModel +'2'+ e.target.value)) 
                                }}
                            >
                                
                                { [ 'hsv', 'hsl' ].map(item => (
                                    <option key={ 'key-'+item} value={ item }>{ item }</option>
                                )) }
                                
                            </select>


                        </div>

                    </div>
                </div>

            )) }


            {/* <div className="eyedropper"></div> */}

 
        </div>
    )
}
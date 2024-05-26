import { useState } from 'react'
import { ColorArea } from './ui/ColorArea'
import { color } from './color'
import { types } from './layers/types'
import { genKey } from './utils'


export function App()
{
    const [ selected, setSelected ] = useState([ 100, 100 ])

    const [ state, setState ] = useState([
        {
            name: 'color',
            key: genKey(),
            data: color({ channels: [ 238, 100, 100 ], colorModel: 'hsv' }),
            isSelected: true,
        },
    ])

    const colorAreaData = (layers) => {
        // TODO calculate draw function from layers

        return layers[0].data
    }

    const setChange = (changeData, key, changeSelected = null) => {
        setState(current => current.map(
            item => {
                return item.key === key ? { ...item, data: changeData(item.data) } : item
            }
        ))

        changeSelected && setSelected(current => changeSelected(current))
    }

    console.log(state)

    return (
        <div className="picker f-c">
            
            <ColorArea
                cursor={{ selected, setSelected }}
                setState={ setState } 
                colorData={ colorAreaData(state) } 
            />

            { state.map(layer => {
                const { Component } = types.find(type => type.value === layer.name)

                return (
                    <Component 
                        key={ layer.key } 
                        layerData={ layer } 
                        changeState={ setChange } 
                    />
                )
            })}

        </div>
    )
}

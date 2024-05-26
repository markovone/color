import { Select } from "../ui/Select"
import { SliderHue } from "../ui/Slider"
import { types } from "./types"

export function Color({ layerData, changeState })
{
    const { channels, colorModel } = layerData.data

    console.log(channels)

    return (
        <section className="layer f-r">
            <div className="layer__branch">
                <div className="layer__handle"></div>
            </div>
            <div className="layer__content">
                <header className="layer__header f-r">
                    <Select 
                        name="layer-types" 
                        defaultValue="color"
                        values={ types }
                        onChange={ () => {} }
                    />
                    <Select 
                        name="color-model" 
                        values={ [
                            { label: 'HSV', value: 'hsv' },
                            { label: 'HSL', value: 'hsl' },
                        ] }
                        defaultValue={ colorModel }
                        onChange={ e => {
                            changeState(
                                current => current.convert(current.colorModel +'2'+ e.target.value),
                                layerData.key
                            )
                        } }
                    />
                </header>
                
                <div className="layer__body f-c">
                    <SliderHue
                        value={ channels[0] } 
                        onChange={ e => {
                            changeState(
                                current => current.change(color => ({
                                    ...color,
                                    channels: [ parseInt(e.target.value), color.channels[1], color.channels[2] ], 
                                })),
                                layerData.key
                            )
                        } }
                    />

                    <div className="f-r-b">
                        <div className="eyedropper"></div>
                        <div className="layer__channels f-r-e">

                            { channels.map((channel, i) => (
                                <input 
                                    key={ i }
                                    type="text" 
                                    name={ i } 
                                    value={ channel } 
                                    onChange={ e => { 
                                        const [ index, value ] = [ parseInt(e.target.getAttribute('name')), parseInt(e.target.value) ]

                                        changeState(
                                            current => current.change(color => ({
                                                ...color,
                                                channels: color.channels.map(
                                                    (channel, i) => i === index ? value : channel
                                                ), 
                                            })), 
                                            layerData.key,
                                            current => [
                                                index === 1 ? value : current[0],
                                                index === 2 ? value : current[1],
                                            ]
                                        )
                                    }}
                                />
                            )) }

                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
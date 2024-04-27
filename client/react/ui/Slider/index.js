import { useState } from 'react'

export function Slider({ className, ...rest })
{
    const [ value, setValue ] = useState(rest.defaultValue || 0)

    return (
        <div className={ 'slider --vertical' +' '+ className } >
            <div 
                className="slider-thumb" 
                style={{ 
                    bottom: `${value-25 }px`,
                    background: `hsl(${359 - value} 100% 50%)` // because opera RTL
                }}
            ></div>

            <input 
                type="range"
                onChange={ (e) => {
                    setValue(parseInt(e.target.value))
                } }
                defaultValue={ value }
                { ...rest } 
            />
        </div>
    )
}
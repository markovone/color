export function SliderHue({ value, onChange, ...rest })
{
    return (
        <div className={ 'slider slider-hue' }>
            <input 
                type="range"
                min={ 0 } max={ 359 } step={ 1 } 
                onChange={ onChange }
                defaultValue={ value }
                { ...rest } 
            />
        </div>
    )
}
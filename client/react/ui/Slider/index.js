export function Slider({ className, onChange, value, ...rest })
{
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
                onChange={ onChange }
                defaultValue={ value }
                { ...rest } 
            />
        </div>
    )
}
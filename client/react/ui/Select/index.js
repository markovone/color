export function Select({ name, values, defaultValue, onChange })
{
    return (
        <select 
            className="select"
            name={ name } 
            defaultValue={ defaultValue }
            onChange={ onChange }
        >
            
            { values.map(({ value, label }) => (
                <option key={ 'key-' + value } value={ value }>
                    { label }
                </option>
            )) }
            
        </select>
    )
}
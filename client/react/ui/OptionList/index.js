export function OptionList({ items, name, checkedValue, onChange })
{

    return (
        <fieldset className="option-list f-r-c">

            { items.map(item => (
                <div key={ item.label }>
                    <input 
                        type='radio' 
                        id={ item.label } 
                        name={ name } 
                        value={ item.value } 
                        onChange={ onChange } 
                        defaultChecked={ item.value === checkedValue ? true : false }
                    />
                    <label htmlFor={ item.label }>
                        { item.label }
                    </label>
                </div>
            ))}

        </fieldset>
    )
}
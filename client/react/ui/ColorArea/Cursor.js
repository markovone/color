export function Cursor({ selected })
{
    return (
        <div 
            className="cursor"
            style={{
                left: selected[0] + '%',
                bottom: selected[1] + '%',
            }} 
        />
    )
}
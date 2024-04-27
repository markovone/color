export function draw(ctx, params)
{
    const unit = 5
    const [ h, s, l ] = [ params.hue, 0, 0 ]

    for (let x = 0; x < 100; x++)
    {
        for (let y = 0; y < 100; y++) {
            ctx.fillStyle = `hsl(${h} ${s+x}% ${l+y}%)`
            ctx.fillRect( x*unit, y*unit, unit, unit)
        }
    }
}
import { color } from 'src/color'

export function draw(ctx, params)
{
    const canavsSize = ctx.canvas.getBoundingClientRect()

    hueSlice(params.hue, canavsSize.width/100, params.colorModel, ctx)
}


function hueSlice(hue, unit, colorModel, ctx)
{
    const [ h, x, y ] = [ hue, 0, 0 ]

    for (let i = 0; i < 100; i++)
    {
        for (let j = 0; j < 100; j++) 
        {
            const colorNorm = color([ h, x+i, y+j ]).normalize(colorModel)
            const hsl = colorModel === 'hsv' ? colorNorm.convert('hsv2hsl') : colorNorm

            ctx.fillStyle = hsl.format('hsl')
            ctx.fillRect( i*unit, j*unit, unit, unit)
        }
    }
}
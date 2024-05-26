import { color } from 'src/color'

export function drawHueSlice(ctx, params)
{
    const colorModels = {
        hsl: hueSliceByLines,
        hsv: hueSliceByGradients
    }

    // console.log('drawHueSlice')

    ctx.translate(0, 300)
    ctx.scale(1, -1)
    
    colorModels[params.colorModel](ctx, params)
}


function hueSliceByGradients(ctx, params)
{
    const { width, height } = ctx.canvas.getBoundingClientRect()
    const hue = params.channels[0]

    const gradientBlack = ctx.createLinearGradient(0, 0, 0, height)
    gradientBlack.addColorStop(0, `rgba(0,0,0,1)`)
    gradientBlack.addColorStop(1, `rgba(0,0,0,0)`)

    const gradientWhite = ctx.createLinearGradient(0, 0, width, 0)
    gradientWhite.addColorStop(0, `rgba(255,255,255,1)`)
    gradientWhite.addColorStop(1, `rgba(255,255,255,0)`)

    ctx.fillStyle = `hsl(${hue} 100% 50%)`
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = gradientWhite
    ctx.fillRect(0, 0, width, height)
    
    ctx.fillStyle = gradientBlack
    ctx.fillRect(0, 0, width, height)
}

function hueSliceByLines(ctx, params)
{
    const { width } = ctx.canvas.getBoundingClientRect()
    const hue = params.channels[0]
    const unit = width/100

    for (let i = 0; i < 100; i++) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0)

        const start = [ hue, 0, i ]
        const stop = [ hue, 100, i ]

        gradient.addColorStop(0, `hsl(${start[0]} ${start[1]} ${start[2]})`)
        gradient.addColorStop(1, `hsl(${stop[0]} ${stop[1]} ${stop[2]})`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, (i)*unit, width, unit)
    }
}


function hueSliceByPixels(ctx, { hue, colorModel })
{
    const [ h, x, y ] = [ hue, 0, 0 ]
    const { width } = ctx.canvas.getBoundingClientRect()
    const unit = width/100

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
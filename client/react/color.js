export function color(value)
{
    const data = parse(value)

    return {
        data,
        get colorModel() { return data.colorModel },
        get isNormalized() { return data.isNormalized },
        get channels() { return data.channels },
        getChannel: (i) => data.channels[i],
        change: (fn) => color(fn(data)),
        convert: (fromTo) => color(convert(data, fromTo)),
        format: (colorModel = 'rgb') => format(data, colorModel)
    }
}

function parse(value)
{
    if (Array.isArray(value)) 
    {
        return {
            channels: value,
            isNormalized: false,
            colorModel: 'rgb'
        }
    } 
    else if (typeof value === 'object' && !Array.isArray(value) && value !== null) 
    {
        const { channels, colorModel, isNormalized } = value

        return {
            channels,
            isNormalized,
            colorModel
        }
    }
    else if (typeof v === 'string')
    {
        // TODO
    }
}


function normalize({ channels, colorModel }) 
{
    switch (colorModel) {
        case 'rgb':
            return channels.map(item => item/255)
        
        case 'hsl':
            return [ channels[0]/359, channels[1]/100, channels[2]/100 ]

        case 'hsv':
            return [ channels[0]/359, channels[1]/100, channels[2]/100 ]
    
        default:
            return channels
    }
}

function denormalize({ channels, colorModel })
{
    switch (colorModel) {
        case 'rgb':
            return channels.map(c => c*255)
        
        case 'hsl':
            return [ channels[0]*359, channels[1]*100, channels[2]*100 ]

        case 'hsv':
            return [ channels[0]*359, channels[1]*100, channels[2]*100 ]

        default:
            return channels
    }
}

function convert(color, fromTo)
{
    const channels = color.isNormalized ? color.channels : normalize(color)

    switch (fromTo) {       
        case 'hsv2hsl': {
            return {
                channels: denormalize({ 
                    channels: hsv2hsl(channels), 
                    colorModel: 'hsl',
                }),
                colorModel: 'hsl',
            }
        }

        case 'hsl2hsv': {
            return {
                channels: denormalize({ 
                    channels: hsl2hsv(channels), 
                    colorModel: 'hsv',
                }),
                colorModel: 'hsv',
            }
        }

    default:
            return color
    }

}

function format(value, colorModel)
{
    const color = denormalize(value, colorModel)

    switch (colorModel) {
        case 'hsl':
            return `hsl(${color[0]} ${color[1]}% ${color[2]}%)`
    
        default:
            return `rgb(${color[0]} ${color[1]} ${color[2]})`
    }
}

function hsv2hsl([ h, s, v ], l=v-v*s/2, m=Math.min(l,1-l))
{
    return [ h, m?(v-l)/m:0, l ]
}

function hsl2hsv(hsl)
{
    const [ h, s, l ] = hsl

    const value = s * Math.min(l, 1-l) + l
    const saturation = value === 0 ? 0 : 2 - (2*(l/value))

    return [ h, saturation, value ]
}

function hslToRgb(h, s, l)
{
    const { round } = Math;
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1/3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1/3);
    }
  
    return [round(r * 255), round(g * 255), round(b * 255)];
  }


  function hueToRgb(p, q, t) 
  {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }
export function color(value)
{
    return {
        value,
        normalize: (colorModel) => color(normalize(value, colorModel)),
        convert: (fromTo) => color(convert(value, fromTo)),
        format: (colorModel = 'rgb') => format(value, colorModel)
    }
}

function normalize(value, colorModel) 
{
    switch (colorModel) {
        case 'rgb':
            return value.map(item => item/255)
        
        case 'hsl':
            return [ value[0]/359, value[1]/100, value[2]/100 ]

        case 'hsv':
            return [ value[0]/359, value[1]/100, value[2]/100 ]
    
        default:
            return value
    }
}

function denormalize(value, colorModel)
{
    switch (colorModel) {
        case 'rgb':
            return value.map(c => c*255)
        
        case 'hsl':
            return [ value[0]*359, value[1]*100, value[2]*100 ]

        case 'hsv':
            return [ value[0]/359, value[1]/100, value[2]/100 ]

        default:
            return value
    }
}

function convert(value, fromTo)
{
    switch (fromTo) {       
        case 'hsv2hsl': {
            return hsv2hsl(...value)
        }

    default:
            return value
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

function hsv2hsl(h, s, v, l=v-v*s/2, m=Math.min(l,1-l))
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
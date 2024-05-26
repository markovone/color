export function position2Coordinates(e)
{
    const bounds = e.target.getBoundingClientRect()
    const unit = bounds.width / 100

    return [
        parseInt((e.clientX - bounds.left) / unit),
        parseInt((bounds.height - (e.clientY - bounds.top)) / unit)
    ]
}

export function genKey()
{
    return Math.floor(Math.random() * Math.pow(2, 24)).toString(32)
}


export function debounce(fn, delay, timer = 0)
{
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, args)
        }, delay)
    }
}
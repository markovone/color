import { useEffect, useRef } from 'react'


export function useCanvas(draw, size = null)
{
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const { width, height } = size ?? canvas.parentNode.getBoundingClientRect()
        
        canvas.width = width
        canvas.height = height
        
        draw.forEach(drawFn => drawFn(ctx))
        
    }, [ draw ])

    return { canvasRef }
}

import { useEffect, useRef } from 'react'


export function useCanvas(w, h, draw, params)
{
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const { width, height } = w && h 
            ? { width: w, height: h }
            : canvas.parentNode.getBoundingClientRect()
        
            canvas.width = width
            canvas.height = height
        
        draw(ctx, params)
    }, [ draw, params ])

    return { canvasRef }
}

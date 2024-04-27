import { useEffect, useRef } from 'react'


export function useCanvas(size, draw, params)
{
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const { width, height } = size ?? canvas.parentNode.getBoundingClientRect()
        
        canvas.width = width
        canvas.height = height
        
        draw(ctx, params)
    }, [ draw, params ])

    return { canvasRef }
}

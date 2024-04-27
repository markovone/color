import { useEffect, useRef } from 'react'


export function useCanvas(render, size)
{
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const { width, height } = size ?? canvas.parentNode.getBoundingClientRect()
        
        canvas.width = width
        canvas.height = height
        
        render(ctx)
    }, [ render ])

    return { canvasRef }
}

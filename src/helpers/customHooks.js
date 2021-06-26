import  { useRef, useEffect } from 'react'

export const useDidUpdateEffect = (fn) => {
    const isDidMounted = useRef(false);
    useEffect(() => {
        if (isDidMounted.current) fn();      
        else isDidMounted.current = true;
    })
}
   
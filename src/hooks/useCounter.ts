import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from 'gsap';


export const useCounter = ({ maxCount = 10 }) => {

  const [counter, setCounter] = useState(5)
  const elementToAnimate = useRef<any>(null);
  const tl = useRef(gsap.timeline()); //Se crea una sola vez y tenemos la referencia en memoria

  const handleClick = () => {
    setCounter(prev => Math.min(prev + 1, maxCount));
  }

  useLayoutEffect(() => {
    if (!elementToAnimate.current) return;
    tl.current.to(elementToAnimate.current, { y: -10, duration: 0.2, ease: 'ease.out' })
      .to(elementToAnimate.current, { y: 0, duration: 1, ease: 'bounce.out' })
      .pause();
  }, [])

  useEffect(() => {
    tl.current.play(0);
  }, [counter])

  return {
    counter,
    elementToAnimate,
    handleClick,
  }
}
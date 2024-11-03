import { useState, useEffect } from "react"

function useHandleResize() {
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1200)
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isDesktop
}

export default useHandleResize
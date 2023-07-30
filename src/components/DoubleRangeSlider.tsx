import { useEffect, useRef, useState } from 'react'

interface Props {
  initialMin?: number
  initialMax?: number
  min?: number
  max?: number
  gap?: number
  step?: number
  onChange?: (min: number, max: number) => void
}

export const DoubleRangeSlider: React.FC<Props> = ({
  initialMin = 0,
  initialMax = 1000,
  min = 0,
  max = 1000,
  gap = 100,
  step = 10,
  onChange
}) => {
  const [sliderRange, setSliderRange] = useState({
    rangeMin: initialMin,
    rangeMax: initialMax
  })
  const ref = useRef<HTMLInputElement[]>([])
  const progressRef = useRef<HTMLDivElement>(null)

  const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputClass = e.target.className

    const minVal = parseInt(ref.current[0].value)
    const maxVal = parseInt(ref.current[1].value)

    if (maxVal - minVal < gap) {
      if (inputClass.split(' ')[0] === 'range_min') {
        setSliderRange({ rangeMin: maxVal - gap, rangeMax: maxVal })
      } else {
        setSliderRange({ rangeMin: minVal, rangeMax: minVal + gap })
      }
    } else {
      setSliderRange({ rangeMin: minVal, rangeMax: maxVal })
    }

    onChange?.(minVal, maxVal)
  }

  useEffect(() => {
    if (ref.current[0] && ref.current[1] && progressRef.current) {
      progressRef.current.style.left = `${(parseInt(ref.current[0].value) / parseInt(ref.current[0].max)) * 100
        }%`

      progressRef.current.style.right = `${100 -
        (parseInt(ref.current[1].value) / parseInt(ref.current[1].max)) * 100
        }%`
    }
  }, [sliderRange])

  return (
    <>
      <div className="w-full">
        <div className="w-full flex my-4">
          <div className="flex w-full h-[35px] items-center gap-2">
            <span>Min</span>
            <input
              type="text"
              className="w-full h-full outline-none rounded-md text-center border border-gray-400"
              value={`S/ ${sliderRange.rangeMin}`}
              readOnly
            />
          </div>
          <div className="w-32 flex text-lg items-center justify-center">-</div>
          <div className="flex w-full h-[35px] items-center gap-2">
            <span>Max</span>
            <input
              type="text"
              className="w-full h-full outline-none rounded-md text-center border border-gray-400"
              value={`S/ ${sliderRange.rangeMax}`}
              readOnly
            />
          </div>
        </div>
        <div className="h-1 relative rounded bg-gray-200">
          <div
            ref={progressRef}
            className="h-full absolute rounded bg-indigo-500"
          />
        </div>
        <div className="relative">
          <input
            ref={(el) => el && (ref.current[0] = el)}
            type="range"
            className="range_min absolute w-full h-1 pointer-events-none appearance-none -top-1 outline-none bg-transparent"
            min={min}
            max={max}
            value={sliderRange.rangeMin}
            step={step}
            onChange={handleRange}
          />
          <input
            ref={(el) => el && (ref.current[1] = el)}
            type="range"
            className="range_max absolute w-full h-1 pointer-events-none appearance-none -top-1 outline-none bg-transparent"
            min={min}
            max={max}
            value={sliderRange.rangeMax}
            step={step}
            onChange={handleRange}
          />
        </div>
      </div>
    </>
  )
}

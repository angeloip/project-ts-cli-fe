import { FaImage } from 'react-icons/fa'

export const SingleProductSkeleton = () => {
  return (
    <div role="status" className="animate-pulse bg-white rounded-lg shadow">
      <div className="p-5 h-[200px]">
        <div className="flex items-center justify-center w-full h-full  bg-gray-300 rounded ">
          <FaImage className="text-gray-500 text-4xl" />
        </div>
      </div>

      <div className="w-full px-5 pb-5 flex flex-col gap-5">
        <div className="h-14 bg-gray-300 rounded-md"></div>
        <div className="h-5 bg-gray-300 rounded-md w-6"></div>
        <div className="h-[28px] bg-gray-300 rounded-md w-20"></div>
        <div className="h-10 bg-gray-300 rounded-md"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// src/components/FeatureCard.jsx
import { Link } from "react-router-dom"

const FeatureCard = ({ image, title, description, link }) => {
  return (
    <div className="max-w-sm bg-white  rounded-lg shadow-sm dark:bg-gray-800 hover:scale-105 duration-200 ease-in-out cursor-pointer">
      <img className="rounded-t-lg w-full h-72 object-cover" src={image} alt={title} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <Link
          to={link}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
          bg-teal-500 hover:bg-teal-600 rounded-lg  
          focus:ring-blue-300"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default FeatureCard

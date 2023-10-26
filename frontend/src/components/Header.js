import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {

  const navigate = useNavigate()
  return (
    <>
      <nav className="flex justify-between items-center p-5 text-gray-50 text-lg font-semibold select-none">
        <div className="flex gap-16">
          <div>
            🎯 <Link to="/" className="text-yellow-500">Upskill Me</Link>
          </div>
          <div>
            <ul className="flex gap-4">
              <li className="hover:text-gray-300"><Link to="/">Home</Link></li>
              <li className="hover:text-gray-300"><Link to="/form">Career Quiz</Link></li>
              <li onClick={()=>{navigate('/roadmap/result')}} className="hover:text-gray-300"><Link>Roadmap</Link></li>
              <li className="hover:text-gray-300"><Link>Track Progress</Link></li>
            </ul>
          </div>
        </div>
        <div className="py-1 px-4 bg-gray-700 rounded-2xl cursor-pointer">
          Login/Signup
        </div>
      </nav>
    </>
  )
}

export default Header

// <Link to="/">Home</Link>

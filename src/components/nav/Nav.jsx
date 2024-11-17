import { AiFillMessage } from 'react-icons/ai'
import { FaMicrophone } from 'react-icons/fa6'
import { IoIosBriefcase, IoIosNotifications } from 'react-icons/io'
import { RiHome5Fill, RiMenuFill, RiSearchLine } from 'react-icons/ri'

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-[#00b4b7] shadow-md z-50">
      <div className="w-3/4 mx-auto h-full flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-4 ">
          {/* Menu Button */}
          <button className="p-2 rounded-full hover:bg-[#009ea0] transition-all duration-300">
            <RiMenuFill className="text-white" size={24} />
          </button>

          {/* Search Bar */}
          <div className="flex bg-white h-10 min-w-[400px] max-w-[600px] rounded-full overflow-hidden shadow-sm">
            <input
              className="flex-1 outline-none px-4 text-sm text-gray-600 placeholder-gray-400"
              type="text"
              placeholder="Buscar"
            />
            <button className="w-12 flex justify-center items-center bg-[#f3f3f3] hover:bg-[#e0e0e0] transition-all duration-300">
              <RiSearchLine size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Microphone Button */}
          <button className="w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#f3f3f3] transition-all duration-300">
            <FaMicrophone className="text-[#00b4b7]" size={18} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Navigation Icons */}
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#f3f3f3] transition-all duration-300">
              <RiHome5Fill size={20} className="text-[#00b4b7]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#f3f3f3] transition-all duration-300">
              <IoIosBriefcase size={20} className="text-[#00b4b7]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#f3f3f3] transition-all duration-300">
              <AiFillMessage size={20} className="text-[#00b4b7]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-md hover:shadow-lg hover:bg-[#f3f3f3] transition-all duration-300">
              <IoIosNotifications size={20} className="text-[#00b4b7]" />
            </button>
          </div>

          {/* Profile Picture */}
          <button className="w-10 h-10 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <img
              src="/public/profile.png"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav

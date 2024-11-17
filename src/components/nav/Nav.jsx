import { AiFillMessage } from 'react-icons/ai'
import { FaMicrophone } from 'react-icons/fa6'
import { IoIosBriefcase, IoIosNotifications } from 'react-icons/io'
import {
  RiHome5Fill,
  RiHome5Line,
  RiHomeLine,
  RiMenuFill,
  RiSearchLine,
} from 'react-icons/ri'

const Nav = () => {
  return (
    <nav className="absolute top-0 left-0 w-full h-16 bg-[#00b4b7]">
      <div className="w-3/4 mx-auto h-full flex justify-between items-center">
        <div className="flex gap-2">
          <button className="mr-10">
            <RiMenuFill className="text-white" size={20} />
          </button>
          <div className="flex bg-white h-10 w-[350px] rounded-2xl overflow-hidden">
            <input
              className=" outline-none w-full px-5 h-full text-sm text-gray-400"
              type="text"
              placeholder="Buscar"
            />
            <div className="w-16 flex justify-center items-center ">
              <RiSearchLine size={18} className="text-gray-400" />
            </div>
          </div>

          <button className="w-10 h-10 rounded-full bg-[#f3f3f3] flex justify-center items-center hover:bg-[#e0e2e2] transition-all duration-300">
            <FaMicrophone className="text-[#00b4b7]" />
          </button>
        </div>

        <div className="flex gap-10 items-center">
          <div className="flex gap-2 items-center">
            <button className="w-10 h-10 rounded-full bg-slate-200 flex justify-center items-center">
              <RiHome5Fill size={20} className="text-[#00b4b7]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-200 flex justify-center items-center">
              <IoIosBriefcase size={20} className="text-[#00b4b7]" />
            </button>

            <button className="w-10 h-10 rounded-full bg-slate-200 flex justify-center items-center">
              <AiFillMessage size={20} className="text-[#00b4b7]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-200 flex justify-center items-center">
              <IoIosNotifications size={20} className="text-[#00b4b7]" />
            </button>
          </div>

          <button className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/public/profile.png" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav

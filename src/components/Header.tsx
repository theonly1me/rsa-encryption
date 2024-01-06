import Link from "next/link";
import { CiLock, CiUnlock } from "react-icons/ci";

const Header = () => {
  return (
    <div className="text-white bg-black">
      <ul className="flex gap-4 px-4 py-4">
        <li className="text-xl text-neutral-300 hover:text-neutral-200 active:text-neutral-50 transition-all duration-300">
          <Link href="/">
            <div className="flex gap-1 items-center">
              <CiLock className="text-xl" />
              <span className="hover:underline transition-all duration-300">
                Encrypt
              </span>
            </div>
          </Link>
        </li>
        <li className="text-xl text-neutral-300 hover:text-neutral-200 hover:underline active:text-neutral-50 transition-all duration-300">
          <Link href="/decrypt">
            <div className="flex gap-1 items-center">
              <CiUnlock className="text-xl" />
              <span className="hover:underline transition-all duration-300">
                Decrypt
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

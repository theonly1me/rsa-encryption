import Link from 'next/link';

const Header = () => {
  return (
    <div className="text-white bg-black">
      <ul className='flex gap-4 px-4 py-4'>
        <li className="text-xl text-neutral-300 hover:text-neutral-200 active:text-neutral-100"><Link href="/">Encrypt</Link></li>
        <li className="text-xl text-neutral-300 hover:text-neutral-200 active:text-neutral-100"><Link href="/decrypt">Decrypt</Link></li>
      </ul>
    </div>
  )
}

export default Header;
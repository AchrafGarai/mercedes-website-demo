import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {

  return (
    <div className="wrapper">
      <div className="flex-between">
          <Link href="/">
            <a>
              <Image src="/logo.png" width="67px" height="67px"></Image>
            </a>
          </Link>
          <p>Demo by <br/> Achraf Garai</p>
      </div>
    </div>
  )
}

import Image from 'next/image'

export default function Navbar() {

  return (
    <div className="wrapper">
      <div className="flex-between">
          <Image src="/logo.png" width="67px" height="67px"></Image>
          <p>Demo by <br/> Achraf Garai</p>
      </div>
    </div>
  )
}

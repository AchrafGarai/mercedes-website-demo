import Image from 'next/image'

export default function Footer() {

  return (
    <div className="wrapper">
      <div className="footer">
        <Image src="/logo.png" width="140px" height="140px"></Image>
        <h1 className="gigantic muted centered">Mercedes-Benz</h1>
      </div>

    </div>
  )
}

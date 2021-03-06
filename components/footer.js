import Container from './container'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            More stuff!
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <Link href="http://bincang.hoojah.my">
              <a
                className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
              >
                Hoojah!
              </a>
            </Link>
          </div>
        </div>
      </Container>
      <Container>
        <iframe id='kofiframe' src='https://ko-fi.com/rudzainy/?hidefeed=true&widget=true&embed=true&preview=true' className="border-none w-full p-1" height='712' title='rudzainy'></iframe>
      </Container>
    </footer>
  )
}

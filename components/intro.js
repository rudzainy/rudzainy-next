import { NAME, SELF_INTRO } from '../lib/constants'

export default function Intro({ title = NAME, description = SELF_INTRO }) {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        {title}.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        {description}
      </h4>
    </section>
  )
}

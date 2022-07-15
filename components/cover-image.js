import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

export default function CoverImage({ title, coverImage, slug }) {
  const titleThatSaysLogo = /logo/i

  const image = (
    <Image
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200 rounded-t-lg' : slug,
        'object-top object-cover' : !titleThatSaysLogo.test(title),
        'object-contain' : titleThatSaysLogo.test(title)
      })}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        // TODO: dynamic image link based on post type
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
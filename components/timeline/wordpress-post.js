import CoverImage from '../cover-image'
import Date from '../date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '../../node_modules/@fortawesome/fontawesome-svg-core/import.macro'

export default function WordpressPost({ 
  title, 
  coverImage, 
  date, 
  slug, 
  excerpt,
  link
}) {
  return (                
    <li className="mb-10 ml-6 w-fit md:w-10/12 lg:w-1/2">
      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-violet-500 rounded-full ring-8 ring-white">
        <FontAwesomeIcon icon={solid('pencil-ruler')} className="w-3 text-white" />
      </span>
      <Date dateString={date} dateClass="block pt-1 mb-2 text-sm font-normal leading-none text-gray-400" />
{/*       
      <Link href={`/posts/${slug}`}>
        <a className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100">
          {coverImage && (
            // <img class="object-cover rounded-t-lg md:h-80 md:w-48 md:rounded-none md:rounded-l-lg" src={coverImage?.node.sourceUrl} alt=""></img>
            <div class="bg-no-repeat bg-left-top h-80 w-48 rounded-none rounded-l-lg" style={{ backgroundImage: `url(${coverImage?.node.sourceUrl})` }}></div>
          )}
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
            <p className="mb-3 font-normal text-gray-700" dangerouslySetInnerHTML={{ __html: excerpt }}></p>
          </div>
        </a>    
      </Link> */}

      <div className="bg-white rounded-lg border border-gray-200 shadow-md">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        )}
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{date}</time>
          {/* <p className="mb-3 font-normal text-gray-700" dangerouslySetInnerHTML={{ __html: excerpt }} /> */}
          <a href={link} rel="noopener noreferrer" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Read more
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </a>
        </div>
      </div>
    </li>
  )
}

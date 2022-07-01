import Date from '../date';
import Link from 'next/link';

export default function Workplace({ id, title, duration, company, location, abstract, keyword, hasContent, date }) {
  return (                
    <li className="mb-10 ml-6">
      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white  ">
        <svg className="w-3 h-3 text-blue-600 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
      </span>
      <Date dateString={date} dateClass="block pt-1 mb-2 text-sm font-normal leading-none text-gray-400" />    
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="block mb-2 text-sm font-normal leading-none text-gray-400">{company} | {duration} | {location}</p>
      <div className="my-2.5">
        {keyword.map((tag, id) => 
          <span key={id} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded mr-2">{tag}</span>
        )}
      </div>
      <ul className="my-2.5">
        {abstract &&
          abstract.map((point, id) => 
            <li key={id} className="mb-4 text-base font-normal text-gray-500">{point}</li>
        )}
      </ul>
      {hasContent ? (
        <Link href={`/workplaces/${id}`}>
          <a className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700"><svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg> Read more</a>
        </Link>)
        : ""}
    </li>
  )
}

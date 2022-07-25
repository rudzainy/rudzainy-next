import Date from '../date'
import TweetEmbed from 'react-tweet-embed'


export default function Tweet({ id, date }) {
  return (                
    <li className="mb-10 ml-6">
      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white  ">
        <svg className="w-3 h-3 text-blue-600 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
      </span>
      <Date dateString={date} dateClass="block pt-1 mb-2 text-sm font-normal leading-none text-gray-400" />
      <TweetEmbed tweetId={id} options={{conversation: 'none', cards: 'hidden'}} />
    </li>
  )
}
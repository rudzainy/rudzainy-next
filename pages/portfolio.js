import Head from 'next/head'
import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Event from '../components/timeline/event'
import Workplace from '../components/timeline/workplace'
import WordpressPost from '../components/timeline/wordpress-post';
import { getAllPostsForHome } from '../lib/wordpress-api'
import { NAME } from '../lib/constants'
import { getSortedWorkplaceData } from '../lib/workplaces'
import { useState } from 'react'


export default function Portfolio({ sortedAllEvents, preview }) {
  const [showWorkplaces, setShowWorkplaces] = useState(true)
  const [showWordpressPosts, setShowWordpressPosts] = useState(true)
  const [showTwitterPosts, setShowTwitterPosts] = useState(true)

  const processedEvents = sortedAllEvents.map((event) => {
    return (
      event.hasOwnProperty('slug') ? 
        showWordpressPosts && 
          <WordpressPost
            key={event.slug}
            title={event.title}
            coverImage={event.featuredImage}
            date={event.date}
            slug={event.slug}
            excerpt={event.excerpt}
          />
        : showWorkplaces &&
          <Workplace 
            key={event.id}
            id={event.id}
            title={event.title} 
            duration={event.duration} 
            company={event.company} 
            location={event.location} 
            abstract={event.abstract}
            keyword={event.keyword}
            hasContent={event.hasContent}
            date={event.date}
            preview={preview}
          />
    )})
  
  return (
    <Layout preview={preview}>
      <Head>
        <title>{NAME}'s Portfolio</title>
      </Head>
      <Container>
        <Intro title={`${NAME}'s Portfolio`} />
      </Container>
      <Container>
        <h3>Filters</h3>
        <div className="flex flex-col mb-16">
          <label htmlFor="wordpress-toggle" className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="wordpress-toggle" className="sr-only peer" checked={showWordpressPosts} 
              onChange={(e) => setShowWordpressPosts(!showWordpressPosts)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Blog posts</span>
          </label>
          <label htmlFor="workplaces-toggle" className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="workplaces-toggle" className="sr-only peer" checked={showWorkplaces} 
              onChange={(e) => setShowWorkplaces(!showWorkplaces)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Workplaces</span>
          </label>
          <label htmlFor="portfolio-toggle" className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="portfolio-toggle" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Portfolio</span>
          </label>
          <label htmlFor="twitter-toggle" className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="twitter-toggle" className="sr-only peer" checked={showTwitterPosts} 
              onChange={(e) => setShowTwitterPosts(!showTwitterPosts)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Twitter</span>
          </label>
          <label htmlFor="instagram-toggle" className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="instagram-toggle" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Instagram</span>
          </label>
        </div>
      </Container>
      <Container className="">
        <ol className="relative border-l border-gray-200">
          {(sortedAllEvents && processedEvents)}
        </ol>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  const allWorkplacesData = getSortedWorkplaceData()
  const allEvents = [...allPosts.edges, ...allWorkplacesData]

  const sortedAllEvents = allEvents.map((event) => event.hasOwnProperty('node') ? event.node : event)

  sortedAllEvents.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });

  return {
    props: { sortedAllEvents, preview },
    revalidate: 10,
  }
}

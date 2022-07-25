import Head from 'next/head'
import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Event from '../components/timeline/event'
import Workplace from '../components/timeline/workplace'
import WordpressPost from '../components/timeline/wordpress-post'
import Tweet from '../components/timeline/tweet'
import { getAllPostsForHome } from '../lib/wordpress-api'
import { getTwitterTimelineData } from '../lib/twitter-api'
import { NAME } from '../lib/constants'
import { getSortedWorkplaceData } from '../lib/workplaces'
import { useState } from 'react'


export default function Index({ sortedAllEvents, preview }) {
  const [showWorkplaces, setShowWorkplaces] = useState(true)
  const [showWordpressPosts, setShowWordpressPosts] = useState(true)
  const [showTwitterPosts, setShowTwitterPosts] = useState(true)

  const processedEvents = sortedAllEvents.map((event) => {
    switch (event.origin) {
      case 'wordpress':
        return (
          showWordpressPosts && 
            <WordpressPost
              key={event.slug}
              title={event.title}
              coverImage={event.featuredImage}
              date={event.date}
              slug={event.slug}
              excerpt={event.excerpt}
              link={event.link}
            />
        )
      case 'workplace': 
        return(
          showWorkplaces &&
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
        )
      case 'twitter':
        return(
          showTwitterPosts && 
            <Tweet id={event.id} date={event.date} />
        )
    }
  })
  
  return (
    <Layout preview={preview}>
      <Head>
        <title>{NAME}</title>
      </Head>
      <Container>
        <Intro title={NAME} />
      </Container>
      <Container>
        <div className="flex flex-wrap sm:justify-center md:justify-end mb-16">
          <div className="text-md text-gray-500 hidden md:block">Show/hide</div>
          <label htmlFor="wordpress-toggle" className="m-3 inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="wordpress-toggle" className="sr-only peer" checked={showWordpressPosts} 
              onChange={(e) => setShowWordpressPosts(!showWordpressPosts)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Blog posts</span>
          </label>
          <label htmlFor="workplaces-toggle" className="m-3 inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="workplaces-toggle" className="sr-only peer" checked={showWorkplaces} 
              onChange={(e) => setShowWorkplaces(!showWorkplaces)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Workplaces</span>
          </label>
          <label htmlFor="twitter-toggle" className="m-3 inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="twitter-toggle" className="sr-only peer" checked={showTwitterPosts} 
              onChange={(e) => setShowTwitterPosts(!showTwitterPosts)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Twitter</span>
          </label>
          {/* <label htmlFor="portfolio-toggle" className="m-3 inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="portfolio-toggle" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Portfolio</span>
          </label>
          <label htmlFor="instagram-toggle" className="m-3 inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="instagram-toggle" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Instagram</span>
          </label> */}
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
  // Pull data from everywhere else
  const allWordpressPosts = await getAllPostsForHome(preview)
  const allWorkplacesData = getSortedWorkplaceData()
  const allTweets = getTwitterTimelineData()

  // Assign origin properties
  for (const key in allWordpressPosts.nodes) {
    allWordpressPosts.nodes[key].origin = "wordpress" 
  }
  for (const key in allWorkplacesData) {
    allWorkplacesData[key].origin = "workplace" 
  }
  for (const key in allTweets) {
    allTweets[key].origin = "twitter" 
  }

  const assignEventType = (array) => {

  }

  const allEvents = [...allWordpressPosts.nodes, ...allWorkplacesData, ...allTweets]
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

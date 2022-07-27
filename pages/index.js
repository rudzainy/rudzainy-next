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
import { useEffect, useState } from 'react'


export default function Index({ sortedAllEvents, preview }) {
  const [showWorkplaces, setShowWorkplaces] = useState(false)
  const [showWordpressPosts, setShowWordpressPosts] = useState(true)
  const [showTwitterPosts, setShowTwitterPosts] = useState(true)

  // START - Handles show & hide of helper text in filter
  // Helper text is hidden to save vertical space on small screens
  const [filterIsNotSticky, setFilterIsNotSticky] = useState(true)

  useEffect(() => {   
    window.addEventListener("scroll", listenToScroll);
    return () => 
       window.removeEventListener("scroll", listenToScroll); 
  }, [])

  const listenToScroll = () => {
    let heightToHideFrom = 350;
    const winScroll = document.body.scrollTop || 
        document.documentElement.scrollTop;
       
    if (winScroll > heightToHideFrom) { 
      filterIsNotSticky &&      // to limit setting state only the first time         
         setFilterIsNotSticky(false);
    } else {
         setFilterIsNotSticky(true);
    }  
  };
  // END
  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
  };

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
            <Tweet 
              key={event.id}
              id={event.id} 
              date={event.date} 
            />
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
      <nav className='sticky top-0 mx-auto px-8 py-2 bg-slate-100/[.98] z-50 shadow-xl'>
        { 
          filterIsNotSticky &&
            <div className="flex flex-wrap sm:justify-center md:justify-end text-sm text-gray-500 pt-2 transition transition-opacity ease-in-out">You can use these toggles to show or hide my timeline contents below.</div>
        }
        { 
          !filterIsNotSticky &&  
          <h1 className="text-xl font-bold tracking-tighter leading-tight sm:text-center md:text-right md:pr-2">
            <a onClick={goToTop}>{NAME}.</a>
          </h1>
        }
        <div className="flex flex-wrap sm:justify-center md:justify-end">
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
      </nav>
      <Container>
        <ol className="relative border-l border-gray-200 mt-16">
          {(sortedAllEvents && processedEvents)}
        </ol>
        {
          showWordpressPosts == false && showWorkplaces == false && showTwitterPosts == false &&
            <div className="grid justify-items-center">
              <div className="text-lg">Nothing to see here.</div>
              <div className="text-xl">Move along. </div>
            </div>
        }
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

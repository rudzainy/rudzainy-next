import Date from '../components/date';
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
// import { useToggle } from '../lib/helpers'
import { useState } from 'react'

// export async function getStaticProps() {
//   const allWorkplacesData = getSortedWorkplaceData();
//   return {
//     props: {
//       allWorkplacesData,
//     },
//   };
// }

export default function Portfolio({ sortedAllEvents, allWorkplacesData, allPosts: { edges }, preview }) {
  const wordpressPosts = edges
  const [showWorkplaces, setShowWorkplaces] = useState()
  const [showWordpressPosts, setShowWordpressPosts] = useState()
  const [showAllEvents, setShowAllEvents] = useState(true)

  // Uncomment to see what comes in
  // console.log('------------------------------')
  // console.log(allEvents)
  // console.log('------------------------------')
  // console.log(showWordpressPosts)
  // console.log('------------------------------')

  const processedEvents = sortedAllEvents.map((event) => {
    return (
      event.hasOwnProperty('slug') ?
        <WordpressPost
          key={event.slug}
          title={event.title}
          coverImage={event.featuredImage}
          date={event.date}
          slug={event.slug}
          excerpt={event.excerpt}
        />
    :
      <Workplace 
        key={event.id}
        title={event.title} 
        duration={event.duration} 
        company={event.company} 
        location={event.location} 
        abstract={event.abstract}
        keyword={event.keyword}
        hasContent={event.hasContent}
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
            <input type="checkbox" value="" id="portfolio-toggle" className="sr-only peer" checked={showAllEvents} 
              onChange={(e) => setShowAllEvents(!showAllEvents)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Portfolio</span>
          </label>
          <label htmlFor="twitter-toggle" className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="twitter-toggle" className="sr-only peer" />
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
          {(showWordpressPosts && wordpressPosts.length > 0) && 
            wordpressPosts.map(({ node }) => (
              <WordpressPost
                key={node.slug}
                title={node.title}
                coverImage={node.featuredImage}
                date={node.date}
                slug={node.slug}
                excerpt={node.excerpt}
              />
          ))}
          {(showAllEvents && processedEvents)}
          
          <Event />
          <Event />
          {(showWorkplaces && allWorkplacesData) && 
            allWorkplacesData.map(({ 
              id, 
              duration, 
              title, 
              company, 
              location, 
              abstract,
              keyword,
              hasContent }) => (
              <Workplace 
                key={id}
                title={title} 
                duration={duration} 
                company={company} 
                location={location} 
                abstract={abstract}
                keyword={keyword}
                hasContent={hasContent}
              />
          ))}
        </ol>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  const allWorkplacesData = getSortedWorkplaceData();
  
  // Uncomment to see what comes in
  // console.log('------------------------------')
  // console.log(await allPosts.length)
  // console.log('------------------------------')
  // console.log(allWorkplacesData.length)
  // console.log('------------------------------')

  // TODO: Combine all into a single ordered event list
  const allEvents = [...allPosts.edges, ...allWorkplacesData]
  // const allEvents = []

  const sortedAllEvents = allEvents.map((event) => event.hasOwnProperty('node') ? event.node : event)
 
  console.log("=================================")
  console.log(sortedAllEvents)


  sortedAllEvents.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });

  // allEvents.forEach((event) => {
    
  // })

  // for (var i = 0; i < allEvents.length; i++) {
  //   for (var j = 1; j < allEvents.length; j++) {
  //     if(allEvents[i].hasOwnProperty('node')){
        
  //     }
  //     // node = allEvents[i].node
  //     // workplace = allEvents[j]
  //     if(node.date < workplace.date) {
  //       allEvents.push(node)
  //       break
  //     } else {
  //       allEvents.push(workplace)
  //     }
  //   }
  // }



  // for (var i = 0; i < allEvents.length; i++) {
  //   for (var j = 0; j < allWorkplacesData.length; j++) {
  //     node = allPosts[i].node
  //     workplace = allWorkplacesData[j]
  //     console.log("==========================")
  //     console.log("node.date > workplace.date")
  //     console.log(node.date > workplace.date)
  //     if(node.date < workplace.date) {
  //       allEvents.push(node)
  //       break
  //     } else {
  //       allEvents.push(workplace)
  //     }
  //   }
  // }

  // allPosts.edges.map((node) => {
  //   allWorkplacesData.map((workplace) =>{
  //     if(node.date > workplace.date) {
  //       allEvents.push(node)
  //     } else {
  //       allEvents.push(workplace)
  //     }
  //   })
  // })

  return {
    props: { sortedAllEvents, allPosts, allWorkplacesData, preview },
    revalidate: 10,
  }

  // Sample return values
  // [
  //   {
  //     node: {
  //       title: 'Building DXC Bionix Design System: A Retrospective',
  //       excerpt: '<p>Summary Our team was tasked with designing UI and UX for DXC Bionix Commercialization effort. After gathering and studying stakeholders&#8217; requirements, the team decided to develop a new design system using InVision Design System Manager (DSM) to align with efforts from other teams for building screens and prototypes quickly during later development and production phases. Background&#46;&#46;&#46;</p>\n',
  //       slug: 'building-dxc-bionix-design-system-a-retrospective',
  //       date: '2022-06-24T09:37:09',
  //       featuredImage: [Object],
  //       author: [Object]
  //     }
  //   },
  //   {
  //     node: {
  //       title: 'The Master Plan to Get My Finances Under Control',
  //       excerpt: '<p>How many of these situations can you relate to personally? After paying all my fixed monthly expenses (eg. rent, bills, loans), I would just have enough for me to get by until the next payday. When something unexpected came along that requires immediate cash payment (eg. flat car battery,&nbsp; ad-hoc travel plans, getting sold into&#46;&#46;&#46;</p>\n',
  //       slug: 'the-master-plan-to-get-my-finances-under-control',
  //       date: '2018-11-13T19:23:13',
  //       featuredImage: [Object],
  //       author: [Object]
  //     }
  //   },
  //   {
  //     node: {
  //       title: 'Overcoming Distractions (Part 1)',
  //       excerpt: '<p>We use distractions to divert our attention from life problems. It&#8217;s an escape we use to keep ourselves from going mad. So are distractions bad? Sometimes, no. Most of the times, yes. The problem is when those distractions become too overpowering that we procrastinate to deal with the problem, or worse, totally dismiss the problem&#46;&#46;&#46;</p>\n',
  //       slug: 'overcoming-distractions',
  //       date: '2018-11-02T05:01:13',
  //       featuredImage: [Object],
  //       author: [Object]
  //     }
  //   },
  //   {
  //     node: {
  //       title: 'Meals Deals Web App',
  //       excerpt: '<p>Client Meal Deals Project Web application Responsibilities Design &amp; build Technology Stack HTML, SCSS, Ruby on Rails Contract Freelance Year 2016 Note The web app was never launched</p>\n',
  //       slug: 'meals-deals-web-app',
  //       date: '2016-06-18T10:10:00',
  //       featuredImage: [Object],
  //       author: [Object]
  //     }
  //   },
  //   {
  //     node: {
  //       title: 'Kontact Web CRM System',
  //       excerpt: '<p>Project Web CRM System Responsibilities Design user interface &amp; build Technology Stack HTML, CSS, JavaScript, ReactJS, Ruby on Rails Year 2016 Note A hobby project to build an online Customer Relationship Management System using ReactJS for the frontend and Ruby on Rails for the backend</p>\n',
  //       slug: 'kontact-web-crm-system',
  //       date: '2016-03-29T04:20:00',
  //       featuredImage: [Object],
  //       author: [Object]
  //     }
  //   },
  //   {
  //     node: {
  //       title: 'Quora Clone',
  //       excerpt: '<p>Project Quora clone&nbsp;[link] Responsibilities Build a clone of quora.com Technology stack HTML, CSS, JavaScript, Ruby on Rails Year 2015 Note This web app was built as part of a curriculum of Full-stack Web Development Bootcamp at Next Academy</p>\n',
  //       slug: 'quora-clone',
  //       date: '2015-09-05T04:20:00',
  //       featuredImage: [Object],
  //       author: [Object]
  //     }
  //   },
  //   {
  //     node: {
  //       title: 'Maritime College Corporate Branding',
  //       excerpt: '<p>Client Maritime College Project Corporate branding Responsibilities Design logo, business card &amp; letterhead Technology stack Adobe Illustrator Contract Employment Year 2012</p>\n',
  //       slug: 'maritime-college-corporate-branding',
  //       date: '2012-03-29T10:10:00',
  //       featuredImage: [Object],
  //       author: [Object]
  //     }
  //   },
  //   {
  //     node: {
  //       title: 'Malaysia Maritime Association Logo & Website',
  //       excerpt: '<p>Client Malaysia Maritime Association Project Logo &amp; website Responsibilities Design &amp; build Technology stack Adobe Photoshop, HTML, CSS, Joomla CMS Contract Freelance Year 2011 Note The website has been discontinued.</p>\n',
  //       slug: 'malaysia-maritime-association-logo-website',
  //       date: '2011-06-18T10:10:00',
  //       featuredImage: [Object],
  //       author: [Object]
  //     }
  //   },
  //   {
  //     node: {
  //       title: 'Marliyati Froz Logo',
  //       excerpt: '<p>Client Marliyati Froz Project Logo design Responsibilities Design logo Technology stack Adobe Illustrator Contract Freelance Year 2010 Note The yellow logo with red background was chosen by the client.</p>\n',
  //       slug: 'marliyati-froz-logo',
  //       date: '2010-09-01T04:20:00',
  //       featuredImage: [Object],
  //       author: [Object]
  //     }
  //   },
  //   {
  //     node: {
  //       title: 'Jabatan Kebajikan Masyarakat Web Portal',
  //       excerpt: '<p>Client Jabatan Kebajikan Masyarakat Project Web portal Responsibilities Design &amp; code frontend Technology stack Adobe Photoshop, HTML, CSS, Joomla CMS Contract Employment under Teras Solutions Sdn Bhd Year 2008 Note The web portal has since been revamped a few times. I revisited the design in 2017 and came up with a more modern take on&#46;&#46;&#46;</p>\n',
  //       slug: 'jabatan-kebajikan-masyarakat-web-portal',
  //       date: '2008-08-31T10:10:00',
  //       featuredImage: [Object],
  //       author: [Object]
  //     }
  //   }
  // ]
  // ------------------------------
  // [
  //   {
  //     id: 'uiux-designer-at-freeport',
  //     title: 'UI/UX Designer',
  //     date: '2021-08-01',
  //     duration: 'Aug - September 2021',
  //     company: 'Freeport Systems',
  //     location: 'Selangor, Malaysia',
  //     keyword: [ 'ui', 'ux' ],
  //     hasContent: true,
  //     abstract: [
  //       'Design journey map for NSW Metro integrated payment system',
  //       'Developed a new design system for in-house SaaS application using TailwindCSS'
  //     ]
  //   },
  //   {
  //     id: 'uiux-developer-at-affin',
  //     title: 'UI/UX Developer',
  //     date: '2021-01-01',
  //     duration: 'Jan - March 2021',
  //     company: 'Digital Banking, Affin Bank',
  //     location: 'Kuala Lumpur, Malaysia',
  //     keyword: [ 'ui', 'ux', 'web development' ],
  //     hasContent: false,
  //     abstract: [
  //       'Managed a project to revamp Affin Group websites',
  //       'Managed a junior UI/UX designer',
  //       'Kicked off component based design effort'
  //     ]
  //   }
  // ]
}

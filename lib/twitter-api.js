// import TwitterApi from 'twitter-api-v2'


export function getTwitterTimelineData() {
//   const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN)

//   const userTimeline = await twitterClient.v2.userTimeline(
//     process.env.TWITTER_USER_ID, 
//     { 
//       exclude: 'replies', 
//       expansions: [
//         'attachments.media_keys', 
//         'attachments.poll_ids', 
//         'referenced_tweets.id'
//       ],
//       'media.fields': ['url'], 
//       max_results: 20
//     }
//   )

//   for await (const tweet of userTimeline) {
//     const medias = userTimeline.includes.medias(tweet);
//     const poll = userTimeline.includes.poll(tweet);
  
//     if (medias.length) {
//       console.log('This tweet contains medias! URLs:', medias.map(m => m.url));
//     }
//     if (poll) {
//       console.log('This tweet contains a poll! Options:', poll.options.map(opt => opt.label));
//     }
//   }

//   return userTimeline?.tweets

  const collection = [
    // ['1544831617188777986', '07/07/2022'], ['1542042754783465472', '06/29/2022']
    // },
      {
        id: '1526817444706525184',
        date: '2022-05-18'
      },
      {
        id: '1508384922490519556',
        date: '2022-03-28'
      },
      {
        id: '1484374256779956225',
        date: '2022-01-21'
      },
      {
        id: '1478504209586606081',
        date: '2022-01-05'
      },
      {
        id: '1438308578842923009',
        date: '2021-09-16'
      }
  ]
  return collection
}


// const needle = require('needle');

// const url = `https://api.twitter.com/2/users/${process.env.TWITTER_USER_ID}/tweets`;

// // The code below sets the bearer token from your environment variables
// // To set environment variables on macOS or Linux, run the export command below from the terminal:
// // export BEARER_TOKEN='YOUR-TOKEN'
// const bearerToken = process.env.TWITTER_BEARER_TOKEN;

// const getUserTweets = async () => {
//     let userTweets = [];

//     // we request the author_id expansion so that we can print out the user name later
//     let params = {
//         "max_results": 100,
//         "tweet.fields": "created_at",
//         "expansions": "author_id"
//     }

//     const options = {
//         headers: {
//             "User-Agent": "v2UserTweetsJS",
//             "authorization": `Bearer ${bearerToken}`
//         }
//     }

//     let hasNextPage = true;
//     let nextToken = null;
//     let userName;
//     console.log("Retrieving Tweets...");

//     while (hasNextPage) {
//         let resp = await getPage(params, options, nextToken);
//         if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
//             userName = resp.includes.users[0].username;
//             if (resp.data) {
//                 userTweets.push.apply(userTweets, resp.data);
//             }
//             if (resp.meta.next_token) {
//                 nextToken = resp.meta.next_token;
//             } else {
//                 hasNextPage = false;
//             }
//         } else {
//             hasNextPage = false;
//         }
//     }

//     console.dir(userTweets, {
//         depth: null
//     });
//     console.log(`Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`);

// }

// const getPage = async (params, options, nextToken) => {
//     if (nextToken) {
//         params.pagination_token = nextToken;
//     }

//     try {
//         const resp = await needle('get', url, params, options);

//         if (resp.statusCode != 200) {
//             console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
//             return;
//         }
//         return resp.body;
//     } catch (err) {
//         throw new Error(`Request failed: ${err}`);
//     }
// }

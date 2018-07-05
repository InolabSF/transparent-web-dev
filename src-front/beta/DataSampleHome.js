// Transparent Home Data Sample

     // Project Object
    const project = {
      id : 1,
       // text recognized from user voice input
      text : 'I like Star Wars',
       // user information
      user : { userid : 'guest1' },
       // conversation cotext information ( 'state' means conversation state )
      context : { state : 'MAIN' },
       // entity extracted from transcript
      entities : [
        {
          transcript_id : 1,
          name : 'STAR WARS', // entity name
          category : 'TITLE' // entity type
        }
      ],
       // if has related contents
      has_content : true,
       // rich information content entity extracted from transcript
      related_contents : [
        {
          transcript_id : 1,
          title : 'Star Wars: The Last Jedi Trailer (Official)', // content title
          desc : 'You Tube - Star Wars - ', // content description
          url : 'https://www.youtube.com/watch?v=Q0CbN8sfihY', // content web page url
          img_url : 'https://i.ytimg.com/vi/Q0CbN8sfihY/maxresdefault.jpg', // content image url
          content_type : 'webpage', // content type (webpage or image)
          source : 'www.youtube.com', // source type
          condition : {
            related_content_id : 1,
            service : 'YouTube Data API',　// used service for serach
            word : 'STAR WARS' // used texts for serach
          }
         },
         {
           transcript_id : 1,
           title : 'KENOBI: A Star Wars Story - First Look Trailer (2019) Ewan McGregor Star Wars Solo Movie Concept',
           desc : 'You Tube - Smasher - ',
           url : 'https://www.youtube.com/watch?v=22cdBDK-8hk',
           img_url : 'https://i.ytimg.com/vi/22cdBDK-8hk/hqdefault.jpg',
           content_type : 'webpage',
           source : 'www.youtube.com',
           condition : {
            service : 'YouTube Data API',　
            word : 'STAR WARS'
           }
         }
      ]
    }








    var transcript2 = {
      id : 2,
      text : 'I met Jeff Bezos in Amazon.com',
      user : { userid : 'guest2' },
      context : { state : 'MAIN' },
      has_content : true,
      entities : [
        {
          transcript_id : 2,
          name : 'Jeff Bezos',
          category : 'PERSON'
        },
        {
          transcript_id : 2,
          name : 'Amazon.com',
          category : 'ORGANIZATION'
        }
      ],
      related_contents : [
        {
          transcript_id : 2,
          title : 'Schools, groups plan for ways to help young immigrants',
          desc : 'By SALLY HO, ASSOCIATED PRESS SEATTLE — Jan 17, 2018, 2:22 PM ET',
          url : 'http://abcnews.go.com/Politics/wireStory/schools-groups-plan-ways-young-immigrants-52413112',
          img_url : 'http://a.abcnews.com/images/Politics/WireAP_a5b00d2c640e4dfcb9c58f8f60a0c756_12x5_992.jpg',
          content_type : 'webpage',
          source : 'abcnews.go.com',
          condition : {
            service : 'Google CSE API',
            word : 'Jeff Bezos'
          }
        },
        {
          transcript_id : 2,
          title : 'Amazon sweepstakes is narrowed down to 20 competitors',
          desc : 'By JOSEPH PISANI AND CHRISTOPHER RUGABER, AP RETAIL WRITER NEW YORK — Jan 18, 2018, 4:33 PM ET',
          url : 'http://abcnews.go.com/International/wireStory/amazon-narrows-list-20-headquarters-52435505',
          img_url : 'https://assets.media-platform.com/bi/dist/images/2017/05/19/gettyimages-450831324-w960.jpg',
          content_type : 'webpage',
          source : 'abcnews.go.com',
          condition : {
            service : 'Google CSE API',
            word : 'Jeff Bezos'
          }
        },
        {
          transcript_id : 2,
          title : 'Amazon raises monthly Prime membership fees by 20 percent',
          desc : 'By JOSEPH PISANI, AP RETAIL WRITER NEW YORK — Jan 19, 2018, 10:51 AM ET',
          url : 'http://abcnews.go.com/Technology/wireStory/amazon-boosts-monthly-prime-membership-fees-20-percent-52463851',
          img_url : 'http://a.abcnews.com/images/Technology/WireAP_060a7ec134df433390243b4d8af92227_12x5_992.jpg',
          content_type : 'webpage',
          source : 'abcnews.go.com',
          condition : {
            service : 'Google CSE API',
            word : 'Amazon.com'
          }
        },
        {
          transcript_id : 2,
          title : 'Amazon | Linkedin',
          desc : 'Amazon.com',
          url : 'https://www.linkedin.com/company/amazon',
          img_url : 'https://media-exp2.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAA0ZAAAAJDk1ZjA0ZTJmLWQwYWQtNDEwNS04M2QxLTIwM2UxMTE0NTBkMw.png',
          content_type : 'webpage',
          source : 'www.linkedin.com',
          condition : {
            service : 'Google CSE API',
            word : 'Amazon.com'
          }
        }
      ]
    }

    var transcript3 = {
      id : 3,
      text : "I'm going to South by Southwest",
      user : { userid : 'guest2' },
      context : { state : 'SXSW' },
      has_content : true,
      entities : [
        {
          transcript_id : 3,
          name : 'South by Southwest',
          category : 'OTHER'
        }
      ],
      related_contents : [
        {
          transcript_id : 3,
          title : 'What is SXSW?',
          desc : 'You Tube - SXSW - ',
          url : 'https://www.youtube.com/watch?v=HzG6fy9MqpQ',
          img_url : 'https://i.ytimg.com/vi/R2bTSXy7Vzg/maxresdefault.jpg',
          content_type : 'webpage',
          source : 'www.youtube.com',
          condition : {
            service : 'YouTube Data API',
            word : 'South by Southwest'
          }
        },
        {
          transcript_id : 3,
          title : 'How to Apply for a 2018 SXSW Music Festival Showcase',
          desc : 'You Tube - SXSW - ',
          url : 'https://www.youtube.com/watch?v=4SbG4L1-gtY',
          img_url : 'https://i.ytimg.com/vi/4SbG4L1-gtY/maxresdefault.jpg',
          content_type : 'webpage',
          source : 'www.youtube.com',
          condition : {
            service : 'YouTube Data API',
            word : 'South by Southwest'
          }
        }
      ]
    }


    var transcript4 = {
      id : 4,
      text : "I'm interested in BlockChain",
      user : { userid : 'guest1' },
      context : { state : 'SXSW' },
      has_content : true,
      entities : [
        {
          transcript_id : 4,
          name : 'BlockChain',
          category : 'OTHER'
        }
      ],
      related_contents : [
        {
          transcript_id : 4,
          title : "Bitcoin: Let's Cut Through the Noise Already! | SXSW Interactive 2016",
          desc : 'You Tube - SXSW - ',
          url : 'https://www.youtube.com/watch?v=pnbJ9iIDhV0',
          img_url : 'https://i.ytimg.com/vi/pnbJ9iIDhV0/maxresdefault.jpg',
          content_type : 'webpage',
          source : 'www.youtube.com',
          condition : {
            service : 'YouTube Data API',
            word : 'BlockChain'
          }
        },
        {
          transcript_id : 4,
          title : '700+ Sessions and Special Blockchain Programming Announced for SXSW 2018',
          desc : 'We’re excited to introduce the lion’s share of SXSW Conference programming with over 700 sessions announced as well as the launch of the 2018 SXSW Schedule.',
          url : 'https://www.sxsw.com/news/2017/conference-sessions-announced-plus-blockchain-programming-sxsw-2018/',
          img_url : 'https://www.sxsw.com/wp-content/uploads/2017/10/B28A5919-1440x810.jpg',
          content_type : 'webpage',
          source : 'www.sxsw.com',
          condition : {
            service : 'Google CSE API',
            word : 'BlockChain'
          }
        },
        {
          transcript_id : 4,
          title : 'Introduction to Bitcoin and the Blockchain',
          desc : 'This session requires RSVP, and access will only be available to badge types listed under “Primary Access.”',
          url : 'https://schedule.sxsw.com/2017/events/PP68960',
          img_url : 'http://nzmusic.org.nz/media/thumbs/uploads/sxsw_1_jpg_450x450_q85.jpg',
          content_type : 'webpage',
          source : 'schedule.sxsw.com',
          condition : {
            service : 'Google CSE API',
            word : 'BlockChain'
          }
        }
      ]
    }

    var transcript5 = {
      id : 5,
      text : "Is there any remarking keynotes?",
      user : { userid : 'guest1' },
      context : { state : 'SXSW' },
      has_content : false, // no entities recognized
      entities : [],
      related_contents : []
    }

    var transcript6 = {
      id : 6,
      text : "I recommend you Melinda Gates keynote",
      user : { userid : 'guest1' },
      context : { state : 'SXSW' },
      has_content : true,
      entities : [
        {
          transcript_id : 6,
          name : 'Melinda Gates',
          category : 'PERSON'
        }
      ],
      related_contents : [
        {
          transcript_id : 6,
          title : "Convergence Keynote: Melinda Gates",
          desc : 'Philanthropist Melinda Gates has dedicated her life to achieving transformational improvements in the health and prosperity of families, communities and societies.',
          url : 'https://schedule.sxsw.com/2018/events/PP98929',
          img_url : 'https://www.sxsw.com/wp-content/uploads/2018/01/Conference-Melinda-Gates-Getty-Images-640x360.jpg',
          content_type : 'webpage',
          source : 'schedule.sxsw.com',
          condition : {
            service : 'Google CSE API',
            word : 'Melinda Gates'
          }
        },
        {
          transcript_id : 6,
          title : 'Race in America with Ken Burns and Henry Louis Gates | SXSW Convergence 2016',
          desc : 'You Tube - SXSW - ',
          url : 'https://www.youtube.com/watch?v=3cW3CmUHkZ8',
          img_url : 'https://i.ytimg.com/vi/3cW3CmUHkZ8/maxresdefault.jpg',
          content_type : 'webpage',
          source : 'www.youtube.com',
          condition : {
            service : 'YouTube Data API',
            word : 'Melinda Gates'
          }
        },
        {
          transcript_id : 6,
          title : 'Announcing Keynote Melinda Gates and Featured Speakers Michael Dell, Westworld Co-Creators, Rachel Zoe and More for SXSW 2018',
          desc : 'SXSW announces philanthropist Melinda Gates as the latest Convergence Keynote and the newest round of Featured Speakers for the 2018 programming lineup.',
          url : 'https://www.sxsw.com/news/2018/announcing-keynote-melinda-gates-featured-speakers-michael-dell-westworld-co-creators-rachel-zoe-sxsw-2018/',
          img_url : 'https://www.sxsw.com/wp-content/uploads/2018/01/Conference-Melinda-Gates-Getty-Images.jpg',
          content_type : 'webpage',
          source : 'www.sxsw.com',
          condition : {
            service : 'Google CSE API',
            word : 'Melinda Gates'
          }
        }
      ]
    }

    var transcript7 = {
      id : 7,
      text : "This youtube is that one right? I'll watch this, thanks.",
      user : { userid : 'guest2' },
      context : { state : 'MAIN' },
      has_content : false, // no entities recognized
      entities : [],
      related_contents : []
    }

    // contents array to use Initialize DOM
    var initial_transcripts = [ transcript1, transcript2, transcript3, transcript4 ];
    // contents array to use udpate DOM
    var additional_transcripts1 = [ transcript5 ];
    var additional_transcripts2 = [ transcript6, transcript7 ];
    // queue to uodate contents if neeeded
    var queue = [ additional_transcripts1, additional_transcripts2 ];

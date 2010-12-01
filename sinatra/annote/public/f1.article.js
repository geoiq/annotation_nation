// Simple "Article System" style UI for asking questions and getting answers.
// Developed for inital use in the analysis UI

if(typeof(F1)=='undefined') {F1 = {}}
(function(){
  F1.Article = function(options) {  //constructor
    this.options = options;
    if (!options.id) {options.id = 'article'} 
    F1.Article.instances[options.id] = this;
    this.init()
  }
  
  F1.Article.instances = {}
  F1.Article.prototype = {
    
    init: function(){
      _a = this // for debugging only
      this.load()
    },
    
    load: function() {
      $('#'+this.options.id).html(this.articles[this.options.article_id])
    },
    
    articles: {
      '1': "<hr style='width:100%;'/> <p style='font-size:9px; text-align: left;color:#464646;'/> <img style='float: right; border: none;' src='http://www.gravatar.com/avatar/54f0dae0be372cdd449b9d0e9f618760&amp;default=http://blog.fortiusone.com/images/gc_logo.png' alt='' width='50px' height='50px'/> <strong>About the Author:    </strong>&nbsp;Sean is the Founder and President of FortiusOne. His doctoral research focused on open data and spatial analysis of national infrastructure which inspired the development of GeoIQ and GeoCommons. He&#x27;s also an Academic geographer in rehab. </p><hr style='width:100%;'/><p><a href=\"http://en.wikipedia.org/wiki/Black_Friday_(shopping)\">Black Friday</a> has a long tradition in the United States dating back to 1966 when Philadelphians used the term to describe the disruptive pedestrian and vehicle traffic that plagued the city the day after Thanksgiving.  More recently it has come to represent the day that retailers move into the &#8220;black&#8221; of profits and has been the busy shopping day of the year since <a href=\"http://www.shoppertrak.com/shoppertrak-reports-positive-response-early-holiday-promotions-boosts-projections-2010-holiday-seaso\">2005</a>.  Retailers and brands compete heavily to capture consumers with a variety or promotions and deals.  Early indicators point towards this past Black Friday being a strong one &#8211; even using remote sensing from satellite imagery to make the <a href=\"http://blogs.wsj.com/economics/2010/11/24/forecasting-black-friday-from-outer-space/\">conclusion</a>.</p>\
      <p>We figured this was a great opportunity to take some of the Twitter monitoring we&#8217;ve been experimenting with and give it a full blown analysis.  Chris Helm built us an awesome streaming client in <a href=\"http://nodejs.org/\">NodeJS</a> and stored the data in <a href=\"http://www.mongodb.org/\">MongoDB</a>, so we could pipe it into GeoCommons for analysis.  We are running the data collection from Black Friday to <a href=\"http://en.wikipedia.org/wiki/Cyber_Monday\">Cyber Monday</a>, but will just be discussing the results from Black Friday in this post.  </p>\
      <p><strong>Methodology</strong></p>\
      <p>We hooked into Twitter&rsquo;s <a href=\"http://dev.twitter.com/pages/streaming_api\">streaming API </a>called the &ldquo;gardenhose&rdquo; to monitor mention of major brands during Black Friday.  The &ldquo;gardenhose&rdquo; provides a sample of all the &ldquo;tweets&rdquo; streaming at any point in time.  Rough estimates are the &ldquo;gardenhose&rdquo; collects about 10% of all the Tweets running through Twitter in a day.  Across this stream of Tweets we collected every &ldquo;tweet&rdquo; that mentioned one of the following key words:</p>\
      <p>&#8216;black friday&#8217;, &#8216;Apple&#8217;, &#8216;apple&#8217;, &#8216;Microsoft&#8217;, &#8216;microsoft&#8217;, &lsquo;Sony&#8217;, &#8216;sony&#8217;, &#8216;Dell&#8217;, &#8216;dell&lsquo;, &#8216;Macys&#8217;, &#8216;macys&#8217;, &#8216;Macy\&#8217;s&#x27;, &#8216;macy\&#8217;s&lsquo;, &#8216;Sears&#8217;, &#8216;sears&lsquo;, jcpenney&#8217;, &#8216;JCPenney&lsquo;, &#8216;Bloomingdales&#8217;, &#8216;bloomingdales&lsquo;,nordstrom&#8217;, &#8216;Nordstrom&lsquo;, &#8216;kohls&#8217;, &#8216;Kohls&lsquo;, &#8216;Best Buy&#8217;, &#8216;best buy&#8217;, &#8216;bestbuy&#8217;, &#8216;BestBuy&lsquo;, &#8216;Walmart&#8217;, &#8216;walmart&lsquo;, &#8216;Target&#8217;,&#x27;target&lsquo;, &#8216;Starbucks&#8217;, &#8216;starbucks&#8217;, &#8216;sbucks&lsquo;, &#8216;Nintendo&#8217;, &#8216;nintendo&lsquo;, &#8216;ps3&#8242;, &#8216;PS3&lsquo;, &#8216;xbox&#8217;, &#8216;XBox&#8217;, &#8216;XBOX&lsquo;, &#8216;Nieman Marcus&#8217;, &#8216;nieman marcus&lsquo;, &#8216;Gap&#8217;, &#8216;gap&lsquo;, &#8216;Amazon&#8217;, &#8216;amazon&lsquo;, &#8216;kinect&lsquo;, &#8216;ebay&#8217;</p>\
      \
      <p><strong>Results</strong></p>\
      <p>The data collection ran from 12:00 am to 11:59 pm Friday the 26th of November.  During this time a sample of 371,480 tweets were collected.  This data was then filtered to calculate the total number of mentions for each brand across the sample.  Next all the tweets that identified their location from a mobile devices were separated from the sample.  The following slides will illustrate the results on analyzing the data.</p>\
      <div style=\"width:425px\" id=\"__ss_5954783\"><strong style=\"display:block;margin:12px 0 4px\"><a href=\"http://www.slideshare.net/seagor/black-friday-twitter-brand-analysis\" title=\"Black Friday Twitter Brand Analysis\">Black Friday Twitter Brand Analysis</a></strong>\
      </div>\
      <p>To get a more detailed perspective on the data we&#8217;ve built a map of all the tweets that came from location enabled mobile devices sized by the number of people the tweets were sent to (proxy for audience size).  You can click the play button and animate the tweets over the course of the day to see  where tweets are by both time and location.  Zoom into a city to see the exact location of the tweet.  To get your own copy of this map to embed go &#8220;<a href=\"http://geocommons.com/maps/38643\">here</a>&#8221; and click details.</p>\
      \
      <p><strong>Walmart vs Target</strong></p>\
      <p>While there were lots of interesting trends I thought it was worth breaking out one the biggest brand rivalries from Black Friday &#8211; Walmart vs. Target.</p>\
      <p><a href=\"http://www.flickr.com/photos/89545988@N00/5216203378/\" title=\"walmart_vs_target by interfortius, on Flickr\"><img src=\"http://farm5.static.flickr.com/4132/5216203378_81f93daa93.jpg\" width=\"500\" height=\"385\" alt=\"walmart_vs_target\" /></a></p>\
      <p><strong>The @JustinBieber Effect</strong></p>\
      <p>At first glance it would seem that Walmart dominated Target with almost double the tweets and almost tripple the audience, but that is before we take into account the Justin Bieber effect.  Bieber exclusively <a href=\"http://mediamemo.allthingsd.com/20101126/target-buys-black-friday-from-twitter-but-wal-mart-gets-justin-bieber/\">released</a> a new acoustic album through Walmart on Black Friday.  Of the 62,263 tweets that mentioned &ldquo;Walmart&rdquo; 25,505 of them also mentioned Justin Bieber.  41% on the Walmart tweets can be tied directly to their exclusive with Justin Bieber.  The average audience for each of the tweets that mentioned Justin Bieber and Walmart was 1,757.  The highest of all the brands monitored.  When the Justin Bieber effect is discounted Target with 37,353 tweets is actually slightly ahead of Walmart with 36,758 tweets.  All the more interesting because Target bought the Black Friday key word on Twitter to advertise their promotions.  </p>\
      <p>We can also break down the Target and Walmart tweets by which came from location enabled mobile devices.  When it comes to location based tweeting Target is the dominant player with 1,127 tweets vs. Walmart&#8217;s 865.  When we break this down by state we can see which retailer has the upper hand across location enabled mobile devices.</p>\
      \
      <p><a href=\"http://www.flickr.com/photos/89545988@N00/5217481267/\" title=\"target_vs_walmart by interfortius, on Flickr\"><img src=\"http://farm6.static.flickr.com/5167/5217481267_dfb1b6b525.jpg\" width=\"575\" height=\"398\" alt=\"target_vs_walmart\" /></a></p>\
      <p>On a personal note doing this analysis from a spreadsheet of points to final analysis was about five minutes in GeoCommons with the new analytic tools &#8211; 1) aggregating to state for Walmart and Target 2) merging the aggregated data sets together 3) calculating a difference between the count of Walmart and Target tweet by state.  </p>\
      <p>Whether Target&#8217;s lead in activity on GPS enabled mobile devices is a cause or effect of their focus on location based marketing through work with <a href=\"http://mashable.com/2010/11/16/shopkick-target/\">Shopkick</a> and <a href=\"http://www.mobilemarketingwatch.com/target-stores-to-bring-mobile-coupons-mainstream-5694/\">mobile ads</a> remains to be seen.  It does appear they are cultivating a customer base that is savvy with both mobile devices and leveraging location.</p>\
      <p>We&#8217;ll be following up this post with our analysis of Cyber Monday to see the comparison between the biggest offline and biggest online shopping day of the year.</p>",
      
      '2':  "<object id=\"__sse5954783\" width=\"425\" height=\"355\"><param name=\"movie\" value=\"http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=blackfridaytwitterbrandanalysis-101128171955-phpapp01&#038;stripped_title=black-friday-twitter-brand-analysis&#038;userName=seagor\" /><param name=\"allowFullScreen\" value=\"true\"/><param name=\"allowScriptAccess\" value=\"always\"/><embed name=\"__sse5954783\" src=\"http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=blackfridaytwitterbrandanalysis-101128171955-phpapp01&stripped_title=black-friday-twitter-brand-analysis&userName=seagor\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"499\" height=\"455\"></embed></object>"      
    }
    
  }
   
      
})();  // preserving the global namespace

# A Hacker's Bookmarks - weekend project

### The situation

Bookmarks are an awesome browser feature that helps you keep track of all you favourite web pages and resources. I have a 9 to 5 job where during the day I'm too busy to read all the interesting web pages that I visit, so I just bookmark them.

### The problem
When I get home, where I have free time to surf the internet, I cannot access all those awesome hacker stories that I bookmarked during the day.

### Possible solution

Googling the web brought up a number of bookmarking services like Netvouz, Ma.gnolia, and Del.icio.us but none of them was quite right for my simple need, "just to carry my bookmarks" wherever I go.

After much deliberation I finally decided that if I needed a tailored bookmarking service, I was going to build it myself.

### THE SOLUTION

A hacker's bookmarks is written in 100% JavaScript and stores all bookmarks in a Google Docs Spreadsheet. To retrieve data, the application creates a YQL query that returns data in JSONP format.

The most wonderful thing about this app is that it does not require a cent to set up!    
**Site Hosting:** Github (free)   
**Data Storage:** Google Docs Spreadsheet (free)   
**Data Retrieval:** Yahoo! YQL (free)   
# A Hacker's Bookmarks

### The situation

Bookmarks are an awesome browser feature that helps you keep track of all web pages that you you would like to revisit. I have a 9 to 5 job where during the day i'm too busy to read all the interesting web pages that i visit, so i just bookmark them.

### The problem
When i get home, where i have free time to surf the internet, i cannot access all those awesome hacker stories that i bookmarked during the day.

### Possible solution

Googling the web brought up a number of bookmarking services like Netvouz, Ma.gnolia, and Del.icio.us but none of them was quite right for my simple need, "just to carry my bookmarks" wherever i go.

After much deliberation I finally decided that if i needed a tailored bookmarking service, i was going to build it myself(troubles of being a self-proclaimed hacker) - here is my solution.

### THE SOLUTION

A hacker's bookmarks is written in 100% JavaScript and stores all bookmarks in a Google Docs Spreadsheet. To retrieve data, the application creates a YQL query that returns data in JSONP format.

The most wonderful thing about this app is that it does not require a cent to set up!    
**Site Hosting:** Github (free)   
**Data Storage:* Google Docs Spreadsheet (free)   
**Data Retrieval:** Yahoo! YQL (free)   
/*
****************************************************
COPYRIGHT © 2011 Raging Flame
AUTHOR: Qawelesizwe Mlilo
Email: qawemlilo@gmail.com
****************************************************
*/

(function (g_url, win) {
    var HACKER_BOOKMARKS = {
        url: '',
        
        html: '',
        
        whichDay: function (date) { // converts date to relative date
            var d = Date.parse(date), dateFunc = new Date(),
                timeSince = dateFunc.getTime() - d, inSeconds = timeSince / 1000,
                inMinutes = timeSince / 1000 / 60, inHours = timeSince / 1000 / 60 / 60,
                inDays = timeSince / 1000 / 60 / 60 / 24, inMonths = timeSince / 1000 / 60 / 60 / 24 / 30,
                inYears = timeSince / 1000 / 60 / 60 / 24 / 365, 
                relativeTime, 
                holder;
            
            if (Math.round(inSeconds) === 1) { // in seconds
                relativeTime = "second_1";
            }
            else if (inMinutes < 1) {
                relativeTime = "seconds_" + Math.floor(inSeconds);
            }
            
            else if (Math.round(inMinutes) === 1) {  // in minutes
                relativeTime = "minute_1";
            }
            else if (inHours < 1) {
                holder = (Math.round(inMinutes) === 60) ? 59 : Math.round(inMinutes);
                relativeTime =  "minutes_" + holder;
            }
            
            else if (Math.round(inHours) === 1) { // in hours
                relativeTime = "hour_1";
            }
            else if (inDays < 1) {
                holder = (Math.round(inHours) === 24) ? 23 : Math.round(inHours);
                relativeTime =  "hours_" + holder;
            }
            
            else if (Math.round(inDays) === 1) { // in days
                relativeTime = "day_1";
            }
            else if (inMonths < 1) {
                holder = (Math.round(inDays) === 30) ? 29 : Math.round(inDays);
                relativeTime =  "days_" + holder;
            }
            
            else if (Math.round(inMonths) === 1) {   // in months
                relativeTime = "month_1";
            }
            else if (inYears < 1) {
                holder = (Math.round(inMonths) === 12) ? 11 : Math.round(inMonths);
                relativeTime = "months_" + holder;
            }
            
            else if (Math.round(inYears) === 1) { // in years
                relativeTime = "year_1";
            }
            else {
                relativeTime = "years_" +Math.round(inYears);
            }
            
            return relativeTime;
        },
	
        // creates a JSONP YQL query from a url which returns results in JSON format
        getBookmarks: function (url, callback) {
	        //configures for cache and new requests
	        if (!this.url) {
                this.url = url;
            }
		
            var js = document.createElement("script"),
            yqlRestfulQuery = "http://query.yahooapis.com/v1/public/yql?q=",
            myQuery = 'select * from csv where url="' + url + '"',
            completeQuery = yqlRestfulQuery + encodeURIComponent(myQuery) + "&format=json&callback=" + callback;
            
            js.src = completeQuery;
            js.src = completeQuery;
            
            if (!document.getElementsByTagName("head")[0].appendChild(js)) {
                document.body.appendChild(js);
            }
        },
        
        // generate HTML from the JSON returned by a YQL query
        generateHTML: function (jsonData) { 
            var htmloutput = "", day, i, z, objKey, temp = {}, temp_str, cont_str = '', mystr, len;
            
            for (i = 1; i <  jsonData.length; i += 1) {
                day = this.whichDay(jsonData[i].col0);
                
                if (typeof jsonData[i].col1 !== 'undefined' && typeof jsonData[i].col2 !== 'undefined') {
                    if (!(!!temp[day])){
                        temp[day] = [];
                    }
                    
                    temp[day].push({'link': jsonData[i].col1, 'title': jsonData[i].col2});
                }
	        }
		
	        htmloutput += '<a style="color:red; padding-right: 5px; text-align: right; text-decoration:none; width: 100%; font-size: 18px" href="javascript: (function(){try{document.body.removeChild(document.getElementById(\'hacker_bookmark_panel\'));} catch(error){}})();">[x] </a>';
            
            htmloutput += '<h3 style="font-size: 18px; color: #000000;" class="">A Hacker\'s Bookmarks</h3>';
            
            for (objKey in temp) {
                if (temp.hasOwnProperty(objKey)) {
                    mystr = objKey.split("_");
                    temp_str = '<a class="" style="color: #000; font-family: "Myriad Pro",Arial,Helvetica,sans-serif;" href="javascript:openHBMs(\'' + objKey + '\');" onmouseover="openHBMs(\''+ objKey + '\');"><strong>' + mystr[1] + ' ' + mystr[0] + ' ago</strong></a><br />';
                    temp_str += '<div style="line-height: 140%; padding-left: 5px; display: none; color: white; margin-bottom: 10px;" id="' + objKey + '">';
                
                    len = temp[objKey].length;
                
                    for (z = 0; z <  len; z += 1) {
                        temp_str += '<a target="_blank" style="font-family: Arial; font-size: 12px;" title="' + temp[objKey][z].title + '" href="' + temp[objKey][z].link + '"> - ' + (temp[objKey][z].title).substring(0, 40) + '... </a> <br />';
		            }
                
                    temp_str += '</div>';
                    cont_str = temp_str += cont_str;
                }
            }
            
            htmloutput += cont_str;
            this.html = htmloutput;
            
            return htmloutput;
        },
	
        createPanel: function (id, opts) {
            var panelDiv = document.createElement("div"), panelDivStyle = panelDiv.style;
            
		    if (!opts) {
                opts = {};
            }
            panelDiv.id = id;
		
		    // ie fix
            if (typeof innerHeight === 'undefined') {
                innerHeight = false;
            }
            
            panelDivStyle.position = 'fixed';
            panelDivStyle.width = opts.width || '360px';
            panelDivStyle.bottom = '0px';
            panelDivStyle.top = '0px';
            panelDivStyle.padding = '4px;';
            panelDivStyle.overflowY = opts.yOverflow || 'scroll';
            panelDivStyle.borderLeft = '2px ridge #f7f7f7';
            panelDivStyle.overflowX = opts.xOverflow || 'hidden';
            panelDivStyle.right = '0px';
            panelDivStyle.backgroundColor = opts.bgColor || '#f7f7f7';
            panelDivStyle.color = '#777';
            panelDivStyle.fontFamily = opts.font || '"Myriad Pro",Arial,Helvetica,sans-serif';
            panelDivStyle.textAlign = opts.textAlign || 'left';
            panelDivStyle.zIndex = 100000;
            
            document.body.appendChild(panelDiv); 
        },
        
        echoMessage: function (message) {
            var msgBox = document.createElement('div'), msgBoxStyle = msgBox.style; 
        
            msgBoxStyle.position = 'absolute';
            msgBoxStyle.height = '20px';
            msgBoxStyle.top = '50%';
            msgBoxStyle.left = '50%';
            msgBoxStyle.margin = '-30px 0px 0px -195px';
            msgBoxStyle.backgroundColor = '#f7f7f7';
            msgBoxStyle.border = '1px solid #ccc';
            msgBoxStyle.color = '#777';
            msgBoxStyle.padding = '20px';
            msgBoxStyle.fontSize = '16px';
            msgBoxStyle.fontFamily = '"Myriad Pro",Arial,Helvetica,sans-serif';
            msgBoxStyle.textAlign = 'center';
            msgBoxStyle.zIndex = 100000;
            msgBoxStyle.textShadow = '1px 1px 0 white';
            msgBoxStyle.borderRadius = "12px";
            msgBoxStyle.boxShadow = '0 0 6px #ccc';
        
            msgBox.setAttribute('onclick','document.body.removeChild(this)');
            msgBox.appendChild(document.createTextNode(message));
            document.body.appendChild(msgBox);
        
            setTimeout(function () {
                try {
			        document.body.removeChild(msgBox);
                } catch (error) {}
	        }, 3000);
        }	
    };
    
    // password-like call back function to avoid over-writing of any functions
    win.callBack_89cvc7rfr742 = function (results) {	
        var panel = document.getElementById('hacker_bookmark_panel'), html;  
	  
        if (results.query.count > 0) {
            if (!panel) {
                HACKER_BOOKMARKS.createPanel('hacker_bookmark_panel');
                panel = document.getElementById('hacker_bookmark_panel');
            }
            
            if (HACKER_BOOKMARKS.html) {
                panel.innerHTML = HACKER_BOOKMARKS.html;
		        return;
            }
            
            html = HACKER_BOOKMARKS.generateHTML(results.query.results.row);
            panel.innerHTML = html;
        }
        else {
            HACKER_BOOKMARKS.echoMessage('Bookmarks not found!');
        }
    };
    
    win.openHBMs = function (id) {
        var el = document.getElementById(id);
        
	    if (el.style.display !== 'none') {
            el.style.display = 'none';
        }
        else {
            el.style.display = '';
        }
    };
    
    HACKER_BOOKMARKS.getBookmarks(g_url, "callBack_89cvc7rfr742");
    
}(googledocUrl_367342iurw34, window));
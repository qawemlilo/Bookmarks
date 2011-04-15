(function (g_url) {

var HACKER_BOOKMARKS = { 
    
	url: '',
	
	html: '',

	// converts date to relative date
    whichDay: function (date) {
        var d = Date.parse(date), dateFunc = new Date(),
        timeSince = dateFunc.getTime() - d, inSeconds = timeSince / 1000,
        inMinutes = timeSince / 1000 / 60, inHours = timeSince / 1000 / 60 / 60,
        inDays = timeSince / 1000 / 60 / 60 / 24, inMonths = timeSince / 1000 / 60 / 60 / 24 / 30,
        inYears = timeSince / 1000 / 60 / 60 / 24 / 365, myTime;
     
        // in seconds
        if (Math.round(inSeconds) === 1) {
            myTime = "second_1";
        }
        else if (inMinutes < 1) {
            myTime = "seconds_" + Math.floor(inSeconds);
        }
     
        // in minutes
        else if (Math.round(inMinutes) === 1) {
            myTime = "minute_1";
        }
        else if (inHours < 1) {
            myTime =  "minutes_" + Math.floor(inMinutes);
        }
     
        // in hours
        else if (Math.round(inHours) === 1) {
            myTime = "hour_1";
        }
        else if (inDays < 1) {
            myTime =  "hours_" + Math.floor(inHours);
        } 
     
        // in days
        else if (Math.round(inDays) === 1) {
            myTime = "day_1";
        }
        else if (inMonths < 1) {
            myTime =  "days_" + Math.floor(inDays);
        }
    
        // in months
        else if (Math.round(inMonths) === 1) {
            myTime = "month_1";
        }
        else if (inYears < 1) {
            myTime = "months_" + Math.floor(inDays);
        }
     
        // in years
        else if (Math.round(inYears) === 1) {
            myTime = "year_1";
        }
    
        else {
            myTime = "years_" +Math.floor(inYears);
        }
	
	    return myTime;
    },
	
	// creates a JSONP YQL query from a url which returns results in JSON format
    getBookmarks: function (url, callback) {
	    //configures for cache and new requests
	    if (!this.url) this.url = url;
		
        var js = document.createElement("script"),
        yqlRestfulQuery = "http://query.yahooapis.com/v1/public/yql?q=",
        myQuery = 'select * from csv where url="' + url + '"',
        completeQuery = yqlRestfulQuery + encodeURIComponent(myQuery) + "&format=json&callback=" + callback;
	
        js.src = completeQuery;
   	    js.src = completeQuery;
       (document.getElementsByTagName("head")[0].appendChild(js) || document.body.appendChild(js))
    },

    // generate HTML from the JSON returned by a YQL query	
    generateHTML: function (jsonData) { 
	    var htmloutput = "", day, i, z, objKey, temp = {}, temp_str, cont_str = '', mystr, len;

        for (i = 1; i <  jsonData.length; i += 1) {  
            day = HACKER_BOOKMARKS.whichDay(jsonData[i]['col0']);
	        if(!(!!temp[day])) temp[day] = [];
			temp[day].push({'link': jsonData[i]['col1'], 'title': jsonData[i]['col2']});
	    }
		
	 htmloutput += '<a style="color:red; padding-right: 5px; text-align: right; text-decoration:none; width: 100%; font-size: 18px" href="javascript: (function(){try{document.body.removeChild(document.getElementById(\'hacker_bookmark_panel\'));} catch(error){}})();">[x] </a>';
	    htmloutput += '<h3 style="font-size: 18px; color: #000000;" class="">A Hacker\'s Bookmarks</h3>';
		 
	    for (objKey in temp) {
		
	        mystr = objKey.split("_");
			
            temp_str = '<a class="" style="color: #000; font-family: "Myriad Pro",Arial,Helvetica,sans-serif;" href="javascript:(function(x) { var el = document.getElementById(x);el.style.display !== \'none\' ? el.style.display = \'none\' : el.style.display = \'\';})(\''+ objKey +'\');"><strong>' + mystr[1] + ' ' +mystr[0] + ' ago</strong></a><br />'
		    temp_str += '<div style="line-height: 140%; padding-left: 5px; display: none; color: white; margin-bottom: 10px;" id="'+ objKey +'">';  
		    
			len = temp[objKey].length;
			
		    for (z = 0; z <  len; z += 1) {
		      temp_str += '<a target="_blank" style="font-family: Arial; font-size: 12px;" title="' + temp[objKey][z]['title'] + '" href="' + temp[objKey][z]['link'] + '"> - ' + (temp[objKey][z]['title']).substring(0, 40) + '... </a> <br />';
		    }
			
		    temp_str += '</div>';
			cont_str = temp_str += cont_str;
        }
		
		htmloutput += cont_str;
		
		this.html = htmloutput;
        return htmloutput;
    },
	
    createPanel: function (id, opts) {
        var panelDiv = document.createElement("div");
		if (!opts) opts = {};
        panelDiv.id = id;
		
		// ie fix
		if(typeof innerHeight === 'undefined') innerHeight = false;
		
		panelDiv.style.position = 'fixed';
		panelDiv.style.width = opts.width || '360px';
		panelDiv.style.bottom = '0px';
		panelDiv.style.top = '0px';
		panelDiv.style.padding = '4px;';
		panelDiv.style.overflowY = opts.yOverflow || 'scroll';
		panelDiv.style.borderLeft = '2px ridge #f7f7f7';
		panelDiv.style.overflowX = opts.xOverflow || 'hidden';
		panelDiv.style.right = '0px';
		panelDiv.style.backgroundColor = opts.bgColor || '#f7f7f7';
		panelDiv.style.color = '#777';
		panelDiv.style.fontFamily = opts.font || '"Myriad Pro",Arial,Helvetica,sans-serif';
		panelDiv.style.textAlign = opts.textAlign || 'left';
		panelDiv.style.zIndex = 100000;

        document.body.appendChild(panelDiv); 
    },

    echoMessage: function (message) {
	    var msgBox = document.createElement('div');
	
		msgBox.style.position = 'absolute';
		msgBox.style.width = '350px';
		msgBox.style.height = '20px';
		msgBox.style.top = '50%';
		msgBox.style.left = '50%';
		msgBox.style.margin = '-30px 0px 0px -195px';
		msgBox.style.backgroundColor = '#f7f7f7';
		msgBox.style.border = '1px solid #ccc';
		msgBox.style.color = '#777';
		msgBox.style.padding = '20px';
		msgBox.style.fontSize = '18px';
		msgBox.style.fontFamily = '"Myriad Pro",Arial,Helvetica,sans-serif';
		msgBox.style.textAlign = 'center';
		msgBox.style.zIndex = 100000;   
		msgBox.style.textShadow = '1px 1px 0 white';
		msgBox.style.borderRadius = "12px";
		msgBox.style.boxShadow = '0 0 6px #ccc';
	
	    msgBox.setAttribute('onclick','document.body.removeChild(this)');
	    msgBox.appendChild(document.createTextNode(message));
	    document.body.appendChild(msgBox);
  
	    setTimeout(function() {
		   try{
			   document.body.removeChild(msgBox);
		   }	  catch(error){}
	    },3000);
    }	
};

 // password-like call back function to avoid over-writing of any functions
 window.callBack_89cvc7rfr742 = function(o) {	
      var elem = document.getElementById('hacker_bookmark_panel'), bmHTML;
	  
	  if (!elem) {
	      HACKER_BOOKMARKS.createPanel('hacker_bookmark_panel');
		  elem = document.getElementById('hacker_bookmark_panel');
	  }
	  
      if (!o) {
	      elem.innerHTML = HACKER_BOOKMARKS.html;
		  return;
	  }  
	  
      if (o.query.count > 0) {
		  bmHTML = HACKER_BOOKMARKS.generateHTML(o.query.results.row);
          elem.innerHTML = bmHTML;
	  }
	
	  else {
	      HACKER_BOOKMARKS.echoMessage('Bookmarks not found!');
	  }
    };
  
  HACKER_BOOKMARKS.getBookmarks(g_url, "callBack_89cvc7rfr742");
})(googledocUrl_367342iurw34);
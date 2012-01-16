var include_js = function (url, callback) { 
    var script = document.createElement("script");
    script.type = "text/javascript";
	
    if (script.readyState && callback) {  //IE
        script.onreadystatechange = function(){
            if (script.readyState === "loaded" || script.readyState === "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else if (callback) {  
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
},


displayMSG = function (msg, delay) {
      if ($("#appMsg")) $("#appMsg").slideUp().remove();
	  
      var c = $("<div>",{id:"appMsg",html:msg});
	
	  c.click(function () {
	      $(this).fadeOut(function () {
		      $(this).remove()
		  })
	  });
	
	  delay ? setTimeout(function(){c.click()}, delay) : setTimeout(function(){c.click()},5000);
	  c.hide().appendTo("body").slideDown()
},


isEmail = function (email) { 
    var rgEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email.match(rgEx);
},


isUrl = function (url) {
    var url_match = /https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?/;
    return url_match.test(url);
},


areUrls = function (formurl, csvurl) {
    var url_match = /https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?/;

    if (formurl.length < 99 || formurl.indexOf('&amp;ifq') === -1 || formurl.indexOf('google.com/spreadsheet') === -1 || !url_match.test(formurl)) {
       displayMSG("Invalid action url! click (?) for more info."); 
       return !1;			
    }
	
    if (csvurl.indexOf('output=csv') === -1 || csvurl.indexOf('google.com/spreadsheet') === -1 || csvurl.length < 99 || !url_match.test(csvurl)) {
        displayMSG("Invalid spreadsheet url, click (?) for more info!"); 
        return !1;			
    }
	
    return true;
},

 
createLinks = function (formurl, csvurl) {
		
		if (!isUrl(formurl) || !isUrl(csvurl)) {
		    displayMSG("All fields require valid input!"); 
            return;			
		}

        txt =  "<a class=\"bookmarkButton\" href=\"javascript:(function(){if(typeof googleFormActionUrl_367342iurw34!=='undefined') return;var jsScript=document.createElement('script');window.googleFormActionUrl_367342iurw34='"+formurl+"';jsScript.setAttribute('type','text/javascript'); jsScript.setAttribute('src', 'http://raw.github.com/gist/1441780/37310fa84871253f5e258f771ad1e05f36bcc703/add_bookmark_min.js');document.getElementsByTagName('head')[0].appendChild(jsScript);})();\">Bookmarks this!</a>";
		
        txt += "<a class=\"bookmarkButton\" href=\"javascript:(function(){if(typeof HACKER_BOOKMARKS === 'object' && document.getElementById('hacker_bookmark_panel')) return; if(typeof HACKER_BOOKMARKS === 'object' && !document.getElementById('hacker_bookmark_panel')){ghshu_897742(); return;} window.googledocUrl_367342iurw34='"+csvurl+"'; var jsScript=document.createElement('script'); jsScript.setAttribute('type','text/javascript'); jsScript.setAttribute('src','http://raw.github.com/gist/1441775/d4bb404db8591641c68ceb0e1f20cf1c08cd62ba/view_bookmarks_min.js');document.getElementsByTagName('head')[0].appendChild(jsScript) || document.body.appendChild(jsScript);})();\">View Bookmarks</a>";
	
		if ($.browser.msie) txt += "Right-click on these buttons and select Add to Favorites";
        else txt += "Drag these buttons to your bookmarks bar"; 

        txt += '<a style="margin-left: 40px; color: #fff; font-size: 20px;" href="" onclick="$(\'#appMsg\').remove(); return false;">[x]</a>';

		if ($("#appMsg")) $("#appMsg").slideUp().remove();
		
        lbox = $('<div>', {
            id : 'appMsg',
	        html : txt  
        });
		
        lbox.hide().appendTo('body');
	    $('#appMsg').slideDown();
},


createLinks2 = function () {
    $('#create').click(function (e) {
        e.preventDefault();	
	    var formurl = $('#formurl').val(), csvurl = $('#csvurl').val(), email = $('#email').val(), txt, lbox;
		
		formurl = $.trim(formurl);
		csvurl = $.trim(csvurl);
		email = $.trim(email);
		
		if ($('#appMsg')) $('#appMsg').remove();
		
		if (!isEmail(email)) {
		    displayMSG("Invalid email!");
            return;			
		}
		
		if (!areUrls(formurl, csvurl)) {
            return;			
		}
		
		formurl = formurl.substring(0, (formurl.length - 8));

        txt =  "<a class=\"bookmarkButton\" href=\"javascript:(function(){if(typeof googleFormActionUrl_367342iurw34!=='undefined') return;var jsScript=document.createElement('script');window.googleFormActionUrl_367342iurw34='"+formurl+"';jsScript.setAttribute('type','text/javascript'); jsScript.setAttribute('src', 'http://www.rflab.co.za/scripts/add_bookmarks_min.js');document.getElementsByTagName('head')[0].appendChild(jsScript);})();\">Bookmarks this!</a>";
		
        txt += "<a class=\"bookmarkButton\" href=\"javascript:(function(){if(typeof HACKER_BOOKMARKS === 'object' && document.getElementById('hacker_bookmark_panel')) return; if(typeof HACKER_BOOKMARKS === 'object' && !document.getElementById('hacker_bookmark_panel')){ghshu_897742(); return;} window.googledocUrl_367342iurw34='"+csvurl+"'; var jsScript=document.createElement('script'); jsScript.setAttribute('type','text/javascript'); jsScript.setAttribute('src','http://www.rflab.co.za/scripts/view_bookmarks_min.js');document.getElementsByTagName('head')[0].appendChild(jsScript) || document.body.appendChild(jsScript);})();\">View Bookmarks</a>";
	
		if ($.browser.msie) txt += "Right-click on these buttons and select Add to Favorites";
        else txt += "Drag these buttons to your bookmarks bar"; 

        txt += '<a style="margin-left: 40px; color: #fff; font-size: 20px;" href="" onclick="$(\'#appMsg\').remove(); return false;">[x]</a>';

        lbox = $('<div>', {
            id : 'appMsg',
	        html : txt  
        });

		saveEntry("https://spreadsheets.google.com/spreadsheet/formResponse?formkey=dGUySFVGbjZuMkZydTF6RHd2RlhFOHc6MQ&entry.0.single="+encodeURIComponent(email)+"&entry.1.single="+encodeURIComponent(formurl)+"&entry.2.single="+encodeURIComponent(csvurl));
		
        lbox.hide().appendTo('body');
	    $('#appMsg').slideDown();
    });
},


callBack = function(yql) {	
	$('#loading').hide();
	
    if (typeof yql.query === 'undefined' || !yql.query.count) {
        displayMSG('No results where found!');
        return false;
    }
	
	var data = yql.query.results.row;

    createLinks(data.formurl, data.csvurl);
},

saveEntry = function (d) {
    var o = !1;
	
    if (window.XMLHttpRequest) 
	    o = new XMLHttpRequest;
    else 
	    if (window.ActiveXObject) o = new ActiveXObject('Microsoft.XMLHTTP');
   
    if (o) {
       o.open('GET', d);
       o.onreadystatechange = function(){};
       o.send(null)
    }
};
 
$(function(){
    $('#view').click(function(e) {

			e.preventDefault();
			
		    var email = $('#semail').val(), restQuery, query, yqlQuery;
			
			email = $.trim(email);
			
	        if (!isEmail(email) || !email) {
                displayMSG('Invalid Email!');
                return false;
            }
			
			$('#loading').show();
			
            restQuery = 'http://query.yahooapis.com/v1/public/yql?q=',
			query = 'select * from csv where url="https://spreadsheets.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=0AqJ6uSJSd-kSdGUySFVGbjZuMkZydTF6RHd2RlhFOHc&output=csv" and columns="time,email,formurl,csvurl" and email="'+ email +'"', 
            yqlQuery = restQuery + encodeURIComponent(query)  + '&format=json&callback=callBack'; 
            include_js(yqlQuery);  			
	    });	

         $('#bkmarks').click(function(){
		     _gaq.push(['_trackEvent', 'navigationLinks', 'bookmarks', this.href]); 
		     $('.shyd').fadeOut('slow', function(){
			    $('.hyd').fadeIn('slow');    
			 });
			 return false;
		 });

        $("#mybks").click(function() {
		    $('#loading').show();
		})		 

        createLinks2();
 		$("#spreadsheetUrl, #formActionUrl, #gettingStarted").fancybox({
				'width'				: '75%',
				'height'			: '96%',
				'autoScale'			: !1,
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'type'				: 'iframe',
				'onStart'           : function () {
										  _gaq.push(['_trackEvent', 'infoLinks', 'clicked']);
				                      }
       });         
});

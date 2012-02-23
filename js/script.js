(function(win, $) {
    var include_js = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        
        if (script.readyState && callback) {  //IE
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        }
        
        else if (callback) { 
            script.onload = function(){
                callback();
            };
        }
        
        script.src = url;
        
        if (!document.getElementsByTagName("head")[0].appendChild(script)) {
            document.body.appendChild(script);
        }
    }, 
    
    displayMSG = function (msg, delay) {
        if ($("#appMsg")) {
            $("#appMsg").slideUp().remove();
        }
        
        var msgPanel = $("<div>", {
            id: "appMsg",
            html: msg
        });
        
        msgPanel.click(function () {
            $(this).fadeOut(function () {
                $(this).remove();
            });
        });
        
        if (delay) {
            setTimeout(function () {
                msgPanel.click();
            }, delay);
        }
        else {
            setTimeout(function () {
                msgPanel.click();
            },5000);
        }
        
        msgPanel.hide().appendTo("body").slideDown();
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
        
        if (formurl.length < 80 || formurl.indexOf('&amp;ifq') === -1 || formurl.indexOf('google.com/spreadsheet') === -1 || !url_match.test(formurl)) {
            displayMSG("Invalid action url! click (?) for more info.");
            return false;
        }
        
        if (csvurl.indexOf('output=csv') === -1 || csvurl.indexOf('google.com/spreadsheet') === -1 || csvurl.length < 99 || !url_match.test(csvurl)) {
            displayMSG("Invalid spreadsheet url, click (?) for more info!"); 
            return false;
        }
        
        return true;
    },
    
    saveEntry = function (urlQuery) {
        var requestObj = false;

        if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            requestObj = new ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP");
        }
        
        if (requestObj) {
            requestObj.open("GET", urlQuery);
            requestObj.onreadystatechange = function(){};
            requestObj.send(null);
        }
    },
    
    createLinks = function (formurl, csvurl) {
        var txt, lbox;
        
        if (!isUrl(formurl) || !isUrl(csvurl)) {
            displayMSG("All fields require valid input!");
            return;
        }
        
        txt =  "<a class=\"bookmarkButton\" href=\"javascript:(function(){if(typeof googleFormActionUrl_367342iurw34!=='undefined') return;var jsScript=document.createElement('script');window.googleFormActionUrl_367342iurw34='" + formurl + "';jsScript.setAttribute('type','text/javascript'); jsScript.setAttribute('src', 'http://www.rflab.co.za/scripts/add_bookmark_min.js');document.getElementsByTagName('head')[0].appendChild(jsScript);})();\">Bookmarks this!</a>";
        
        txt += "<a class=\"bookmarkButton\" href=\"javascript:(function(){if(typeof HACKER_BOOKMARKS === 'object' && document.getElementById('hacker_bookmark_panel')) return; if(typeof HACKER_BOOKMARKS === 'object' && !document.getElementById('hacker_bookmark_panel')){ghshu_897742(); return;} window.googledocUrl_367342iurw34='" + csvurl + "'; var jsScript=document.createElement('script'); jsScript.setAttribute('type','text/javascript'); jsScript.setAttribute('src','http://www.rflab.co.za/scripts/view_bookmarks_min.js');document.getElementsByTagName('head')[0].appendChild(jsScript) || document.body.appendChild(jsScript);})();\">View Bookmarks</a>";
        
        if ($.browser.msie)  {
            txt += "Right-click on these buttons and select Add to Favorites";
        }
        else {
            txt += "Drag these buttons to your bookmarks bar"; 
        }
        
        txt += '<a style="margin-left: 40px; color: #fff; font-size: 20px;" href="" onclick="$(\'#appMsg\').remove(); return false;">[x]</a>';
        
        if ($("#appMsg")) {
            $("#appMsg").slideUp().remove();
        }
        
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
            
            if ($('#appMsg')) {
                $('#appMsg').remove();
            }
            
            if (!isEmail(email)) {
                displayMSG("Invalid email!");
                return;	
            }
            
            if (!areUrls(formurl, csvurl)) {
                return;
            }
            
            formurl = formurl.substring(0, (formurl.length - 8));
            
            txt =  "<a class=\"bookmarkButton\" href=\"javascript:(function(){if(typeof googleFormActionUrl_367342iurw34!=='undefined') return;var jsScript=document.createElement('script');window.googleFormActionUrl_367342iurw34='" + formurl + "';jsScript.setAttribute('type','text/javascript'); jsScript.setAttribute('src', 'http://www.rflab.co.za/scripts/add_bookmark_min.js');document.getElementsByTagName('head')[0].appendChild(jsScript);})();\">Bookmarks this!</a>";
            
            txt += "<a class=\"bookmarkButton\" href=\"javascript:(function(){if(typeof HACKER_BOOKMARKS === 'object' && document.getElementById('hacker_bookmark_panel')) return; if(typeof HACKER_BOOKMARKS === 'object' && !document.getElementById('hacker_bookmark_panel')){ghshu_897742(); return;} window.googledocUrl_367342iurw34='" + csvurl + "'; var jsScript=document.createElement('script'); jsScript.setAttribute('type','text/javascript'); jsScript.setAttribute('src','http://www.rflab.co.za/scripts/view_bookmarks_min.js');document.getElementsByTagName('head')[0].appendChild(jsScript) || document.body.appendChild(jsScript);})();\">View Bookmarks</a>";
            
            if ($.browser.msie) {
                txt += "Right-click on these buttons and select Add to Favorites";
            }
            else {
                txt += "Drag these buttons to your bookmarks toolbar"; 
            }
            
            txt += '<a style="margin-left: 40px; color: #fff; font-size: 20px;" href="" onclick="$(\'#appMsg\').remove(); return false;">[x]</a>';
            
            lbox = $('<div>', {
                id : 'appMsg',
                html : txt
            });
            
            saveEntry("https://spreadsheets.google.com/spreadsheet/formResponse?formkey=dGUySFVGbjZuMkZydTF6RHd2RlhFOHc6MQ&entry.0.single=" + encodeURIComponent(email) + "&entry.1.single=" + encodeURIComponent(formurl) + "&entry.2.single=" + encodeURIComponent(csvurl));
            
            lbox.hide().appendTo('body');
            $('#appMsg').slideDown();
        });
    };
    
    win.callBack = function (yql) {
        
        if ($('#loading')) {
            $('#loading').hide();
        }
        
        if (typeof yql.query === 'undefined' || !yql.query.count) {
            displayMSG('No results where found!');
            return false;
        }
        
        var data = yql.query.results.row;
        
        createLinks(data.formurl, data.csvurl);
    };

/*
    The code below is run when the dom has loaded.    
*/

    $('document').ready(function () {
        $('#view').click(function (e) {
            e.preventDefault();
            
            var email = $('#semail').val(), restQuery, query, yqlQuery;
            
            email = $.trim(email);
            
            if (!isEmail(email) || !email) {
                displayMSG('Invalid Email!');
                return false;
            }
            
            $('#loading').show();
            
            restQuery = 'http://query.yahooapis.com/v1/public/yql?q=';
            query = 'select * from csv where url="https://spreadsheets.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=0AqJ6uSJSd-kSdGUySFVGbjZuMkZydTF6RHd2RlhFOHc&output=csv" and columns="time,email,formurl,csvurl" and email="'+ email +'"'; 
            yqlQuery = restQuery + encodeURIComponent(query)  + '&format=json&callback=callBack';
            
            include_js(yqlQuery, function () {
                $('#loading').hide();  
            });
        });
        
        $('#bkmarks').click(function(){ 
            $('.shyd').fadeOut('slow', function(){
                $('.hyd').fadeIn('slow');
            });
            return false;
        });        
        
        $("#mybks").click(function () {
            $('#loading').show();     
        });
        
        createLinks2();
        
        $("#spreadsheetUrl, #formActionUrl, #gettingStarted").fancybox({
            'width': '75%',
            'height': '96%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'onStart': function () {}
        });
    });        
}(window, jQuery));
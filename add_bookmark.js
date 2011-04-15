(function(x) {

function saveBookmark(a){
   var b = false;
   if (window.XMLHttpRequest) b=new XMLHttpRequest;

   else if(window.ActiveXObject) b = new ActiveXObject("Microsoft.XMLHTTP");
   
   if(b){
       b.open("GET",a);
       b.onreadystatechange=function(){};
       b.send(null)
   }
};

function echoMessage(message) {
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
	msgBox.style.fontSize = '16px';
	msgBox.style.fontFamily = '"Myriad Pro",Arial,Helvetica,sans-serif';
	msgBox.style.textAlign = 'center';
	msgBox.style.zIndex = 100000;   
	msgBox.style.textShadow = '1px 1px 0 white';
	msgBox.style.borderRadius = "12px";
	msgBox.style.boxShadow = '0 0 6px #ccc';

	msgBox.setAttribute('onclick','document.body.removeChild(this)');
	msgBox.appendChild(document.createTextNode(message));
	document.body.appendChild(msgBox);

	setTimeout(function(){
		try{
			document.body.removeChild(msgBox);
		}	catch(error){}
	},3000);
}

saveBookmark( x + '&entry.0.single='+encodeURIComponent(location.href)+'&entry.1.single='+encodeURIComponent(document.title) );
echoMessage("Bookmark Saved");
})(googleFormActionUrl_367342iurw34);
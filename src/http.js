
export function postUser(){
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {

        console.log(JSON.stringify(xmlhttp.responseText));
      }
    }
  xmlhttp.open("POST","/users",true);
  var user = {name: "name"};
  var r = JSON.stringify(user);
  xmlhttp.send(r);
}



export function loadXMLDoc(){
   

  var xmlhttp;
  if (window.XMLHttpRequest)
    {// код для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    }
  else
    {// код для IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
      
      loadXMLDoc.users = JSON.parse(xmlhttp.responseText);
      
      }
    }
  xmlhttp.open("Get","/users",true);
  xmlhttp.send();
  
}





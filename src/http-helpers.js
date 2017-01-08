export function make_request(method, endpoint, cb){
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = onreadystatechange; 
  xmlhttp.open(method, endpoint, true);
  xmlhttp.send();

  function onreadystatechange(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      
      const data = JSON.parse(xmlhttp.responseText);
      cb(data);
      
    }
  }
}

export function make_post_request(method, endpoint, cb, postData){
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = onreadystatechange; 
  xmlhttp.open(method, endpoint, true);
  xmlhttp.setRequestHeader('Content-Type', 'application/json');
  xmlhttp.send(postData);

  function onreadystatechange(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {      
      const data = JSON.parse(xmlhttp.responseText);
      cb(data);      
      
    } 
  }
}
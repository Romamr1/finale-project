export function make_request(method, endpoint, cb){
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange= onreadystatechange; 
  xmlhttp.open(method, endpoint, true);
  xmlhttp.send();

  function onreadystatechange(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      
      const data = JSON.parse(xmlhttp.responseText);
      cb(data);
      
    }
  }
}
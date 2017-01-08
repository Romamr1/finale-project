export function make_request(endpoint, cb, err){
  return fetch(endpoint)
    .then(handleResponse)
    .then(cb, err);
}

export function make_post_request(endpoint, postData, cb, err){

  return fetch(endpoint,{
      method: 'post',
      body: JSON.stringify( postData ),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(handleResponse)
    .then(cb, err);
}


function handleResponse(response) {
    const promise = response.json();

    return promise.then(data=>{
      if (!response.ok) {
          throw data;
      }

      return data;
    });


}

'use strict';

export function makeGetRequest(endpoint){
  return fetch(endpoint)
    .then(handleResponse);
}

export function makePostRequest(endpoint, postData){

  return fetch(endpoint,{
      method: 'post',
      body: JSON.stringify( postData ),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(handleResponse);
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

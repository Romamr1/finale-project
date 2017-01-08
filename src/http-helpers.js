export function make_request(endpoint, cb, err){
  return fetch(endpoint)
    .then(handleErrors)
    .then(r=>r
      .json()
      .then(cb)
    , err);
}

export function make_post_request(endpoint, postData, cb, err){

  return fetch(endpoint,{
      method: 'post',
      body: JSON.stringify( postData ),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(handleErrors)
    .then(r=>r
      .json()
      .then(cb)
    , r=>r
      .json()
      .then(err)
    );
}


function handleErrors(response) {
    if (!response.ok) {
        throw response;
    }
    return response;
}

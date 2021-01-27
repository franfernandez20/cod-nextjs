export default function handler(req, res) {
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://profile.callofduty.com/cod/login", requestOptions)
    // .then(response => response.text())
    .then(response => {
      // console.log('response', response.headers['set-cookie'])
      console.log(response.headers.keys())
      console.log(response.headers.get('set-cookie'))
      // res.status(200)
      // var rawcookies = response.headers['set-cookie'];
      // console.log('rawcookies', rawcookies[0])
      // return res.status(200).json(rawcookies)
    })
    .catch(error => console.log('error', error));
  
  // res.status(200).json({ text: 'Hello' })
}
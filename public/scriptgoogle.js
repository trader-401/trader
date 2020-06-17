const URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const options = {
  client_id: '377110283721-k8s83m402rjarpmgepe4ipe87q7udcfb.apps.googleusercontent.com', 
  scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  response_type: 'code',
  redirect_uri: `http://localhost:3000/oauth`
};

const queryString = Object.keys(options)
  .map((key) => {
    return `${key}=${encodeURIComponent(options[key])}`;
  })
  .join('&');

console.log('Query', queryString);
// making the full url
const authUrl = `${URL}?${queryString}`;
const link = document.getElementById('oauth');
link.setAttribute('href', authUrl);

// let URL = 'https://accounts.google.com/o/oauth2/v2/auth';
//     let options = {
//       // response_type:code,
//       client_id: '54228323733-dv9m3667fkrc94vlr2aa4b9lel1ogbq5.apps.googleusercontent.com',
//       redirect_uri: 'http://localhost:8080/oauth',
//       scope: 'openid profile email',
//       response_type: 'code',
//       // access_type:online,
//       state: '401appconsent'
//     }
//     let QueryString = Object.keys(options).map((key) => {
//       return `${key}=` + encodeURIComponent(options[key]);
//     }).join('&');
//     let authURL = `${URL}?${QueryString}`;
//     console.log('authURL',authURL)
//     let link = document.getElementById('oauth');
//     link.setAttribute('href', authURL);
//     console.log('link' , link)






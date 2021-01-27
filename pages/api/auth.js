var FormData = require("form-data");

// const XSRF_TOKEN =
//   "Kgah6UUIzBY8hFINOGM2MMUMffGdhELv6-lWlb96b5vWl0b1L6JghmsJIDdp4gRE";

const accountEmail = "franfernandez20@gmail.com";
const accountPassword = "apicod2020";

const do_login = (XSRF_TOKEN, res) => {
  var myHeaders = new Headers();
  //   myHeaders.append("Cookie", `XSRF-TOKEN=${XSRF_TOKEN}`);
  myHeaders.append(
    "Cookie",
    `XSRF-TOKEN=${XSRF_TOKEN}; ACT_SSO_COOKIE=MTUyNTA1NjA1NzMwNTE3MjgxMDE6MTYxMjgxMDA2MDYwNToxNjRlOTJiNGUwNTgxZTAzYTlkYzY2NmEwYTc2ZDJjMA; ACT_SSO_COOKIE_EXPIRY=1612810060605; ACT_SSO_EVENT=\"LOGIN_SUCCESS:1611600460693\"; ACT_SSO_REMEMBER_ME=MTUyNTA1NjA1NzMwNTE3MjgxMDE6JDJhJDEwJG94bjgvT092VWQ0TmxrOElROEtONHVZMngyYmJiWklHc0k4VEJXcktGYkZ3UUVlb3laLlUu; CRM_BLOB=eyJ2ZXIiOjEsInBsYXQiOnsicCI6eyJ2IjowLCJ0Ijp7ImJvNCI6eyJtcCI6bnVsbCwieiI6bnVsbCwicHJlcyI6MC4wLCJzcCI6MC4wLCJsZXYiOjAuMH19fX19; XSRF-TOKEN=Kgah6UUIzBY8hFINOGM2MMUMffGdhELv6-lWlb96b5vWl0b1L6JghmsJIDdp4gRE; _abck=6BA1D87F3C1EE32059ABAA794335CDFF~-1~YAAQhBkVAtE80xZ3AQAAi2jeOgUiTynFuJnpQ6Slo7KuNA5dokGo5cdRW0Un4j7i7V+XJfM6XyBz+dJfg98UQJ/GsY/cm1JohEl1wdJgan+uoT2m+ivtOVAUTukx4dIUdsbZ88/ogS3Prjd1QsLN5rz5NRvLRvkNuveDQWkgEZQHE1RoDTSS/qJXBS4DDWWGjmH7e73HiA/N6aYH8aktzo3oDe7cOGtCE5UdeHsa207Su/A+iFZYH12wMite2PQX3jfNH2KBUyYIOe0dRDIEh9NTvcps/qoh0A==~-1~-1~-1; ak_bmsc=F1C22E0152B4EBE210EA13B9385EDB77021519842B080000CF110F60D1A4B847~plu1gkgIuKzT9rKCjsMWb2uoL/MBe4kOmFZ9btzGMloLWpjtJneFucDY0GYjH0k4lQbMd9SMwHVnVAEkv8S8IxJGuVq0za4sJb1KyrsY+w/DR4jFNygvXiP61e1+VhCM+Xl47JB5djZMhTfwNbfMZFGOuc98w3PFkkoetjROF/Dh2T/hwZbLjmLQrTivCo6Df9+ZQQ24VEeIBvz67Ku5jpy/117dzK6wibI84a3DtTtH4=; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.C6aFd4-X6H6SdmUyrkiOExYdEuSJtk13X0sZI9EpKMENGiqCJY6w0w.-d1ZIV6MSQD0J72h.0_iT9JEloDBGmZuS8x5ngDgdN78I-P_iBi6HjpoVXl11WaxQeqXrba5oFAUiUujRZM9_sn13kOfzWzMFNjXj21T3aImCt547rU0XtVYBCROv9M9Xx7CJiLEJwPHoV6c15QW-KhtIH1zXvenF3muuc4rGxDKkmOO643fEPF5LeH5p_kUPDwGHkdv_cvPjD7BcdNq6YfXcmR3bD4hSFPt5-UbLA9qrUiRPDVXEszN5hVA9TqLqiW7WkgzSLPfOxjQgI9w1PkEiY-ceBcUb7elr5DaaqXa7csnLwquMJ0G7Oeuc2a4HaXFSO027X8sv05pBv6lBra-zx6SG_QjI_xSpw6fMVPkj8bUQDIiHZQSHtFcl7hdv9yb--U5MTSOY0qqkCXvUgC6jijzjfPZcL0jKR6Y2Bks7PnNXSAychiIo1sCsxyYE53GHIr8l4LvhdCl85AMUlzP3fjfDZlnjGmPZHB50OvOy2g.lVqxU4ydnwfk8x-v9cp5Sg; bm_mi=AA82B4BFCCFD9CEFE8C1FE329559D9E1~KmUhXYWf/vJh1M0jM/WHyXbVEEtn07KzlECt6VPo4or2vBIQeJmM5Ne/S8DdtmJSN8eVep9xZkwGvjP9gTcGvidYl+iMTSbg/faC8k7Qa22edxO16d46pj+C/gXCj5hAhVH+m+6WTIwvkkf0nKMC1eoSX90tBm8yeqX1FLfAlAXgOERAAZSujk3qT/PCNoViJckR8cH3IIS5pACuKAvI7GvDq+pS2a1XJc2oU8Gn9sub/SEsxaPfeyc2j4pq5bGm; bm_sv=B7450F1009CE378CC9912CB5CFFF99E0~gFxM5Hln49k0+41bX04RgEntzhhTk4WrSkDA1zaRrhJCHSCYHO4umkoVmejUIpeLrI3foDY/OR+EuEZRjYkNQQjXPGOFprElw5UCWYXIIBAbZkAm0l2DhVBvFH0ubjJNDTTl/nfvwzVYNOPtLN/9LM+SiY3j9ps1FAXUdeE43Xw=; bm_sz=078AB8C3422DD30C43CF385CCB0730B8~YAAQhBkVAtE70xZ3AQAAY7TcOgoDLAgcKZki5v2mOHaP7aXm9w9kCSk/UAITIC8lUc8p0tnIqKrU81NkzoZCJqXF+bSUZ6yqBrPEKulQb9p8cfqbQYo/T3OdXuw/+X2P16z9CYdT/F+lcbNIzC8hrrrsshLflaLMdTGIZaSNIPAm6AR7hHVYq26daP3LN5iUkVHCMA==; comid=cod; new_SiteId=cod; pgacct=psn; tfa_enrollment_seen=true`
  );

  var formdata = new FormData();
  formdata.append("username", `${accountEmail}`);
  formdata.append("password", `${accountPassword}`);
  formdata.append("remember_me", "true");
  formdata.append("_csrf", `${XSRF_TOKEN}`);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(
    "https://profile.callofduty.com/do_login?new_SiteId=cod",
    requestOptions
  )
    // .then((response) => response.text())
    .then((response) => {
      // console.log("--keys-->", response.headers.keys());
      // console.log("---->", response.headers.get("set-cookie"));
      console.log('Vuelta de do_login')
      //   console.log(response);
      return res.status(200);
    })
    .catch((error) => console.log("error", error));
};

export default function handler(req, res) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("https://profile.callofduty.com/cod/login", requestOptions)
    // .then(response => response.text())
    .then((response) => {
      const cookies = response.headers.get("set-cookie");
      const XSRF_TOKEN = cookies.split(";")[0].split("=")[1];     
      
      return  do_login(XSRF_TOKEN, res);
      // console.log(response.headers.keys());
      // console.log("--->", response.headers.get("set-cookie"));
      // res.status(200)
      // return res.status(200).json(rawcookies)
    })
    .catch((error) => console.log("error", error));

  // res.status(200).json({ text: 'Hello' })
}

// `XSRF-TOKEN=mNrrbszEi8ZWd3VE4Svp1a2Y88P_9D8jUReL6Napr5YuoNYcsiqi8NI0QVTbGSuL; Domain=callofduty.com; Path=/, new_SiteId=cod; Domain=callofduty.com; Path=/; Secure, comid=cod; Domain=callofduty.com; Path=/; Secure, new_SiteId=cod; Domain=callofduty.com; Path=/; Secure, comid=cod; Domain=callofduty.com; Path=/; Secure, bm_sz=5269A8CC29525D40F0DC4984313CBA07~YAAQhBkVArCI0xZ3AQAA9tMuOwrHzDn1sIXn1AaMRFUF1GUxVGsGnneHoR0mfpxvnrEb4Os4dPgNLd4WcHzGasrhS3N4vsOhVxj9wI30G6MXf2t3ZSQZNKe36t2i1EX7aEF9iuiHY+zRW+ztOagrBGIemQzDIUEF6wFg3HYPruYzR9/HO951U6/yXUHa1LxFepb3rQ==; Domain=.callofduty.com; Path=/; Expires=Tue, 26 Jan 2021 00:14:18 GMT; Max-Age=14398; HttpOnly, _abck=DE56E4FF72458B3ADE6E5D6B6521499E~-1~YAAQhBkVArGI0xZ3AQAA9tMuOwUsFyTsMZhLHabPlAErNj+op4zNJ3v0WUpgrmsacLTP5VXz+/tpRlmWFNfoXCNEwnTi0hIn/XJKCLJeeNucRtJSGq7p+ws1a1d935MbCqYLYnP6H/I0EvpeteSCYyHV3HnWK1tPRlME9VQb9CP4Z37dcR8fcC3Q+tRdwLh8eTAzTIhreRuho0A2CqkEBRaZkdtyCJwcYRmbOCg66LLn6IrcEuSst040fOT6P/PS+8DLndhvGsVaSptNeS1ifTUqPYMAyFazwsdhIS8Zk1X7Jfqza2VhMHFruSLmKQ==~-1~-1~-1; Domain=.callofduty.com; Path=/; Expires=Tue, 25 Jan 2022 20:14:20 GMT; Max-Age=31536000; Secure`
// `XSRF-TOKEN=${XSRF_TOKEN}; ACT_SSO_COOKIE=MTUyNTA1NjA1NzMwNTE3MjgxMDE6MTYxMjgxMDA2MDYwNToxNjRlOTJiNGUwNTgxZTAzYTlkYzY2NmEwYTc2ZDJjMA; ACT_SSO_COOKIE_EXPIRY=1612810060605; ACT_SSO_EVENT=\"LOGIN_SUCCESS:1611600460693\"; ACT_SSO_REMEMBER_ME=MTUyNTA1NjA1NzMwNTE3MjgxMDE6JDJhJDEwJG94bjgvT092VWQ0TmxrOElROEtONHVZMngyYmJiWklHc0k4VEJXcktGYkZ3UUVlb3laLlUu; CRM_BLOB=eyJ2ZXIiOjEsInBsYXQiOnsicCI6eyJ2IjowLCJ0Ijp7ImJvNCI6eyJtcCI6bnVsbCwieiI6bnVsbCwicHJlcyI6MC4wLCJzcCI6MC4wLCJsZXYiOjAuMH19fX19; XSRF-TOKEN=Kgah6UUIzBY8hFINOGM2MMUMffGdhELv6-lWlb96b5vWl0b1L6JghmsJIDdp4gRE; _abck=6BA1D87F3C1EE32059ABAA794335CDFF~-1~YAAQhBkVAtE80xZ3AQAAi2jeOgUiTynFuJnpQ6Slo7KuNA5dokGo5cdRW0Un4j7i7V+XJfM6XyBz+dJfg98UQJ/GsY/cm1JohEl1wdJgan+uoT2m+ivtOVAUTukx4dIUdsbZ88/ogS3Prjd1QsLN5rz5NRvLRvkNuveDQWkgEZQHE1RoDTSS/qJXBS4DDWWGjmH7e73HiA/N6aYH8aktzo3oDe7cOGtCE5UdeHsa207Su/A+iFZYH12wMite2PQX3jfNH2KBUyYIOe0dRDIEh9NTvcps/qoh0A==~-1~-1~-1; ak_bmsc=F1C22E0152B4EBE210EA13B9385EDB77021519842B080000CF110F60D1A4B847~plu1gkgIuKzT9rKCjsMWb2uoL/MBe4kOmFZ9btzGMloLWpjtJneFucDY0GYjH0k4lQbMd9SMwHVnVAEkv8S8IxJGuVq0za4sJb1KyrsY+w/DR4jFNygvXiP61e1+VhCM+Xl47JB5djZMhTfwNbfMZFGOuc98w3PFkkoetjROF/Dh2T/hwZbLjmLQrTivCo6Df9+ZQQ24VEeIBvz67Ku5jpy/117dzK6wibI84a3DtTtH4=; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.C6aFd4-X6H6SdmUyrkiOExYdEuSJtk13X0sZI9EpKMENGiqCJY6w0w.-d1ZIV6MSQD0J72h.0_iT9JEloDBGmZuS8x5ngDgdN78I-P_iBi6HjpoVXl11WaxQeqXrba5oFAUiUujRZM9_sn13kOfzWzMFNjXj21T3aImCt547rU0XtVYBCROv9M9Xx7CJiLEJwPHoV6c15QW-KhtIH1zXvenF3muuc4rGxDKkmOO643fEPF5LeH5p_kUPDwGHkdv_cvPjD7BcdNq6YfXcmR3bD4hSFPt5-UbLA9qrUiRPDVXEszN5hVA9TqLqiW7WkgzSLPfOxjQgI9w1PkEiY-ceBcUb7elr5DaaqXa7csnLwquMJ0G7Oeuc2a4HaXFSO027X8sv05pBv6lBra-zx6SG_QjI_xSpw6fMVPkj8bUQDIiHZQSHtFcl7hdv9yb--U5MTSOY0qqkCXvUgC6jijzjfPZcL0jKR6Y2Bks7PnNXSAychiIo1sCsxyYE53GHIr8l4LvhdCl85AMUlzP3fjfDZlnjGmPZHB50OvOy2g.lVqxU4ydnwfk8x-v9cp5Sg; bm_mi=AA82B4BFCCFD9CEFE8C1FE329559D9E1~KmUhXYWf/vJh1M0jM/WHyXbVEEtn07KzlECt6VPo4or2vBIQeJmM5Ne/S8DdtmJSN8eVep9xZkwGvjP9gTcGvidYl+iMTSbg/faC8k7Qa22edxO16d46pj+C/gXCj5hAhVH+m+6WTIwvkkf0nKMC1eoSX90tBm8yeqX1FLfAlAXgOERAAZSujk3qT/PCNoViJckR8cH3IIS5pACuKAvI7GvDq+pS2a1XJc2oU8Gn9sub/SEsxaPfeyc2j4pq5bGm; bm_sv=B7450F1009CE378CC9912CB5CFFF99E0~gFxM5Hln49k0+41bX04RgEntzhhTk4WrSkDA1zaRrhJCHSCYHO4umkoVmejUIpeLrI3foDY/OR+EuEZRjYkNQQjXPGOFprElw5UCWYXIIBAbZkAm0l2DhVBvFH0ubjJNDTTl/nfvwzVYNOPtLN/9LM+SiY3j9ps1FAXUdeE43Xw=; bm_sz=078AB8C3422DD30C43CF385CCB0730B8~YAAQhBkVAtE70xZ3AQAAY7TcOgoDLAgcKZki5v2mOHaP7aXm9w9kCSk/UAITIC8lUc8p0tnIqKrU81NkzoZCJqXF+bSUZ6yqBrPEKulQb9p8cfqbQYo/T3OdXuw/+X2P16z9CYdT/F+lcbNIzC8hrrrsshLflaLMdTGIZaSNIPAm6AR7hHVYq26daP3LN5iUkVHCMA==; comid=cod; new_SiteId=cod; pgacct=psn; tfa_enrollment_seen=true`)

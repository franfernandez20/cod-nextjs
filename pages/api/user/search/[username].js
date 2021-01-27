import { XSRF_TOKEN } from '../../../../lib/api'

export default function handler(req, res) {
  const {
    query: { username },
  } = req;

  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    `ACT_SSO_COOKIE=MTUyNTA1NjA1NzMwNTE3MjgxMDE6MTYxMjgxMDA2MDYwNToxNjRlOTJiNGUwNTgxZTAzYTlkYzY2NmEwYTc2ZDJjMA; ACT_SSO_COOKIE_EXPIRY=1612810060605; ACT_SSO_EVENT=\"LOGIN_SUCCESS:1611600460693\"; ACT_SSO_REMEMBER_ME=MTUyNTA1NjA1NzMwNTE3MjgxMDE6JDJhJDEwJG94bjgvT092VWQ0TmxrOElROEtONHVZMngyYmJiWklHc0k4VEJXcktGYkZ3UUVlb3laLlUu; CRM_BLOB=eyJ2ZXIiOjEsInBsYXQiOnsicCI6eyJ2IjowLCJ0Ijp7ImJvNCI6eyJtcCI6bnVsbCwieiI6bnVsbCwicHJlcyI6MC4wLCJzcCI6MC4wLCJsZXYiOjAuMH19fX19; XSRF-TOKEN=${XSRF_TOKEN}; _abck=6BA1D87F3C1EE32059ABAA794335CDFF~-1~YAAQhBkVAtE80xZ3AQAAi2jeOgUiTynFuJnpQ6Slo7KuNA5dokGo5cdRW0Un4j7i7V+XJfM6XyBz+dJfg98UQJ/GsY/cm1JohEl1wdJgan+uoT2m+ivtOVAUTukx4dIUdsbZ88/ogS3Prjd1QsLN5rz5NRvLRvkNuveDQWkgEZQHE1RoDTSS/qJXBS4DDWWGjmH7e73HiA/N6aYH8aktzo3oDe7cOGtCE5UdeHsa207Su/A+iFZYH12wMite2PQX3jfNH2KBUyYIOe0dRDIEh9NTvcps/qoh0A==~-1~-1~-1; ak_bmsc=F1C22E0152B4EBE210EA13B9385EDB77021519842B080000CF110F60D1A4B847~plu1gkgIuKzT9rKCjsMWb2uoL/MBe4kOmFZ9btzGMloLWpjtJneFucDY0GYjH0k4lQbMd9SMwHVnVAEkv8S8IxJGuVq0za4sJb1KyrsY+w/DR4jFNygvXiP61e1+VhCM+Xl47JB5djZMhTfwNbfMZFGOuc98w3PFkkoetjROF/Dh2T/hwZbLjmLQrTivCo6Df9+ZQQ24VEeIBvz67Ku5jpy/117dzK6wibI84a3DtTtH4=; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.C6aFd4-X6H6SdmUyrkiOExYdEuSJtk13X0sZI9EpKMENGiqCJY6w0w.-d1ZIV6MSQD0J72h.0_iT9JEloDBGmZuS8x5ngDgdN78I-P_iBi6HjpoVXl11WaxQeqXrba5oFAUiUujRZM9_sn13kOfzWzMFNjXj21T3aImCt547rU0XtVYBCROv9M9Xx7CJiLEJwPHoV6c15QW-KhtIH1zXvenF3muuc4rGxDKkmOO643fEPF5LeH5p_kUPDwGHkdv_cvPjD7BcdNq6YfXcmR3bD4hSFPt5-UbLA9qrUiRPDVXEszN5hVA9TqLqiW7WkgzSLPfOxjQgI9w1PkEiY-ceBcUb7elr5DaaqXa7csnLwquMJ0G7Oeuc2a4HaXFSO027X8sv05pBv6lBra-zx6SG_QjI_xSpw6fMVPkj8bUQDIiHZQSHtFcl7hdv9yb--U5MTSOY0qqkCXvUgC6jijzjfPZcL0jKR6Y2Bks7PnNXSAychiIo1sCsxyYE53GHIr8l4LvhdCl85AMUlzP3fjfDZlnjGmPZHB50OvOy2g.lVqxU4ydnwfk8x-v9cp5Sg; bm_mi=AA82B4BFCCFD9CEFE8C1FE329559D9E1~KmUhXYWf/vJh1M0jM/WHyXbVEEtn07KzlECt6VPo4or2vBIQeJmM5Ne/S8DdtmJSHQLJly+pd/oICw9oXn6DS1wwt5h4p5MRLaRtrU8GRfR5HY9IezPfef0qZ6bKmgMZ+e/+vgRTL88+PPg3o96NGG838nZ2WvpdrbNHPVMpjF/7RycFFnzXAagsCEw9C97wp5Clb5aAAtwzO2/2FK1T42O9/s+fOjxGmKdzpN9aOZ5jh3tJAlJFSGtEPOQCdpvP; bm_sv=B7450F1009CE378CC9912CB5CFFF99E0~gFxM5Hln49k0+41bX04RgEntzhhTk4WrSkDA1zaRrhJCHSCYHO4umkoVmejUIpeLrI3foDY/OR+EuEZRjYkNQQjXPGOFprElw5UCWYXIIBDJX6OI0Pp5AmK8wLp/+VZpHTwuhV9R4/fv+NGVjSsPbUecHmJHZvFyIiVTOvZC4lU=; bm_sz=078AB8C3422DD30C43CF385CCB0730B8~YAAQhBkVAtE70xZ3AQAAY7TcOgoDLAgcKZki5v2mOHaP7aXm9w9kCSk/UAITIC8lUc8p0tnIqKrU81NkzoZCJqXF+bSUZ6yqBrPEKulQb9p8cfqbQYo/T3OdXuw/+X2P16z9CYdT/F+lcbNIzC8hrrrsshLflaLMdTGIZaSNIPAm6AR7hHVYq26daP3LN5iUkVHCMA==; comid=cod; new_SiteId=cod; pgacct=psn; tfa_enrollment_seen=true; API_CSRF_TOKEN=c10b8803-2cca-44f3-ac3b-31bf2800ccbb`
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://my.callofduty.com/api/papi-client/crm/cod/v2/platform/uno/username/${username}/search`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(result);
    })
    .catch(error => {
      res.json(error);
      res.status(405).end();
      return resolve(); //in case something goes wrong in the catch block
    });
}

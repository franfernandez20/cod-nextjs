import {
  getTournament,
  getDBUser,
  setUserProveOfTruth,
  setUserPayed,
  updateUserWallet,
} from "../../../../firebase/client";

// OJITO AL SUBIR --- ENV YA !! mirar tb que en pro id?tourid en vez de /tourid ¿? 
// const BASE_URL = "http://localhost:3000/";
const BASE_URL = "https://cod-nextjs.vercel.app/";

export default async function handler(req, res) {
  const {
    headers: { referer },
    query: { userid, tourid },
  } = req;
  if (referer === `${BASE_URL}tournaments/${tourid}`) {
    console.log("req-*****", req.headers.referer);
    const {
      content: { wallet },
    } = await getDBUser(userid);
    const { prize } = await getTournament(tourid);
    try {
      await setUserProveOfTruth(userid, prize);
      await updateUserWallet(userid, wallet - prize);
      await setUserPayed(userid, tourid, true)
      res.status(204).end();
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).end(JSON.stringify(error));
    }
  }
}

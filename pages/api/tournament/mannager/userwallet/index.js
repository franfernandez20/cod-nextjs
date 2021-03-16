import {
  createUserProveOfTruth,
  getDBUser,
  getProveOfTruth,
  setUserProveOfTruth,
  updateUserWallet,
} from "../../../../../firebase/client";

const key = "heyliantenolalies";

export default async function handler(req, res) {
  const { body: users, headers } = req;
  if (headers && headers.codjf && headers.codjf === key) {
    const promises = users.map((user) => {
      return new Promise(async (resolve) => {
        const proveOfTruth = await getProveOfTruth(user.id);
        if (proveOfTruth) {
          setUserProveOfTruth(user.id, -user.wallet) // ojo que esta invertido xq el metodo resta
            .then(function () {
              const wallet = proveOfTruth.wallet + user.wallet;
              updateUserWallet(user.id, wallet).then(() => {
                resolve({
                  user: user.id,
                  message: `UPDATE || Todo correcto 🥳. \
                  -> wallet = ${user.wallet + proveOfTruth.wallet} |\
                  -> old_wallet = ${proveOfTruth.wallet}`,
                });
              });
            })
            .catch(function (error) {
              resolve({
                user: user.id,
                message: `Ha habido algún problema al actualizar en DB 🥴. El error --> ${error}`,
              });
            });
        } else {
          const { uid, username, email, content } = await getDBUser(user.id);
          const wallet = content.wallet + user.wallet;
          const jf = "cod_tour";
          const newProveOfTruth = { username, email, wallet, jf };
          createUserProveOfTruth(uid, newProveOfTruth)
            .then(function () {
              updateUserWallet(user.id, wallet).then(() => {
                resolve({
                  user: uid,
                  message: `NEW || Todo correcto 🥳. -> wallet = ${wallet} | -> old_wallet = ${content.wallet}`,
                });
              });
            })
            .catch(function (error) {
              resolve({
                user: uid,
                message: `Ha habido algún problema al guardar en DB 🥴. El error --> ${error}`,
              });
            });
        }
      });
    });
    Promise.all(promises).then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).end(JSON.stringify(result));
    });
  }
}

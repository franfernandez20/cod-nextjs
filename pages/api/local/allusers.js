import { fetchAllUsers } from "../../../firebase/client";

export default function handler(req, res) {
  const {
    query: { username, platform },
  } = req;

  fetchAllUsers()
    .then((result) => {
      console.log("entra");
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result));
    })
    .catch((e) => {
      console.log("error", error);
      res.json(error);
      res.status(405).end();

      return res.end(JSON.stringify("Error")); //in case something goes wrong in the catch block
    });
}

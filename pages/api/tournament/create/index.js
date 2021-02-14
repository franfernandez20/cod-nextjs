import { createTournament } from "../../../../firebase/client";

const key = "heyliantenolalies";

export default function handler(req, res) {
  const { method, body, headers } = req;
  if (headers && headers.codjf && headers.codjf === key) {
    const tour = body;
    console.log("tour", tour);
    tour.fecha = new Date(tour.fecha);
    console.log("fecha", tour);
    createTournament(tour).then(() => {
      res.statusCode = 200;
      res.end("Torneo guardado correctamente");
    });
  } else res.status(405).end();
  //   res.setHeader('Content-Type', 'application/json');
  // res.json(error);
  // return res.end(JSON.stringify('mierda')); //in case something goes wrong in the catch block
}

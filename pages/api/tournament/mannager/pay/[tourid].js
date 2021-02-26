import { getTeamByName, setTeamPayed, setUserPayed } from "../../../../../firebase/client";

const key = "heyliantenolalies";

export default async function handler(req, res) {
  const { method, body, headers, query: { tourid } } = req;
  if (headers && headers.codjf && headers.codjf === key) {
    const teams = JSON.parse(body);
    console.log("tour", teams);
    const promises = teams.map(({teamName, payed}) => {
      console.log('teamName', teamName)
      return new Promise((resolve) => {
        getTeamByName(teamName, tourid).then(team => {
          if (team.length === 0) {
            resolve({teamName, message: "Este teamName no existe para este tourid 😔"})
          } else if (team.length > 1) {
            resolve({teamNames: team, message: "Hay varios equipos que se llaman igual en el mismo torneo 😱😱... Llama a Fran !!"})
          } else {
            setTeamPayed(team[0].teamid, payed).then(()=> {
              team[0].users.forEach(user => {
                setUserPayed(user.user, tourid, payed)                
              });
              resolve({team: team[0], message: `Todo correcto 🥳. Equipo marcado como -> ${payed}`})
            }).catch((e)=> {
              resolve({team: team[0], message: `Ha habido algún problema al guardar en DB 🥴. El error --> ${e}`})
            })
          }
        });
      })
      
    });
    Promise.all(promises).then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(result));      

    })
  } else res.status(405).end();
  // res.json(error);
  // return res.end(JSON.stringify('mierda')); //in case something goes wrong in the catch block
}

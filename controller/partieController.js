const Joueur = require("../models/joueur");
const Partie = require("../models/partie");

async function getall(req, res) {
  try {
    const data = await Joueur.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function add(req, res) {
  try {
    //console.log("data", req.body);
    const joueur = new Joueur({
      pseudo: req.body.pseudo,
      sante: 100,
      score: 0,
    });
    await joueur.save();
    res.status(200).send("add good");
  } catch (err) {
    res.status(400).send({ error: err });
    //console.log();
  }
}

async function deletejoueur(req, res) {
  try {
    await Joueur.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getbyid(req, res) {
  try {
    const data = await Joueur.findById(req.params.id);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function attaque(req, res) {
  try {
    const j1 = await Joueur.findById(req.params.id1);
    const j2 = await Joueur.findById(req.params.id2);
    score1 = j1.score + 20;
    sante1 = j2.sante - 10;
    const j1u = await Joueur.findByIdAndUpdate(req.params.id1, {
      score: score1,
    });
    const j2u = await Joueur.findByIdAndUpdate(req.params.id2, {
      sante: sante1,
    });
    res.status(200).send(j1u + "....." + j2u);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function addpartie(req, res) {
  try {
    //console.log("data", req.body);
    const partie = new Partie({
      nom: req.body.nom,
      joueur_1: req.params.id1,
      joueur_2: req.params.id2,
      etat: "en cours",
    });
    await partie.save();
    res.status(200).send("add good");
  } catch (err) {
    res.status(400).send({ error: err });
    //console.log();
  }
}

async function addpartiesocket(data) {
  try {
    //console.log("data", req.body);
    const partie = new Partie({
      nom: data.nom,
      joueur_1: data.id1,
      joueur_2: data.id2,
      etat: "en cours",
    });
    await partie.save();
    //res.status(200).send("add good");
  } catch (err) {
    //res.status(400).send({ error: err });
    console.log(err);
  }
}

async function getbyidsocket(data) {
  try {
    const j1u = await Joueur.findById(data.id1);
    const j2u = await Joueur.findById(data.id2);
    r = { j1: j1u, j2: j2u };
    return r;
    //res.status(200).send(data);
  } catch (err) {
    //res.status(400).send(err);
    console.log(err);
  }
}


async function attaqueSocket(data) {
  try {
    

    // Assume Joueur.findById and Joueur.findByIdAndUpdate are defined elsewhere
    const j1 = await Joueur.findById(data.id1);
    const j2 = await Joueur.findById(data.id2);

    // Update j1 and j2
    const score1 = j1.score + 20;
    const sante1 = j2.sante - 10;
    const j1u = await Joueur.findByIdAndUpdate(data.id1, { score: score1 }, { new: true });
    const j2u = await Joueur.findByIdAndUpdate(data.id2, { sante: sante1 }, { new: true });
    if (j2u.sante <= 0) {
      console.log('Game finished! Player 1 wins!');
    }
    return { j1: j1u, j2: j2u };
    
  } catch (err) {
    throw new Error(err.message);
  }
}

async function contreattaqueSocket(data) {
  try {
    

    // Assume Joueur.findById and Joueur.findByIdAndUpdate are defined elsewhere
    const j1 = await Joueur.findById(data.id1);
    const j2 = await Joueur.findById(data.id2);

    // Update j1 and j2
    const score1 = j2.score + 20;
    const sante1 = j1.sante - 10;
    const j1u = await Joueur.findByIdAndUpdate(data.id1, { sante: sante1 });
    const j2u = await Joueur.findByIdAndUpdate(data.id2, { score: score1 });
    if (j1u.sante <= 0) {
      console.log('Game finished! Player 1 wins!');
    }
    return { j1: j1u, j2: j2u };
  } catch (err) {
    throw new Error(err.message);
  }
}


module.exports = {
  getall,
  add,
  deletejoueur,
  getbyid,
  attaque,
  addpartie,
  addpartiesocket,
  getbyidsocket,
  attaqueSocket,
  contreattaqueSocket
};

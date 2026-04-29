const mongoose = require('mongoose')

// GET all
// @param: Model -> mongoose-Model, das verwendet werden soll ;; mandatory
// @param: sortCrit -> Kriterium, nach dem sortiert werden soll, z.B. ({name:1}) ;; optional
const getAll = async (req, res, Model, sortCrit) => {
    try {
      const all = await Model.find({}).sort(sortCrit).lean().exec(); 
      res.status(200).json(all);
    } catch (err) {
      res.status(500).end(err);
    }
  }

  //GET one by ID
  // @param: Model -> mongoose-Model, das verwendet werden soll ;; mandatory
  // @param: errName -> Name des Objekts, der in der Fehlermeldung verwendet wird ;; mandatory
  const getById = async (req, res, Model, errName) =>{
    //Schnappt die id aus der URL /:id
    const { id } = req.params
    //return verhindert das weitere Ausführen des Codes, wenn die id nicht dem Schema einer ID entspricht
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:`${errName}-Suche nicht möglich : invalid id`})
    }

    const item = await Model.findById(id)
    
    //return verhindert das weitere Ausführen des Codes, wenn die id nicht gefunden wird
    if(!item) {
        return res.status(404).json({error:`${errName} existiert nicht`})
    }

    res.status(200).json(item)
  }

  //UPDATE one by ID
    // @param: Model -> mongoose-Model, das verwendet werden soll ;; mandatory
    // @param: errName -> Name des Objekts, der in der Fehlermeldung verwendet wird ;; mandatory
  const updateOneById = (req, res, Model, errName) =>{
    const { id } = req.params

    //return verhindert das weitere Ausführen des Codes, wenn die id nicht dem Schema einer ID entspricht
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:`${errName}-Update nicht möglich : invalid id`})
    }

    // findOneAndUpdate bekommt die id zum Suchen und danach ein json, was upgedatet werden soll...
    // ...Hier zerlegen wir die req in ihre Teile und übergeben sie als json, sodass nur die upgedatet werden, die enthalten sind
    // Aufgrund von { new: true}, wird das aktualisierte Objekt zurückgegeben
    //lean().exec() umgehen das Problem mit der Circular Response (https://stackoverflow.com/questions/67837324/how-to-get-data-from-model-in-node-express)
    // exec() gibt ein Promise zurück, mit dem wir einen Fehler werfen oder den AKTUALISIERTEN json zurückgeben
    Model.findOneAndUpdate({_id: id}, {...req.body}, { new: true}).lean().exec()
    .then(updatedItem => {
        if (!updatedItem) {
            return res.status(404).json({ error: `${errName} nicht gefunden.`})
        }
        return res.json(updatedItem);
    })
    .catch(err => {
        return res.status(500).json({ error: `Fehler beim {errName}-Aktualisieren.`})
    })
  }

  //DELETE ONE by ID
  const deleteOneById = (req, res, Model, errName) =>{
    const { id } = req.params

    //return verhindert das weitere Ausführen des Codes, wenn die id nicht dem Schema einer ID entspricht
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:`Löschen nicht möglich : invalid ${errName}-id`})
    }

    Model.findOneAndDelete({_id: id}).lean().exec()
    .then(deletedItem => {
        if (!deletedItem) {
            return res.status(404).json({ error: `${errName}-Objekt nicht gefunden.`})
        }
        return res.json(deletedItem);
    })
    .catch(err => {
        return res.status(500).json({ error: `Fehler beim Löschen des ${errName}-Objekts.` })
    });
  }

  module.exports = {
    getAll,
    getById,
    updateOneById,
    deleteOneById
  }
module.exports = { 
  insertEntity: async (req, entity) => {
    try {
      await cds.run(INSERT.into("mySales").entries(req)) //inserto array con objetos en entidad mySales
    } catch (e) {
      console.log(e, `Error inserting into ${ entity }`)
    }
  },

  validateNumbers: (req, arr) => {
    const d = req.data

    let intNumbers = []                 //defino nuevo array vacío
    
    arr.forEach(el => {                 //recorro todos los campos numéricos
      if (el) {                         //verifico que existan (pueden no estar en la petición)

        if (Number(el) <= 0)            //convierto el dato a número (API los envía como string, p.e.: "120") y valido que sea mayor a 0
          req.reject(500, "One or more values ares less or equal to zero") //se rechaza la petición
        intNumbers.push(Number(el))     //caso contrario, se agrega el dato al array que había definido como vacío
      }
    })
  },

  validateCreationDate: req => {
    if (req.data.CreationDate)                                  //verifico que exista el campo
      req.reject(500, "CreationDate field is auto generated")   //se rechaza la petición porque el usuario no la puede ingresar
    req.data.CreationDate = todayDate()                         //si no existe, lo insertamos
  },

  findOne: async (req, entity, params) => {
    const findOne = await SELECT.one.from(entity).where({ params }) //verifico que exista un campo con ese ID
    
    if(!findOne) 
      req.reject(400, "Input ID doesn't match")             //si no existe, se rechaza la petición
  }
}

const todayDate = () => {       
  return new Date().toLocaleDateString('en-CA')  //devuelve la fecha actual con formato YYYY-MM-DD para matchear los dates de la API
}
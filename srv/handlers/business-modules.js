const cds = require("@sap/cds")

module.exports = {
  insertMyBusiness: async req => {
    try {
      await cds.run(INSERT.into("MyBusiness").entries(req))  //inserto array con objetos en entidad MyBusiness
    } catch (e) {
      console.log(e, "error inserting into MyBusiness")
    }
  },

  validateNumbers: req => { //validador de ...
    const d = req.data
    const stringNumbers = [ //...todos los siguientes campos numéricos
      d.BusinessPartner,
      d.BusinessPartnerCategory,
      d.FormOfAddress,
      d.InternationalLocationNumber1,
      d.InternationalLocationNumber2,
      d.InternationalLocationNumber3
    ]

    let intNumbers = [] //defino nuevo array vacío
    
    stringNumbers.forEach(el => { //recorro todos los campos numéricos
      if (el) {                   //verifico que existan (pueden no estar en la petición)
        //console.log(`type of ${el}: `, typeof(Number(el)))

        if (Number(el) <= 0)        //convierto el dato a número (API los envía como string, p.e.: "120") y valido que sea mayor a 0
          req.reject(500, "One or more values ares less or equal to zero") //se rechaza la petición
        intNumbers.push(Number(el)) //caso contrario, se agrega el dato al array que había definido como vacío
      }
    })
  },

  validateDates: req => {
    validateCreationDate(req)         //valida creation date
  }
}

const todayDate = () => {
  return new Date().toLocaleDateString('en-CA') //devuelve la fecha actual con formato YYYY-MM-DD para matchear los dates de la API
}

const validateCreationDate = req => {
  if (req.data.CreationDate)   //verifico que exista el campo
    req.reject(500, "CreationDate field is auto generated") //se rechaza la petición porque el usuario no la puede ingresar
  req.data.CreationDate = todayDate()             //si no existe, lo insertamos
}

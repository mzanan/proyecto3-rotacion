const cds = require("@sap/cds")

module.exports = { //funciones que se van a exportar
  insertMySales: async req => {
    try {
      await cds.run(INSERT.into("mySales").entries(req)) //inserto array con objetos en entidad mySales
    } catch (e) {
      console.log(e, "Error inserting into mySales")
    }
  },

  validateNumbers: req => { //validador de ...
    const d = req.data
    const stringNumbers = [ //...todos los siguientes campos numéricos
      d.SalesOrder,
      d.SalesOrganization,
      d.DistributionChannel,
      d.SoldToParty,
      d.TotalNetAmount,
      d.PriceDetnExchangeRate,
      d.ShippingCondition,
      d.CustomerPaymentTerms,
      d.CustomerAccountAssignmentGroup,
      d.CustomerGroup,
    ]

    let intNumbers = [] //defino nuevo array vacío
    
    stringNumbers.forEach(el => {       //recorro todos los campos numéricos
      if (el) {                         //verifico que existan (pueden no estar en la petición)

        //console.log(`type of ${el}: `, typeof(Number(el)))

        if (Number(el) <= 0)            //convierto el dato a número (API los envía como string, p.e.: "120") y valido que sea mayor a 0
          req.reject(500, "One or more values ares less or equal to zero") //se rechaza la petición
        intNumbers.push(Number(el))     //caso contrario, se agrega el dato al array que había definido como vacío
      }
    })
  },

  validateDates: req => {
    validateCreationDate(req)         //valida creation date
    validateSalesNPricingDates(req)   //valida los campos salesOrderDate and pricingDate
  }
}

const todayDate = () => {       
  return new Date().toLocaleDateString('en-CA')  //devuelve la fecha actual con formato YYYY-MM-DD para matchear los dates de la API
}

const validateCreationDate = req => {
  if (req.data.CreationDate)                                  //verifico que exista el campo
    req.reject(500, "CreationDate field is auto generated")   //se rechaza la petición porque el usuario no la puede ingresar
  req.data.CreationDate = todayDate()                         //si no existe, lo insertamos
}

const validateSalesNPricingDates = req => {
  const d = req.data
  if (d.SalesOrderDate || d.PricingDate) {                           //verifico si las variables existen
    
    const validSalesDate   = isValidDate(new Date(d.SalesOrderDate)) //valido la fecha
    const validPricingDate = isValidDate(new Date(d.PricingDate))    //valido la fecha

    if(!validSalesDate && !validPricingDate) {                       //si ambas son false, se rechaza la petición 
      req.reject(500, "SalesOrderDate or PricingDate aren't valid dates, use format yyyy-mm-dd")
    }
    else {                                                           //se valida que sean mayores que creationDate
      if (d.SalesOrderDate < d.CreationDate || d.PricingDate < d.CreationDate) {
        req.reject(500, "SalesOrderDate or PricingDate must be past than CreationDate")
      } 
    }
  }
  else console.log("SalesOrderDate or PricingDate doesn't exist")
}

const isValidDate = date => { //recibe una fecha como parámetro y y devuelve un boolean
  return date instanceof Date && !isNaN(date)
}

// ------------------- DOS FUNCIONES DIFERENTES PARA ELIMINAR ELEMENTOS DUPLICADOS DENTRO DE UN ARRAY -------------------- //
// Dejo las dos pero ninguna me dio el resultado esperado, por eso no se utilizan
function removeDuplicates(originalArray, prop) {
  let newArray = []
  let lookupObject  = {}

  for(let i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i]
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i])
  }
   return newArray
}

const validateRepetated = req => {
  const result = [];
  req.forEach((item)=>{
    //pushes only unique element
    if(!result.includes(item.SalesOrganization) ){
      result.push(item);
    }
  })
  return result
}

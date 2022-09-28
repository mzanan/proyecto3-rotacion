const cds = require("@sap/cds")

module.exports = {
  validateSalesNPricingDates: req => {
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
}

const isValidDate = date => {                   //recibe una fecha como parámetro y y devuelve un boolean
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

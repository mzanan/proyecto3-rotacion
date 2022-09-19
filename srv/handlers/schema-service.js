const cds = require("@sap/cds")

module.exports = cds.service.impl(async function () {

  // ------------------------------------- SALES ORDER SRV  --------------------------------------- //
  //importación de archivos con funciones
  const salesModules = require("./sales-modules")              //importación de módulo con lógica de negocio
  const apiSales = await cds.connect.to("API_SALES_ORDER_SRV") //conexión al api hub

  this.on("READ", "SalesOrder", async req => {    //leyendo la información contenida en el api hub
    return apiSales.run(req.query)                //se almacena la data en nuestra entidad SalesOrder
  })
  
  this.after("READ", "SalesOrder", async req => {  //después de recopilar la data de la api...
    salesModules.insertMySales(req)                //...la insertamos en una nueva entidad
  })
  
  this.before("CREATE", "mySales", async req => {  //método CREATE
    salesModules.validateNumbers(req)              //validacion de campos numéricos
    salesModules.validateDates(req)                //validación de fechas
  })
  
  this.before("UPDATE", "mySales", async req => {  //método UPDATE
    const SalesOrder = req.params[0].SalesOrder    //recupero el ID de la petición
    const findOne = await SELECT.one.from("mySales").where({ SalesOrder }) //verifico que exista un campo con ese ID
    
    if(!findOne) 
      req.reject(400, "Input ID doesn't match")    //si no existe, se rechaza la petición
  })

  this.before("DELETE", "mySales", async req => {  //método DELETE
    const SalesOrder = req.params[0].SalesOrder    //recupero el ID de la petición
    const findOne = await SELECT.one.from("mySales").where({ SalesOrder }) //verifico que exista un campo con ese ID
   
    if(!findOne) 
      req.reject(400, "Input ID doesn't match")    //si no existe, se rechaza la petición
  })

  // ------------------------------------- BUSINESS PARTNER --------------------------------------- //
  const businessModules = require("./business-modules")              //importación de módulo con lógica de negocio
  const apiBusiness = await cds.connect.to("API_BUSINESS_PARTNER")   //conexión al api hub
  
  this.on("READ", "BusinessPartner", async req => {         //leyendo la información contenida en el api hub
    return apiBusiness.run(req.query)                       //se almacena la data en nuestra entidad BusinessPartner
  })

  this.after("READ", "BusinessPartner", async req => {      //después de recopilar la data de la api...
    businessModules.insertMyBusiness(req)                   //...la insertamos en una nueva entidad
  })
  
  this.before("CREATE", "myBusiness", async req => {        //método CREATE
    businessModules.validateNumbers(req)              //validacion de campos numéricos
    businessModules.validateDates(req)                //validación de fechas
  })
  
  this.before("UPDATE", "myBusiness", async req => {         //método UPDATE
    const BusinessPartner = req.params[0].BusinessPartner    //recupero el ID de la petición
    const findOne = await SELECT.one.from("myBusiness").where({ BusinessPartner }) //verifico que exista un campo con ese ID
    
    if(!findOne) 
      req.reject(400, "Input ID doesn't match")             //si no existe, se rechaza la petición
  })

  this.before("DELETE", "myBusiness", async req => {          //método DELETE
    const BusinessPartner = req.params[0].BusinessPartner    //recupero el ID de la petición
    const findOne = await SELECT.one.from("myBusiness").where({ BusinessPartner }) //verifico que exista un campo con ese ID
   
    if(!findOne) 
      req.reject(400, "Input ID doesn't match")    //si no existe, se rechaza la petición
  })

})

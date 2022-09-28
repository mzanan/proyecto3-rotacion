const cds = require("@sap/cds")

module.exports = {
  main: async (srv) => {
    const apiBusiness = await cds.connect.to("API_BUSINESS_PARTNER")   //conexión al api hub
    
    srv.on("READ", "BusinessPartner", async req => {          //leyendo la información contenida en el api hub
      return apiBusiness.run(req.query)                       //se almacena la data en nuestra entidad BusinessPartner
    })

    srv.after("READ", "BusinessPartner", async req => {      //después de recopilar la data de la api...
      genericModules.insertEntity(req, "MyBusiness")    
    })
    
    srv.before("CREATE", "myBusiness", async req => {        //método CREATE
      const d = req.data
      const arrNumbers = [ 
      d.BusinessPartner,
      d.BusinessPartnerCategory,
      d.FormOfAddress,
      d.InternationalLocationNumber1,
      d.InternationalLocationNumber2,
      d.InternationalLocationNumber3
    ] // campos numéricos

      genericModules.validateNumbers(req, arrNumbers)   //validacion de campos numéricos
      genericModules.validateCreationDate(req)          //validación de fechas
    })
    
    srv.before("UPDATE", "myBusiness", async req => {         //método UPDATE
      const BusinessPartner = req.params[0].BusinessPartner    //recupero el ID de la petición
      genericModules.findOne(req, "myBusiness", BusinessPartner)
    })

    srv.before("DELETE", "myBusiness", async req => {          //método DELETE
      const BusinessPartner = req.params[0].BusinessPartner    //recupero el ID de la petición
      genericModules.findOne(req, "myBusiness", BusinessPartner)
    })
  }
}
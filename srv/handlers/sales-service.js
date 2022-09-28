const cds = require("@sap/cds")

module.exports = {
  main: async (srv) => {
    const genericModules  = require("../modules/generic-modules")          //importación de módulos reutilizables con lógica de negocio
    const salesModules    = require("../modules/sales-modules")            //importación de módulo con lógica de negocio
    const apiSales        = await cds.connect.to("API_SALES_ORDER_SRV")    //conexión al api hub

    srv.on("READ", "SalesOrder", async req => {     //leyendo la información contenida en el api hub
      return apiSales.run(req.query)                //se almacena la data en nuestra entidad SalesOrder
    })
    
    srv.after("READ", "SalesOrder", async req => {  //después de recopilar la data de la api...
      genericModules.insertEntity(req, "mySales")    
    })

    srv.before("CREATE", "mySales", async req => {  //método CREATE
      const d = req.data
      const arrNumbers = [
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
      ] // campos numéricos

      genericModules.validateNumbers(req, arrNumbers) //validacion de campos numéricos
      genericModules.validateCreationDate(req)        //validación de fechas
      salesModules.validateSalesNPricingDates(req)    //validación de fechas
    })
    
    srv.before("UPDATE", "mySales", async req => {  //método UPDATE
      const SalesOrder = req.params[0].SalesOrder    //recupero el ID de la petición
      genericModules.findOne(req, "mySales", SalesOrder)
    })

    srv.before("DELETE", "mySales", async req => {  //método DELETE
      const SalesOrder = req.params[0].SalesOrder    //recupero el ID de la petición
      genericModules.findOne(req, "mySales", SalesOrder)
    })
  }
}

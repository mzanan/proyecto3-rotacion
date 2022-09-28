const cds       = require("@sap/cds")
const sales     = require("../handlers/sales-service")
const business  = require("../handlers/business-service")

module.exports = cds.service.impl( function (srv) {
  sales.main(srv)
  business.main(srv)
})

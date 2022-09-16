using {Sales as my} from '../db/schema';

//expongo las entidades a través de un servicio
service Api {
// ------------------------------------- Entidades API's  --------------------------------------- //
  entity SalesOrder              as projection on my.SalesOrder;
  entity BusinessPartner         as projection on my.BusinessPartner;

// ------------------------------------- Entidades propias --------------------------------------- //
  entity mySales                 as projection on my.mySales;
  entity myBusiness              as projection on my.myBusiness;
  entity to_Item                 as projection on my.to_Item;
  entity IncotermsClassification as projection on my.IncotermsClassification;
}

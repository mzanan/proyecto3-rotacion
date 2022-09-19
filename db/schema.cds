namespace Sales;

// consumo de apis hub
using {API_SALES_ORDER_SRV as ApiSales} from '../srv/external/API_SALES_ORDER_SRV';
using {API_BUSINESS_PARTNER as ApiBussiness} from '../srv/external/API_BUSINESS_PARTNER';

// ------------------------------------- Entidades API's  --------------------------------------- //
entity SalesOrder      as projection on ApiSales.A_SalesOrder { * }
entity BusinessPartner as projection on ApiBussiness.A_BusinessPartner { * }

// ------------------------------------- Entidades propias --------------------------------------- //
entity mySales {
  key SalesOrder                     : String;
      myBusiness                     : Composition of many myBusiness;
      myInconterms                   : Association to one IncotermsClassification;
      myItems                        : Composition of many to_Item;

      SalesOrderType                 : String;
      SalesOrganization              : String;
      DistributionChannel            : String;
      OrganizationDivision           : String;
      SalesGroup                     : String;
      SalesOffice                    : String;
      SalesDistrict                  : String;
      SoldToParty                    : String;
      CreationDate                   : String;
      CreatedByUser                  : String;
      LastChangeDate                 : String;
      SenderBusinessSystemName       : String;
      ExternalDocumentID             : String;
      LastChangeDateTime             : String;
      ExternalDocLastChangeDateTime  : String;
      PurchaseOrderByCustomer        : String;
      PurchaseOrderByShipToParty     : String;
      CustomerPurchaseOrderType      : String;
      CustomerPurchaseOrderDate      : String;
      SalesOrderDate                 : String;
      TotalNetAmount                 : String;
      OverallDeliveryStatus          : String;
      TotalBlockStatus               : String;
      OverallOrdReltdBillgStatus     : String;
      OverallSDDocReferenceStatus    : String;
      TransactionCurrency            : String;
      SDDocumentReason               : String;
      PricingDate                    : String;
      PriceDetnExchangeRate          : String;
      BillingPlan                    : String;
      RequestedDeliveryDate          : String;
      ShippingCondition              : String;
      CompleteDeliveryIsDefined      : String;
      ShippingType                   : String;
      HeaderBillingBlockReason       : String;
      DeliveryBlockReason            : String;
      DeliveryDateTypeRule           : String;
      IncotermsClassification        : String;
      IncotermsTransferLocation      : String;
      IncotermsLocation1             : String;
      IncotermsLocation2             : String;
      IncotermsVersion               : String;
      CustomerPriceGroup             : String;
      PriceListType                  : String;
      CustomerPaymentTerms           : String;
      PaymentMethod                  : String;
      FixedValueDate                 : String;
      AssignmentReference            : String;
      ReferenceSDDocument            : String;
      ReferenceSDDocumentCategory    : String;
      AccountingDocExternalReference : String;
      CustomerAccountAssignmentGroup : String;
      AccountingExchangeRate         : String;
      CustomerGroup                  : String;
      AdditionalCustomerGroup1       : String;
      AdditionalCustomerGroup2       : String;
      AdditionalCustomerGroup3       : String;
      AdditionalCustomerGroup4       : String;
      AdditionalCustomerGroup5       : String;
      SlsDocIsRlvtForProofOfDeliv    : String;
      CustomerTaxClassification1     : String;
      CustomerTaxClassification2     : String;
      CustomerTaxClassification3     : String;
      CustomerTaxClassification4     : String;
      CustomerTaxClassification5     : String;
      CustomerTaxClassification6     : String;
      CustomerTaxClassification7     : String;
      CustomerTaxClassification8     : String;
      CustomerTaxClassification9     : String;
      TaxDepartureCountry            : String;
      VATRegistrationCountry         : String;
      SalesOrderApprovalReason       : String;
      SalesDocApprovalStatus         : String;
      OverallSDProcessStatus         : String;
      TotalCreditCheckStatus         : String;
      OverallTotalDeliveryStatus     : String;
      OverallSDDocumentRejectionSts  : String;
      BillingDocumentDate            : String;
      ContractAccount                : String;
      AdditionalValueDays            : String;
      CustomerPurchaseOrderSuplmnt   : String;
      ServicesRenderedDate           : String;
}

entity myBusiness {
  key BusinessPartner                : Integer;
      mySales                        : Association to mySales;
      
      Customer                       : String;
      Supplier                       : String;
      AcademicTitle                  : String;
      AuthorizationGroup             : String;
      BusinessPartnerCategory        : Integer;
      BusinessPartnerFullName        : String;
      BusinessPartnerGrouping        : String;
      BusinessPartnerName            : String;
      BusinessPartnerUUID            : UUID;
      CorrespondenceLanguage         : String;
      CreatedByUser                  : String;
      CreationDate                   : Date;
      CreationTime                   : Time;
      FirstName                      : String;
      FormOfAddress                  : Integer;
      Industry                       : String;
      InternationalLocationNumber1   : Integer;
      InternationalLocationNumber2   : Integer;
      IsFemale                       : Boolean;
      IsMale                         : Boolean;
      IsNaturalPerson                : String;
      IsSexUnknown                   : Boolean;
      GenderCodeName                 : String;
      Language                       : String;
      LastChangeDate                 : String;
      LastChangeTime                 : Integer;
      LastChangedByUser              : String;
      LastName                       : String;
      LegalForm                      : String;
      OrganizationBPName1            : String;
      OrganizationBPName2            : String;
      OrganizationBPName3            : String;
      OrganizationBPName4            : String;
      OrganizationFoundationDate     : String;
      OrganizationLiquidationDate    : String;
      SearchTerm1                    : String;
      SearchTerm2                    : String;
      AdditionalLastName             : String;
      BirthDate                      : String;
      BusinessPartnerBirthDateStatus : String;
      BusinessPartnerBirthplaceName  : String;
      BusinessPartnerDeathDate       : String;
      BusinessPartnerIsBlocked       : Boolean;
      BusinessPartnerType            : String;
      ETag                           : String;
      GroupBusinessPartnerName1      : String;
      GroupBusinessPartnerName2      : String;
      IndependentAddressID           : String;
      InternationalLocationNumber3   : Integer;
      MiddleName                     : String;
      NameCountry                    : String;
      NameFormat                     : String;
      PersonFullName                 : String;
      PersonNumber                   : String;
      IsMarkedForArchiving           : Boolean;
      BusinessPartnerIDByExtSystem   : String;
      BusinessPartnerPrintFormat     : String;
      BusinessPartnerOccupation      : String;
      BusPartMaritalStatus           : String;
      BusPartNationality             : String;
      BusinessPartnerBirthName       : String;
      BusinessPartnerSupplementName  : String;
      NaturalPersonEmployerName      : String;
      LastNamePrefix                 : String;
      LastNameSecondPrefix           : String;
      Initials                       : String;
      TradingPartner                 : String;
}

entity to_Item {
  key ID      : String;
      uri     : String;

      mySales : Association to mySales;
      
}

entity IncotermsClassification {
  key ID          : Integer;
      Category    : String(1);
      TradeTerms  : String;
      Description : String;

      mySales     : Association to mySales;

}

annotate Api.SalesOrder with @(SelectionFields : [SalesOrganization, DistributionChannel]); //fiori elements

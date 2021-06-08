Feature: PersonUI

  Scenario: PWS_006 Error Validation: "Possible match: Precise Name match" when adding duplicate Person Party Records
    Given I am logged in to PWS
    |UserName|Password|
    |gr4oPartyTest02|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IlNwNDIlP3NXKiIsImlhdCI6MTYxMjE5OTYzNn0.KNjEfAgQai_R8GFpvvWiGzSJyT7EPRXZgy9l8CRNY1g|
    When I have navigated to the party workspace home page 
    When Adding the person party record to check match on create
    |PartyType|PersonPartyNameType|PersonFirstName|PersonLastName|ISNI|IPN|MusicBrainzId|PersonBirthDay|PersonBirthMonth|PersonBirthYear|PersonDistinguishingInfo|PersonAdminNotes|
    |person|RealName|Zion|Smith||||2|2|2001|Test1Test1Test1Test1Test1Test1|No Admin Notes|
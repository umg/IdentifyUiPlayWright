Feature: PersonUI

  Scenario: PWS_003 Add ancillary data to a party 
    Given I am logged in to PWS
    |UserName|Password|
    |gr4oPartyTest02|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IlNwNDIlP3NXKiIsImlhdCI6MTYxMjE5OTYzNn0.KNjEfAgQai_R8GFpvvWiGzSJyT7EPRXZgy9l8CRNY1g|
    When I have navigated to the party workspace home page 
    When I add the person party record
    |PartyType|PersonPartyNameType|PersonFirstName|PersonLastName|ISNI|IPN|MusicBrainzId|PersonBirthDay|PersonBirthMonth|PersonBirthYear|PersonDistinguishingInfo|PersonAdminNotes|
    |person|RealName|Faysal|Smith||||2|2|2001|Test1Test1Test1Test1Test1Test1|No Admin Notes|
    Then I add the Variant Names ancillary
   

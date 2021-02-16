Feature: PartyRecordsUI

Scenario: PWS_003 Ensure Verify Ancillary Records works as expected
    Given I am logged in to PWS
    |UserName|Password|
    |gr4oPartyTest02|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IlNwNDIlP3NXKiIsImlhdCI6MTYxMjE5OTYzNn0.KNjEfAgQai_R8GFpvvWiGzSJyT7EPRXZgy9l8CRNY1g|
    When I have navigated to the party workspace home page 
    When I add the person party record
    |PartyType|PersonPartyNameType|PersonFirstName|PersonLastName|ISNI|IPN|MusicBrainzId|PersonBirthDay|PersonBirthMonth|PersonBirthYear|PersonDistinguishingInfo|PersonAdminNotes|
    |person|RealName|Alun|Smith||||2|2|2001|Nothing distinguishing|No Admin Notes|
    |person|RealName|Steve|Jones||||3|3|1998|Nothing distinguishing|No Admin Notes|
    When I verify the Ancillary Record
    Then I ensure the Ancillary Record is Verified
    Then I log out
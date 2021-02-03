Feature: PersonUI

  Scenario: PWS_001 Add new person party record and verify name and type via search on party detail page
    Given I am logged in to PWS
    |UserName|Password|
    |gr4oPartyTest02|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IlNwNDIlP3NXKiIsImlhdCI6MTYxMjE5OTYzNn0.KNjEfAgQai_R8GFpvvWiGzSJyT7EPRXZgy9l8CRNY1g|
    When I have navigated to the party workspace home page 
    When I add the person party record
    |PartyType|PersonPartyNameType|PersonFirstName|PersonLastName|ISNI|IPN|MusicBrainzId|PersonBirthDay|PersonBirthMonth|PersonBirthYear|PersonDistinguishingInfo|PersonAdminNotes|
    |person|RealName|Alun|Smith||||2|2|2001|Nothing distinguishing|No Admin Notes|
    |person|RealName|Steve|Jones||||3|3|1998|Nothing distinguishing|No Admin Notes|
    When I have navigated to the party workspace Search page
    When I search and navigate to the first person party record details page
    Then The person party full name is displayed
    Then I log out


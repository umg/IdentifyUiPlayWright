Feature: AddBasket

  Scenario: PWS_004 Add parties to a new basket
    Given I am logged in to PWS
    |UserName|Password|
    |gr4oPartyTest02|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IlNwNDIlP3NXKiIsImlhdCI6MTYxMjE5OTYzNn0.KNjEfAgQai_R8GFpvvWiGzSJyT7EPRXZgy9l8CRNY1g|
    When I have navigated to the party workspace home page 
    When I add the person party record
    |PartyType|PersonPartyNameType|PersonFirstName|PersonLastName|ISNI|IPN|MusicBrainzId|PersonBirthDay|PersonBirthMonth|PersonBirthYear|PersonDistinguishingInfo|PersonAdminNotes| 
    |person       |RealName|Alun|Smith||||2|2|2001|Nothing distinguishing|No Admin Notes|
    |person|RealName|Steve|Jones||||3|3|1998|Nothing distinguishing|No Admin Notes|
    When I have navigated to the party workspace Search page
    When I search for the party created
    When I select a party from the search results
    Then I create a new basket
    Then a new basket is created with the selected parties
    Then I log out
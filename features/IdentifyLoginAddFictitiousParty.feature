Feature: FictitiousUI

Scenario: PWS_003 Add new Fictitious Character party record and verify name and type via search on party details page
Given I am logged in to PWS
    |UserName|Password|
    |gr4oPartyTest02|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IlNwNDIlP3NXKiIsImlhdCI6MTYxMjE5OTYzNn0.KNjEfAgQai_R8GFpvvWiGzSJyT7EPRXZgy9l8CRNY1g|
    When I have navigated to the party workspace home page 
    When I add the Fictitious Character party record
    |Type               |Name|ISNI|IPI |IPN |MusicBrainzId|ActiveFromDay|ActiveFromMonth|ActiveFromYear|FictitiousDistinguishingInfo|FictitiousAdminNotes|
    |fictitiouscharacter||0000|0000|0000|00000000|2|12|1996|DistTest|NotesTest|
    When I have navigated to the party workspace Search page
    When I search and navigate to the Fictitious Character party record details page
    Then The Fictitious Character party full name is displayed
    Then I log out
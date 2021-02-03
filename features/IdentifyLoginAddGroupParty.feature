Feature: GroupUI

  Scenario: PWS_002 Add new group party record and verify name and type via search on party detail page
    Given I am logged in to PWS
    |UserName|Password|
    |gr4oPartyTest02|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IlNwNDIlP3NXKiIsImlhdCI6MTYxMjE5OTYzNn0.KNjEfAgQai_R8GFpvvWiGzSJyT7EPRXZgy9l8CRNY1g|
    When I have navigated to the party workspace home page 
    When I add the group party record
    |GroupPartyType|GroupType|GroupName|ISNI|IPI|IPN|MusicBrainzId|FormedDay|FormedMonth|FormedYear|GroupDistinguishingInfo|GroupAdminNotes|	
    |group|Band|BandX|||||2|12|1997|Nothing|Some notes|	
    |group|Band|BandY|||||2|11|1997|Nothing|Some notes|	
    When I have navigated to the party workspace Search page
    When I search and navigate to the group party record details page
    Then The group party full name is displayed
    Then I log out

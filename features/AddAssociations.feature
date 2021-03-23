Feature: AssosiationsUI

  Scenario: PWS_001 Add association to 
    Given I am logged in to PWS
    |UserName|Password|
    |gr4oPartyTest02|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IlNwNDIlP3NXKiIsImlhdCI6MTYxMjE5OTYzNn0.KNjEfAgQai_R8GFpvvWiGzSJyT7EPRXZgy9l8CRNY1g|
    When I have navigated to the party workspace home page 
    When I add "first" person party record
     When I have navigated to the party workspace home page 
    When I add "second" person party record
    When I have navigated to the party workspace Search page
    When I search and navigate to the first person party record details page
    When I add assosiation between first and second party
    When I have navigated to the party workspace Search page
    When I search and navigate to the first person party record details page
    Then I assert the associations count for type "IsAnotherNameFor"
    Then I log out
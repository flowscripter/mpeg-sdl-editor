Feature: Webapp

  Scenario: Webapp success
    When the webapp URL "index.html" is loaded
    Then the page element with data-testid "editor-container" should be available

Feature: Rights Notices 
  In order to ensure that the interests of the owning or publishing institutions are conveyed 
  As a copyright owner 
  I want the user to see the copyright and ownership statements 

  Scenario: Attribution 
    Given the viewer is opened with a publication with attribution labels
    Then the attribution must be shown 

  Scenario: License 
    Given the viewer is opened with a publication with licenses associated with it
    Then the license must be shown as hyperlinks
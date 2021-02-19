let PWSIterationLib = require('../../../PWSIterationClass');
var dateFormat = require('dateformat');
var fs = require('fs');
const EventEmitter = require('events');


const {
  Given,
  When,
  Then,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("cucumber");

const { chromium } = require("playwright");
const expect = require("expect");


setDefaultTimeout(50 * 1000);



When('I add the group party record', async (ParameterData) =>  {
  
  DoIteration.GroupPartyType = ParameterData.raw()[1][0]
  DoIteration.GroupType = ParameterData.raw()[1][1]
  DoIteration.GroupName = ParameterData.raw()[1][2]
  DoIteration.GroupISNI = ParameterData.raw()[1][3]
  DoIteration.GroupIPI = ParameterData.raw()[1][4]
  DoIteration.GroupIPN = ParameterData.raw()[1][5]
  DoIteration.GroupMusicBrainzId = ParameterData.raw()[1][6]
  DoIteration.GroupFormedDay = ParameterData.raw()[1][7]
  DoIteration.GroupFormedMonth = ParameterData.raw()[1][8]
  DoIteration.GroupFormedYear = ParameterData.raw()[1][9]
  DoIteration.GroupDistinguishingInfo = ParameterData.raw()[1][10]
  DoIteration.GroupAdminNotes = ParameterData.raw()[1][11]

  let result = await DoIteration.AddPartyLib.AddGroupParty(DoIteration)

});

When('I search and navigate to the group party record details page', async () => { 
  let result = await DoIteration.SearchForGroupPartyAndOpen() 
});

Then('The group party full name is displayed', async () => {
  expect(DoIteration.NameAsEntered).toEqual(DoIteration.GroupNameFromScreen) 
});

When ('I verify the Ancillary Record', async () => {
  let result = await DoIteration.VerifyAncillaryRecord()
});
  
Then ('I ensure the Ancillary Record is Verified', async () => {
  let result = await DoIteration.AncillaryRecordIsVerified()
});

When('I add the Fictitious Character party record', async (ParameterData) => {
    
  DoIteration.FictionalType = ParameterData.raw()[1][0]
  DoIteration.FictionName = ParameterData.raw()[1][1]
  DoIteration.FictionalISNI = ParameterData.raw()[1][2]
  DoIteration.FictionalIPI = ParameterData.raw()[1][3]
  DoIteration.FictionalIPN = ParameterData.raw()[1][4]
  DoIteration.FictionalMusicBrainz = ParameterData.raw()[1][5]
  DoIteration.ActiveFromDay = ParameterData.raw()[1][6]
  DoIteration.ActiveFromMonth = ParameterData.raw()[1][7]
  DoIteration.ActiveFromYear = ParameterData.raw()[1][8]
  DoIteration.FictionalDistinguishing = ParameterData.raw()[1][9]
  DoIteration.FictionalAdmin = ParameterData.raw()[1][10]

  let result = await DoIteration.AddPartyLib.AddFictitiousParty(DoIteration)
});

When('I search and navigate to the Fictitious Character party record details page', async () => { 
let result = await DoIteration.SearchForFictitiousPartyAndOpen() 
});

Then('The Fictitious Character party full name is displayed', async () => {
expect(DoIteration.NameAsEntered).toEqual(DoIteration.FictionalNameFromScreen) 
});
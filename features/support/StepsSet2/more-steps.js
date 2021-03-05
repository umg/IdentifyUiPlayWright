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




When('I search for the party created', async () => {
  let result = await DoIteration.SearchForParty()
  });

When('I select a party from the search results', async () => { 
  let result = await DoIteration.SelectPartyFromSearch()
});

Then('I create a new basket', async () => { 
  let result = await DoIteration.AddtoBasket(DoIteration)
});

Then('a new basket is created with the selected parties', async () => { 
  let result = await DoIteration.VerifyNewBasket(DoIteration)
      result = await DoIteration.CloseBaskets(DoIteration)
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


Then('I add the Variant Names ancillary', async () => {
  await DoIteration.ClickandAddVariantNames()
});
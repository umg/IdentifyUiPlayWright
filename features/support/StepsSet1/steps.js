let PWSIterationLib = require('../../../PWSIterationClass');
var dateFormat = require('dateformat');
var fs = require('fs');
const EventEmitter = require('events');
var jwt = require('jsonwebtoken')

const {
  Given,
  When,
  Then,
  BeforeAll,
  AfterAll,
  After,
  Before,
  setDefaultTimeout,
} = require("cucumber");

const { chromium } = require("playwright");
const expect = require("expect");

setDefaultTimeout(50 * 1000);


BeforeAll(async () => {
      
  this.ResultsName = "Result-" + dateFormat(this.now,"yyyy-mm-dd-HH-MM-ss")
  
  console.log("Overall Result Name: " + this.ResultsName)
  
  this.dir = "./results/" + this.ResultsName 
  
  if (!fs.existsSync(this.dir)){
      fs.mkdirSync(this.dir);
  }
  
  DoIteration = new PWSIterationLib.Iteration(this.ResultsName);

  DoIteration.ScenarioStatus = "NOT-COMPLETED"
});



AfterAll(() => {
   
  console.log("AfterAll called")
  if (DoIteration.NeedToClearBrowser == "True"){
    DoIteration.LogOutAndFinish()
  }
  
});

Before(() => {
   
  console.log("Before Scenario called")
  DoIteration.ScenarioStatus = "NOT-COMPLETED"
  console.log("Status is: " + DoIteration.ScenarioStatus)

});



After(() => {
  console.log("After Scenario called")
  console.log("Status is: " + DoIteration.ScenarioStatus)
  if (DoIteration.ScenarioStatus == 'NOT-COMPLETED'){

    this.now = new Date()

    this.send = dateFormat(this.now,"yyyy-mm-dd h-mm-ss")
              
    this.filedestination = DoIteration.userdir + "/" + this.send + "_" + "Screenshot" +  ".jpg"
  
    DoIteration.KeepPage.screenshot({ path: this.filedestination });

    DoIteration.NeedToClearBrowser = "True"


  }
  else{
    console.log(DoIteration.ScenarioStatus)
  }

});

//await DoIteration.LogOutAndFinish()
Given('I am logged in to PWS', async (ParameterData) => {
  if (DoIteration.NeedToClearBrowser == "True"){
    await DoIteration.LogOutAndFinish()
    DoIteration.NeedToClearBrowser = "False"
  }
  console.log(ParameterData.raw()[1][0])
  console.log(ParameterData.raw()[1][1])
  DoIteration.UserName = ParameterData.raw()[1][0]
  DoIteration.XPassword = ParameterData.raw()[1][1]
  var newdata = jwt.verify(DoIteration.XPassword, 'automation tests')
  DoIteration.Password = newdata.password

  await DoIteration.StartUpAndLogin()
});

When('I have navigated to the party workspace home page', async () =>  {
  let result = await DoIteration.NavigateToFrontPage() 
});

When('I add the person party record', async (ParameterData) =>  {
  
  DoIteration.PartyType = ParameterData.raw()[1][0]
  DoIteration.PersonPartyNameType = ParameterData.raw()[1][1]
  DoIteration.PersonFirstName = ParameterData.raw()[1][2]
  DoIteration.PersonLastName = ParameterData.raw()[1][3]
  DoIteration.PersonISNI = ParameterData.raw()[1][4]
  DoIteration.PersonIPN = ParameterData.raw()[1][5]
  DoIteration.PersonMusicBrainzId = ParameterData.raw()[1][6]
  DoIteration.PersonBirthDay = ParameterData.raw()[1][7]
  DoIteration.PersonBirthMonth = ParameterData.raw()[1][8]
  DoIteration.PersonBirthYear = ParameterData.raw()[1][9]
  DoIteration.PersonDistinguishingInfo = ParameterData.raw()[1][10]
  DoIteration.PersonAdminNotes = ParameterData.raw()[1][11]

  let result = await DoIteration.AddPartyLib.AddPersonParty(DoIteration)

});


When('I have navigated to the party workspace Search page', async () => { 
    let result = await DoIteration.NavigateToFrontPage()
});

When('I search and navigate to the first person party record details page', async () => { 
  let result = await DoIteration.SearchForPartyAndOpen()
 
});

Then('The person party full name is displayed', async () => {
  expect(DoIteration.NameAsEntered).toEqual(DoIteration.FullNameFromScreen) 
});

Then('I log out', async () => {
  await DoIteration.LogOutAndFinish()
  DoIteration.ScenarioStatus = 'COMPLETED'
});




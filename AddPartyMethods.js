const playwright = require('playwright');
const TheUid = require('uuid');
const { saveVideo } = require('playwright-video');
const { Pool, Client } = require("pg");
var dateFormat = require('dateformat');
var fs = require('fs');
var util = require('util');

class PartyAddLib{

    async AddPersonParty(IterationInstance){

        console.log("Inside AddPersonParty2")

        await IterationInstance.KeepPage.waitForSelector("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-2 > a",{"timeout":10000});

        await IterationInstance.KeepPage.click("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-2 > a",{"timeout":10000});


        IterationInstance.StartTransaction("PWSSelectCreateParty")

        await IterationInstance.KeepPage.waitForSelector( "#create-new-party > div > h1");

        IterationInstance.EndTransaction("PWSSelectCreateParty","Pass")

        await IterationInstance.KeepPage.selectOption("#partyTypeSelect",IterationInstance.PartyType);

        await IterationInstance.delay(1000);

        await IterationInstance.KeepPage.selectOption("#nameType",IterationInstance.PersonPartyNameType);

        if (IterationInstance.PersonPartyNameType == 'RealName')
            IterationInstance.EnteredPersonType = 'Real Name'

        await IterationInstance.KeepPage.fill('#firstName', IterationInstance.PersonFirstName);

        IterationInstance.SurnameEntered = IterationInstance.PersonLastName + TheUid.v4()

        await IterationInstance.KeepPage.fill('#lastName', IterationInstance.SurnameEntered);

        IterationInstance.NameAsEntered = IterationInstance.PersonFirstName + ' ' + IterationInstance.SurnameEntered + '(' + IterationInstance.EnteredPersonType + ')'

        IterationInstance.ZBirthDate = "";

        IterationInstance.ZBirthDate = String(IterationInstance.PersonBirthDay);

        await IterationInstance.KeepPage.fill('#DateOfBirth_day', IterationInstance.ZBirthDate);
 
        IterationInstance.ZBirthMonth = "";

        IterationInstance.ZBirthMonth = String(IterationInstance.PersonBirthMonth);

        await IterationInstance.KeepPage.selectOption('#DateOfBirth_month',IterationInstance.ZBirthMonth);
        
        IterationInstance.ZBirthYear = "";
        IterationInstance.ZBirthYear = String(IterationInstance.PersonBirthYear);
        await IterationInstance.KeepPage.fill('#DateOfBirth_year', IterationInstance.ZBirthYear);
        
        await IterationInstance.KeepPage.fill('#distinguishingInformation', IterationInstance.PersonDistinguishingInfo);
    
        await IterationInstance.KeepPage.fill('#notes', IterationInstance.PersonAdminNotes);

        await IterationInstance.KeepPage.click("#btnSubmit");

        IterationInstance.StartTransaction("PWSAddPerson")

        await IterationInstance.KeepPage.waitForSelector( "#party-view-page > div > div > div > div > section > div > div:nth-child(2) > div > button.btn.btn-primary.ml-1.btn-sm.btn.btn-primary",{"timeout":60000});

        IterationInstance.EndTransaction("PWSAddPerson","Pass")

        // Get Party Id
        IterationInstance.CreatedPartyID = await IterationInstance.KeepPage.$eval("#party-view-page > div > div > div > div > aside > div > div.cz-sidebar-body.small > div > div > ul:nth-child(3) > li > span", el => el.textContent.trim())
        
        IterationInstance.CreatedPartyID = IterationInstance.CreatedPartyID.replace(/\s+/g,"")
        
        console.log("CreatedPartyID is: " + IterationInstance.CreatedPartyID)


    }

    async AddDefaultPersonParty(IterationInstance)
    {
         // Click a[data-testid="searchbtnAddParty"]
  await IterationInstance.KeepPage.click('a[data-testid="searchbtnAddParty"]');
  // assert.equal(page.url(), 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace/create');

  // Select person
  await IterationInstance.KeepPage.selectOption('select[data-testid="partyTypeSelect"]', 'person');

  // Select Alias
  await IterationInstance.KeepPage.selectOption('select[data-testid="personNameTypeSelect"]', 'Alias');

  // Click input[data-testid="firstName"]
  await IterationInstance.KeepPage.click('input[data-testid="firstName"]');

  var personFirstName = TheUid.v4();

   // Fill input[data-testid="firstName"]
  await IterationInstance.KeepPage.fill('input[data-testid="firstName"]',personFirstName);

  // Click input[data-testid="lastName"]
  await IterationInstance.KeepPage.click('input[data-testid="lastName"]');

  // Fill input[data-testid="lastName"]
  await IterationInstance.KeepPage.fill('input[data-testid="lastName"]', 'test');

  // Click button[data-testid="btnSubmit"]
  await IterationInstance.KeepPage.click('button[data-testid="btnSubmit"]');
  
  await IterationInstance.delay(10000);



 var url = IterationInstance.KeepPage.url();
  console.log(url);
  var PartyID = url.slice(url.lastIndexOf('/') + 1);
  console.log(PartyID);
   
   console.log("CreatedPartyID is: " + PartyID)

  return [personFirstName, PartyID];
 
  }

    
    async AddGroupParty(IterationInstance){

        console.log("Inside AddGroup")


        await IterationInstance.KeepPage.waitForSelector("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-2 > a",{"timeout":10000});

        await IterationInstance.KeepPage.click("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-2 > a",{"timeout":10000});


        IterationInstance.StartTransaction("PWSSelectCreateParty")

        await IterationInstance.KeepPage.waitForSelector( "#create-new-party > div > h1");

        IterationInstance.EndTransaction("PWSSelectCreateParty","Pass")

        await IterationInstance.KeepPage.selectOption("#partyTypeSelect",IterationInstance.GroupPartyType);

        await IterationInstance.delay(1000);


        await IterationInstance.KeepPage.selectOption("#groupType",IterationInstance.GroupType);

        await IterationInstance.delay(1000);

        IterationInstance.NameAsEntered = IterationInstance.GroupName + TheUid.v4()

        await IterationInstance.KeepPage.fill('#groupName', IterationInstance.NameAsEntered);


        IterationInstance.ZFormedDay = ""

        IterationInstance.ZFormedDay = String(IterationInstance.GroupFormedDay)

        await IterationInstance.KeepPage.fill('#DateFormed_day', IterationInstance.ZFormedDay)

        IterationInstance.ZFormedMonth = ""

        IterationInstance.ZFormedMonth = String(IterationInstance.GroupFormedMonth)

        await IterationInstance.KeepPage.selectOption('#DateFormed_month',IterationInstance.ZFormedMonth)

        IterationInstance.ZFormedYear = ""

        IterationInstance.ZFormedYear = String(IterationInstance.GroupFormedYear)

        await IterationInstance.KeepPage.fill('#DateFormed_year', IterationInstance.ZFormedYear);

        await IterationInstance.KeepPage.fill('#distinguishingInformation', IterationInstance.GroupDistinguishingInfo);
  
  
        await IterationInstance.KeepPage.fill('#notes', IterationInstance.GroupAdminNotes);

        await IterationInstance.KeepPage.click("#btnSubmit");

        IterationInstance.StartTransaction("PWSAddGroup")

        await IterationInstance.KeepPage.waitForSelector( "#party-view-page > div > div > div > div > section > div > div:nth-child(2) > div > button.btn.btn-primary.ml-1.btn-sm.btn.btn-primary",{"timeout":60000});

        IterationInstance.EndTransaction("PWSAddGroup","Pass")

         // Get Party Id
         IterationInstance.CreatedPartyID = await IterationInstance.KeepPage.$eval("#party-view-page > div > div > div > div > aside > div > div.cz-sidebar-body.small > div > div > ul:nth-child(3) > li > span", el => el.textContent.trim())
        
         IterationInstance.CreatedPartyID = IterationInstance.CreatedPartyID.replace(/\s+/g,"")
         
         console.log("Group CreatedPartyID is: " + IterationInstance.CreatedPartyID)



    }

    async AddFictitiousParty(IterationInstance){

        console.log("Inside AddFictitiousParty")

        await IterationInstance.KeepPage.waitForSelector("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-2 > a",{"timeout":10000});
        
        await IterationInstance.KeepPage.click("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-2 > a",{"timeout":10000});
        IterationInstance.StartTransaction("PWSSelectCreateParty")
        
        await IterationInstance.KeepPage.waitForSelector( "#create-new-party > div > h1");
        IterationInstance.EndTransaction("PWSSelectCreateParty","Pass")
        
        await IterationInstance.KeepPage.selectOption("#partyTypeSelect",IterationInstance.FictionalType);
        await IterationInstance.delay(1000);
        IterationInstance.NameAsEntered = IterationInstance.FictionName + TheUid.v4()
        await IterationInstance.KeepPage.fill('#fictitiousCharacterName', IterationInstance.NameAsEntered);
        IterationInstance.ZActiveFromDay = ""
        IterationInstance.ZActiveFromDay = String(IterationInstance.ActiveFromDay)
        await IterationInstance.KeepPage.fill('#ActiveFrom_day', IterationInstance.ZActiveFromDay)
        IterationInstance.ZActiveFromMonth = ""
        IterationInstance.ZActiveFromMonth = String(IterationInstance.ActiveFromMonth)
        await IterationInstance.KeepPage.selectOption('#ActiveFrom_month',IterationInstance.ZActiveFromMonth)
        IterationInstance.ZActiveFromYear = ""
        IterationInstance.ZActiveFromYear = String(IterationInstance.ActiveFromYear)
        await IterationInstance.KeepPage.fill('#ActiveFrom_year', IterationInstance.ZActiveFromYear);
        await IterationInstance.KeepPage.fill('#distinguishingInformation', IterationInstance.GroupDistinguishingInfo);
        await IterationInstance.KeepPage.fill('#notes', IterationInstance.GroupAdminNotes);
        await IterationInstance.KeepPage.click("#btnSubmit");
        IterationInstance.StartTransaction("PWSAddFictitiousCharacter")
        await IterationInstance.KeepPage.waitForSelector( "#party-view-page > div > div > div > div > section > div > div:nth-child(2) > div > button.btn.btn-primary.ml-1.btn-sm.btn.btn-primary",{"timeout":60000});
        IterationInstance.EndTransaction("PWSAddFictitiousCharacter","Pass")

    // Get Party Id
    IterationInstance.CreatedPartyID = await IterationInstance.KeepPage.$eval("#party-view-page > div > div > div > div > aside > div > div.cz-sidebar-body.small > div > div > ul:nth-child(3) > li > span", el => el.textContent.trim())
    
    IterationInstance.CreatedPartyID = IterationInstance.CreatedPartyID.replace(/\s+/g,"")
    
    console.log("CreatedPartyID is: " + IterationInstance.CreatedPartyID)
}  



    
}
module.exports.PartyAddLib = PartyAddLib;
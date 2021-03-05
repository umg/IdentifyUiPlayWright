const playwright = require('playwright');
const TheUid = require('uuid');
const { saveVideo } = require('playwright-video');
const { Pool, Client } = require("pg");
var dateFormat = require('dateformat');
var fs = require('fs');
var util = require('util');

class AssociationAddLib{

async CreateGuid() {  
  function _p8(s) {  
     var p = (Math.random().toString(16)+"000000000").substr(2,8);  
     return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
  }  
  return _p8() + _p8(true) + _p8(true) + _p8();  
}  

async delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

async AddAssosiation(IterationInstance) {
 

   // assert.equal(page.url(), 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace/party/101356220');
  // Click //a[normalize-space(.)='Associations (0)' and normalize-space(@role)='button']/span/i
  await IterationInstance.KeepPage.click('//a[normalize-space(.)=\'Associations (0)\' and normalize-space(@role)=\'button\']/span/i');

  // Click button[data-testid="associationaddButton"]
  await  IterationInstance.KeepPage.click('button[data-testid="associationaddButton"]');

  // Select IsAnotherNameFor
  await  IterationInstance.KeepPage.selectOption('select[data-testid="type"]', 'IsAnotherNameFor');

  // Click input[data-testid="searchInput"]
  await  IterationInstance.KeepPage.click('input[data-testid="searchInput"]');

  await IterationInstance.delay(4000);

  // Fill input[data-testid="searchInput"]
  await  IterationInstance.KeepPage.fill('input[data-testid="searchInput"]', `${IterationInstance.SecondPersonPartyId}`);

  // Click button[data-testid="btnSelect101356221"]
  await  IterationInstance.KeepPage.click(`button[data-testid="btnSelect${IterationInstance.SecondPersonPartyId}"]`);

  // Click button[data-testid="saveButton"]
  await  IterationInstance.KeepPage.click('button[data-testid="saveButton"]');

 
 

};

async AssosiationDisplayed(IterationInstance)
{
  await  IterationInstance.KeepPage.click('//a[normalize-space(.)=\'Associations (1)\' and normalize-space(@role)=\'button\']/span');
  var displayed = await IterationInstance.KeepPage.$("text='Is Another Name for'");
 
  return displayed;
}

}
module.exports.AssociationAddLib = AssociationAddLib;
let PartyAddLibrary = require('./AddPartyMethods');

const playwright = require('playwright');
const TheUid = require('uuid');
const { saveVideo } = require('playwright-video');
var now = require('performance-now');
const xlsxFile = require('read-excel-file/node');
const { Pool, Client } = require("pg");
var dateFormat = require('dateformat');
var fs = require('fs');
var util = require('util');


class Iteration {

    constructor(ResultIdentifier){

        this.AddPartyLib = new PartyAddLibrary.PartyAddLib(this)

        this.ResultsName = ResultIdentifier

        this.CreateUserSubFolder()

        this.IntitialiseLogging()
                
        this.Environment = "QA"
        //this.Environment = "TEST"
        //this.Environment = "STAGE"
        
        this.TransactionDelay = 10 * 1000    

        this.WriteLog(this.ResultsName)


        this.UserName = ''
        this.Password = ''    
        this.PartyType = ''
        this.PersonPartyNameType = ''
        this.PersonFirstName  = ''
        this.PersonLastName  = ''
        this.PersonISNI  = ''
        this.PersonIPN  = ''
        this.PersonMusicBrainzId  = ''
        this.PersonBirthDay  = ''
        this.PersonBirthMonth  = ''
        this.PersonBirthYear  = ''
        this.PersonDistinguishingInfo  = ''
        this.PersonAdminNotes  = ''

        this.GroupPartyType = ''
        this.GroupType = ''
        this.GroupName = ''
        this.GroupISNI = ''
        this.GroupIPI = ''
        this.GroupIPN = ''
        this.GroupMusicBrainzId = ''
        this.GroupFormedDay = ''
        this.GroupFormedMonth = ''
        this.GroupFormedYear = ''
        this.GroupDistinguishingInfo = ''
        this.GroupAdminNotes = ''
       
        this.FictionalType  = ''
        this.FictionName  = ''
        this.FictionalISNI  = ''	
        this.FictionalIPI  = ''	
        this.FictionalIPN  = ''	
        this.FictionalMusicBrainz  = ''	
        this.ActiveFromDay  = ''	
        this.ActiveFromMonth  = ''	
        this.ActiveFromYear  = ''	
        this.FictionalDistinguishing  = ''	
        this.FictionalAdmin  = ''      

    }

    IntitialiseLogging()
    {
        this.log_file = fs.createWriteStream(this.userdir + '/user.log', {flags : 'a'});    
    }

    WriteLog(d)
    {
        console.log(d)
        this.log_file.write(d + '\r\n');
    
    };

    CreateUserSubFolder()
    {
        this.userdir = "./results/" + this.ResultsName + "/" + "RESULTS"
     
        if (!fs.existsSync(this.userdir)){
            fs.mkdirSync(this.userdir);
        }

    }


    delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }



    StartTransaction(NameOfTransaction){
         
        this.TransactionName = NameOfTransaction
        this.TransactionDateTime = new Date()
        this.TransactionStartTime = now()
        this.WriteLog("Starting transaction: " + NameOfTransaction)
    }

    EndTransaction(NameOfTransaction, StatusOfTransaction){

        this.TransactionEndTime = now()
        if (StatusOfTransaction == 'Pass'){
            this.TransactionStatus = 'Pass'
        }
        else
        {
            this.TransactionStatus = 'Fail'
        }
        this.WriteLog("Ending transaction : " + this.TransactionName)
        this.TransactionTime = (this.TransactionEndTime - this.TransactionStartTime) / 1000; 
        this.TransactionTime = this.TransactionTime.toFixed(4)
        this.TransactionStatus = "None"  
    }


    async StartUp(){
   
   //Chromium     
   const browser = await playwright.chromium.launch({headless:false, slowMo: 250, args: ['--start-fullscreen']});
    //const browser = await playwright.chromium.launch({headless:true, slowMo: 250, args: ['--start-fullscreen']});
 
 
        this.KeepBrowser = browser;
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1366, height: 768});
        this.KeepPage = page;
        await this.delay(4000);
        

    }

    async StartUpAndLogin(){
        await this.StartUp()
        await this.Login()
    }


    async Login(){

        this.WriteLog("Login method executing for user number: " + this.UserName)

        if (this.Environment == "QA"){
            await this.KeepPage.goto( "https://party-qa.gr4o-nonprod.umusic.net/party-workspace", {"timeout":180000,"waitUntil":"domcontentloaded"} );
        }
        else if (this.Environment == "TEST"){        
            await this.KeepPage.goto( "https://party-test.gr4o-nonprod.umusic.net/party-workspace", {"timeout":180000,"waitUntil":"domcontentloaded"} );
        }
        else if (this.Environment == "STAGE"){
            await this.KeepPage.goto( "https://party-stage.gr4o.umusic.net/party-workspace", {"timeout":180000,"waitUntil":"domcontentloaded"} );
        }
        this.StartTransaction("StartOkta")

        await this.KeepPage.waitForSelector( "#okta-signin-username",{"timeout":60000});

        this.EndTransaction("StartOkta", "Pass")

        await this.KeepPage.focus('#okta-signin-username');
  
        await this.KeepPage.keyboard.type(this.UserName);
        
        this.WriteLog("Logging in with User: " + this.UserName)

        await this.KeepPage.focus("#okta-signin-password");
  
        await this.KeepPage.keyboard.type(this.Password);
  
        await this.KeepPage.click("#okta-signin-submit");

        this.StartTransaction("PWSLogin");

        await this.KeepPage.waitForSelector("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-3 > div > div.cz-sidebar-body > div > div > div:nth-child(1) > h3",{"timeout":60000});

        this.EndTransaction("PWSLogin", "Pass");

        await this.delay(2000);
     
    }

    getRandomString(length) {

        var randomChars = 'joe-dave-harry-pete-mark-arn';
                
        var result = '';
        for ( var i = 0; i < length; i++ ) {

            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    getRandomName(){
        var result = ''
        let thelist = ['joe', 'dave', 'harry', 'pete', 'mark', 'arn']
        let numbernames = thelist.length
        let chosen_number = Math.floor(Math.random() * numbernames) + 1
        result = thelist[chosen_number - 1]
        return result
    }

    async DoSearch(){

        this.SearchTerm = this.getRandomName()

        this.WriteLog("Search Term is: " + this.SearchTerm)

        
        await this.delay(3000)
        await this.KeepPage.waitForSelector( "#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > input",{"timeout":5000});
        await this.KeepPage.fill('#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > input', this.SearchTerm);

        await this.KeepPage.click("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > div > span > i")
        this.StartTransaction("PartySearch")
        
       try{
            await this.KeepPage.waitForSelector("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div:nth-child(2) > div > div > div:nth-child(1) > div",{"timeout":10000})
            this.EndTransaction("PartySearch","Pass")
            this.WriteLog("Transaction: PartySearch" + " completed OK - " + "Search Term: " + this.SearchTerm)
       }
       catch(error){
            this.WriteLog("Transaction: PartySearch" + " returned no results - " + "Search Term: " + this.SearchTerm)
            this.EndTransaction("PartySearch","Fail")

        }

        await this.delay(10000)
   
    }


    async SearchForPartyAndOpen(){
    
        this.SearchTerm = this.CreatedPartyID

        this.WriteLog("Search Term is: " + this.SearchTerm)

    
        await this.delay(3000)
        await this.KeepPage.waitForSelector( "#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > input",{"timeout":5000});
        await this.KeepPage.fill('#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > input', this.SearchTerm);

        await this.KeepPage.click("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > div > span > i")
        
       try{
            await this.KeepPage.waitForSelector("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div:nth-child(2) > div > div > div:nth-child(1) > div",{"timeout":20000})
            this.WriteLog("SearchForParty" + " completed OK - " + "Search Term: " + this.SearchTerm)
       }
       catch(error){
            this.WriteLog("SearchForParty" + " returned no results - " + "Search Term: " + this.SearchTerm)
       }

       this.delay(2000)
       result = await this.OpenSearchedForParty()
       result = await this.delay(2000)

       this.FullNameFromScreen = await this.KeepPage.$eval("#party-view-page > div > div > div > div > section > div > div:nth-child(3) > div > div > div.p-0.m-0.col-sm-11 > div > h4", el => el.textContent.trim())


       console.log(this.FullNameFromScreen)

    }

    async SearchForGroupPartyAndOpen(){
    
        this.SearchTerm = this.CreatedPartyID

        this.WriteLog("Search Term is: " + this.SearchTerm)

    
        await this.delay(3000)
        await this.KeepPage.waitForSelector( "#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > input",{"timeout":5000});
        await this.KeepPage.fill('#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > input', this.SearchTerm);

        await this.KeepPage.click("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > div > span > i")
        
       try{
            await this.KeepPage.waitForSelector("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div:nth-child(2) > div > div > div:nth-child(1) > div",{"timeout":20000})
            this.WriteLog("SearchForParty" + " completed OK - " + "Search Term: " + this.SearchTerm)
       }
       catch(error){
            this.WriteLog("SearchForParty" + " returned no results - " + "Search Term: " + this.SearchTerm)
       }

       this.delay(2000)
       result = await this.OpenSearchedForParty()
       result = await this.delay(2000)

       this.GroupNameFromScreen = await this.KeepPage.$eval("#party-view-page > div > div > div > div > section > div > div:nth-child(3) > div > div > div.p-0.m-0.col-sm-11 > div > h4", el => el.textContent.trim())

       console.log(this.GroupNameFromScreen)

    }

    async SearchForFictitiousPartyAndOpen(){
    
        this.SearchTerm = this.CreatedPartyID

        this.WriteLog("Search Term is: " + this.SearchTerm)

    
        await this.delay(3000)
        await this.KeepPage.waitForSelector( "#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > input",{"timeout":5000});
        await this.KeepPage.fill('#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > input', this.SearchTerm);

        await this.KeepPage.click("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div.pb-4.pb-sm-5.row > div.col-sm-10 > div > div:nth-child(1) > div > div > div > span > i")
        
       try{
            await this.KeepPage.waitForSelector("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-9 > div:nth-child(2) > div > div > div:nth-child(1) > div",{"timeout":20000})
            this.WriteLog("SearchForParty" + " completed OK - " + "Search Term: " + this.SearchTerm)
       }
       catch(error){
            this.WriteLog("SearchForParty" + " returned no results - " + "Search Term: " + this.SearchTerm)
       }

       this.delay(2000)
       result = await this.OpenSearchedForParty()
       result = await this.delay(2000)

       this.FictionalNameFromScreen = await this.KeepPage.$eval("#party-view-page > div > div > div > div > section > div > div:nth-child(3) > div > div > div.p-0.m-0.col-sm-11 > div > h4", el => el.textContent.trim())

       console.log(this.FictionalNameFromScreen)

    }

    async OpenSearchedForParty(){

        this.SelectorID = '#searchResultContainer_' + this.CreatedPartyID + ' > div:nth-child(1) > div.pl-1.col > div:nth-child(1) > div.col-8 > span > a > span'

        await this.KeepPage.click(this.SelectorID)
    }

    async VerifyAncillaryRecord(){
                
        await this.delay(3000)
        await this.KeepPage.waitForSelector('#headingDate > h3 > a > span')
        await this.KeepPage.click('#headingDate > h3 > a > span')

        await this.KeepPage.waitForSelector('#date > div:nth-child(2) > div > div > table > tbody > tr > td.tbl-col.tbl-col-buttons > button.btn.btn-none.btn-sm > svg')
        await this.KeepPage.click('#date > div:nth-child(2) > div > div > table > tbody > tr > td.tbl-col.tbl-col-buttons > button.btn.btn-none.btn-sm > svg')

        await this.KeepPage.waitForSelector('#notes')
        this.AdminNotes = "TEST";
        await this.KeepPage.fill('#notes', this.AdminNotes)

        await this.KeepPage.waitForSelector('#lock')
        await this.KeepPage.click('#lock')

        await this.KeepPage.waitForSelector('#dateModal > div > div.p-1.modal-footer > button.btn.btn-primary')
        await this.KeepPage.click('#dateModal > div > div.p-1.modal-footer > button.btn.btn-primary')
    }
    
    async AncillaryRecordIsVerified() {

        try{
            await this.KeepPage.waitForSelector("#date > div:nth-child(2) > div > div > table > tbody > tr > td.tbl-col.tbl-col-verified > span > svg > path")
       }
        catch(error){
            this.WriteLog("Ancillary Record not Verified")
       }

    }    

    async LogOutAndFinish(){
        await this.LogOut()
        await this.Finish()
    }

    async LogOut(){
        
        await this.KeepPage.waitForSelector("#root > header > nav > div > div > ul.navbar-nav.navbar-right > li > a");

        await this.delay(1000);
  
        await this.KeepPage.click("#root > header > nav > div > div > ul.navbar-nav.navbar-right > li > a");
  
        this.StartTransaction("PWSLogOut")

        this.WriteLog("Selected logout ..");
    
        await this.KeepPage.waitForSelector("#root > div > p",{"timeout":60000});

        this.EndTransaction("PWSLogOut","Pass")

        this.WriteLog("Logged out ...");
  
        await this.delay(2000);
  
        await this.KeepBrowser.close();

        await this.delay(2000);

        
    }

    async Finish(){
        await this.KeepBrowser.close();
    }


    async NavigateToFrontPage(){
       
        await this.KeepPage.waitForSelector("#root > header > nav > div > a > img");

        await this.delay(5000)

        await this.KeepPage.click("#root > header > nav > div > a > img");

        this.StartTransaction("NavigateToHomePage")

        await this.KeepPage.waitForSelector("#root > div.pb-5.mb-2.mb-md-4.container > div.row > aside.col-lg-3 > div > div.cz-sidebar-body > div > div > div:nth-child(1) > h3");

        this.EndTransaction("NavigateToHomePage", "Pass")

        await this.delay(3000)

    }

}
module.exports.Iteration = Iteration;
const { chromium } = require('playwright');

function CreateGuid() {  
  function _p8(s) {  
     var p = (Math.random().toString(16)+"000000000").substr(2,8);  
     return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
  }  
  return _p8() + _p8(true) + _p8(true) + _p8();  
}  

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://party-qa.gr4o-nonprod.umusic.net/party-workspace
  await page.goto('https://party-qa.gr4o-nonprod.umusic.net/party-workspace');

  // Go to https://umusic-dev.oktapreview.com/oauth2/ausne49kx1HIUS6iz0h7/v1/authorize?client_id=0oaswba6uxHGGBetc0h7&code_challenge=mmQ-9S2aLR-dlcYylLSE52drs80laT_KMzUKREPOvuM&code_challenge_method=S256&nonce=FhGHPvZ5Fb3KkX0CT7WCtF03CAEGJjLWDuOLpyVFBaZIxJwDeMMhcoycQEYt5OHv&redirect_uri=https://party-qa.gr4o-nonprod.umusic.net/party-workspace/implicit/callback&response_type=code&state=N3z9ICIYO0p0avq6zXXpTEI6LkULJKarRXNZPoxbyPtrQMu9yRMVHvrVyMeqW9KZ&scope=openid profile party
 // await page.goto('https://umusic-dev.oktapreview.com/oauth2/ausne49kx1HIUS6iz0h7/v1/authorize?client_id=0oaswba6uxHGGBetc0h7&code_challenge=mmQ-9S2aLR-dlcYylLSE52drs80laT_KMzUKREPOvuM&code_challenge_method=S256&nonce=FhGHPvZ5Fb3KkX0CT7WCtF03CAEGJjLWDuOLpyVFBaZIxJwDeMMhcoycQEYt5OHv&redirect_uri=https://party-qa.gr4o-nonprod.umusic.net/party-workspace/implicit/callback&response_type=code&state=N3z9ICIYO0p0avq6zXXpTEI6LkULJKarRXNZPoxbyPtrQMu9yRMVHvrVyMeqW9KZ&scope=openid profile party');

  // Click input[aria-label=""]
  await page.click('input[aria-label=""]');

  // Fill input[aria-label=""]
  await page.fill('input[aria-label=""]', 'mandeep.singhbrar@umusic.com');

  // Press Tab
  await page.press('input[aria-label=""]', 'Tab');

  // Fill //input[normalize-space(@type)='password' and normalize-space(@name)='password']
  await page.fill('//input[normalize-space(@type)=\'password\' and normalize-space(@name)=\'password\']', 'Dimtrink@9');

  // Click input[type="submit"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace' }*/),
    page.click('input[type="submit"]')
  ]);

  // Click a[data-testid="searchbtnAddParty"]
  await page.click('a[data-testid="searchbtnAddParty"]');
  // assert.equal(page.url(), 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace/create');

  // Select person
  await page.selectOption('select[data-testid="partyTypeSelect"]', 'person');

  // Select Alias
  await page.selectOption('select[data-testid="personNameTypeSelect"]', 'Alias');

  // Click input[data-testid="firstName"]
  await page.click('input[data-testid="firstName"]');

  var firstPersonName = CreateGuid();
  // Fill input[data-testid="firstName"]
  await page.fill('input[data-testid="firstName"]',firstPersonName);

  // Click input[data-testid="lastName"]
  await page.click('input[data-testid="lastName"]');

  // Fill input[data-testid="lastName"]
  await page.fill('input[data-testid="lastName"]', 'test');

  // Click button[data-testid="btnSubmit"]
  await page.click('button[data-testid="btnSubmit"]');

  // Go to https://party-qa.gr4o-nonprod.umusic.net/party-workspace/party/101356220
  //await page.goto('https://party-qa.gr4o-nonprod.umusic.net/party-workspace/party/101356220');

  // Click text="Search"
  await page.click('text="Search"');
  // assert.equal(page.url(), 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace/search');

  // Click a[data-testid="searchbtnAddParty"]
  await page.click('a[data-testid="searchbtnAddParty"]');
  // assert.equal(page.url(), 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace/create');

  // Select person
  await page.selectOption('select[data-testid="partyTypeSelect"]', 'person');

  // Select RealName
  await page.selectOption('select[data-testid="personNameTypeSelect"]', 'RealName');

  // Click input[data-testid="firstName"]
  await page.click('input[data-testid="firstName"]');

  var secondPersonName = CreateGuid();
  // Fill input[data-testid="firstName"]
  await page.fill('input[data-testid="firstName"]',secondPersonName );

  // Press Tab
  await page.press('input[data-testid="firstName"]', 'Tab');

  // Fill input[data-testid="lastName"]
  await page.fill('input[data-testid="lastName"]', 'test');

  // Click button[data-testid="btnSubmit"]
  await page.click('button[data-testid="btnSubmit"]');

  await delay(5000);
  var url= page.url();
  console.log(url);
  var secondpartyid=url.slice(url.lastIndexOf('/') + 1);
  console.log(secondpartyid);

  // Click text="Search"
  await page.click('text="Search"');
  // assert.equal(page.url(), 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace/search');

  // Click input[data-testid="searchInput"]
  await page.click('input[data-testid="searchInput"]');

  await delay(4000);

  // Fill input[data-testid="searchInput"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace/search?query=personone' }*/),
    page.fill('input[data-testid="searchInput"]', firstPersonName)
  ]);

  // Click text="personone test"
  await page.click(`text="${firstPersonName} test"`);
  // assert.equal(page.url(), 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace/party/101356220');

  // Click //a[normalize-space(.)='Associations (0)' and normalize-space(@role)='button']/span/i
  await page.click('//a[normalize-space(.)=\'Associations (0)\' and normalize-space(@role)=\'button\']/span/i');

  // Click button[data-testid="associationaddButton"]
  await page.click('button[data-testid="associationaddButton"]');

  // Select IsAnotherNameFor
  await page.selectOption('select[data-testid="type"]', 'IsAnotherNameFor');

  // Click input[data-testid="searchInput"]
  await page.click('input[data-testid="searchInput"]');

  await delay(4000);

  // Fill input[data-testid="searchInput"]
  await page.fill('input[data-testid="searchInput"]', `${secondPersonName}`);

  // Click button[data-testid="btnSelect101356221"]
  await page.click(`button[data-testid="btnSelect${secondpartyid}"]`);

  // Click button[data-testid="saveButton"]
  await page.click('button[data-testid="saveButton"]');

  // Click text="Search"
  await page.click('text="Search"');
  // assert.equal(page.url(), 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace/search');

  // Click input[data-testid="searchInput"]
  await page.click('input[data-testid="searchInput"]');

  await delay(4000);

  // Fill input[data-testid="searchInput"]
 
  page.fill('input[data-testid="searchInput"]', `${firstPersonName}`);
 

  // Click text="personone test"
  await page.click(`text="${firstPersonName} test"`);
  // assert.equal(page.url(), 'https://party-qa.gr4o-nonprod.umusic.net/party-workspace/party/101356220');

  // Click //a[normalize-space(.)='Associations (1)' and normalize-space(@role)='button']/span
  await page.click('//a[normalize-space(.)=\'Associations (1)\' and normalize-space(@role)=\'button\']/span');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();
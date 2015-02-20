'use strict';
describe('tests for Facility_Smoke', function() {
    var locator = require('../settings/uniqueLocator.js');
    var loginPage = require('../pages/loginPage.js');
    var billingPage = require('../pages/billingPage.js');
    var settings = require('../settings/settings.js');
    var params = browser.params;

    beforeEach(function() {
       browser.ignoreSynchronization = true;
    });

    it('should be random Facility selected',function() {
        browser.manage().deleteAllCookies();
        browser.sleep(2000)
            .then(function(){
                browser.get(params.mainUrls.userUrl);
                browser.sleep(5000);
            });
        var arrayOf = [];
        browser.controlFlow().execute(function(){
            loginPage.loginToIBHS(params.login.user, params.login.password);
            browser.sleep(2000)
                .then(function(){
                    billingPage.selectRandomItemFromDropdown(billingPage.buttonForSelectionFacility);
                    browser.sleep(1000)
                    .then(function(){
                        var value = billingPage.buttonForSelectionFacility.getAttribute('title')
                            .then(function(text){
                                arrayOf.push(text);
                                console.log('random selected facility is : => ' + text)
                            })
                    })

                });
            browser.controlFlow().execute(function(){
                locator.buttonOK.click();
                browser.sleep(1000);
                expect(locator.linkThatDeterminateFacility.getText()).toEqual(arrayOf.toString());
            })
        })
    });


});
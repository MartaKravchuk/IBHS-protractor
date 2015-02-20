/**
 * Created by marta on 12.02.15.
 */

describe('tests for Claim Search Page', function() {
    var locator = require('../settings/uniqueLocator.js');
    var settings = require('../settings/settings.js');
    var loginPage = require('../pages/loginPage.js');
    var billingPage = require('../pages/billingPage.js');
    var claimSearchPage = require('../pages/claimSearchPage.js');
//Functions :
    var text = require('../functions/generalForText.js');
    var table = require('../functions/generalForTablesOnEachPage.js');
    var params = browser.params;

    beforeEach(function() {
        browser.ignoreSynchronization = true;
    });

    it('Should Be' + ' ' + params.facility.constantFacility + ' ' + 'Selected', function() {
        browser.manage().deleteAllCookies();
        browser.sleep(2000);
        browser.controlFlow().execute(function(){
            browser.get(params.mainUrls.userUrl);
            browser.sleep(5000);
        }).then(function(){
            loginPage.loginToIBHS(params.login.user, params.login.password);
            browser.sleep(2000);
        }).then(function(){
            billingPage.buttonForSelectionFacility.click();
            browser.sleep(500)
                .then(function(){
                    text.inputText(locator.searchFieldForListContainer, params.facility.constantFacility);
                    browser.sleep(500)
                        .then(function(){
                            table.selectItemFromDropDown(params.facility.constantFacility);
                            browser.sleep(500)
                                .then(function(){
                                    locator.buttonOK.click();
                                    browser.sleep(1000);
                                })
                        })
                })
        })
            .then(function() {expect(locator.linkThatDeterminateFacility.getText()).toEqual(params.facility.constantFacility);
        });
    });

    it('Should Be Claim Page Selected', function(){
        browser.actions().mouseMove(claimSearchPage.linkClaimSearch).click().perform();
        claimSearchPage.linkClaimSearch.click();
        browser.sleep(5000);

        expect(browser.getTitle()).toContain('Billing - Claims');
    });

    it('Verify If User Can Search Claim Via Patient Name Field - 1', function() {
        table.searchTableRecordViaInputField(table.nameSearchField, settings.patientName);
        browser.sleep(1000)
            .then(function(){
                table.cleanArray();
                browser.sleep(1000);
            })
        browser.controlFlow().execute(function(){
            table.addResultsToArrayWithText(table.cellsOfTable)
            browser.sleep(1000)
                .then(function(){
                    var result = table.isArrayContains(settings.patientName);
                    expect(result == true);
                    console.log('The User can search the claim');
                })
        })
    });

    it('Verify If User Can See The Result Of Search Claim - 2',function(){
        table.cleanArray();
        browser.sleep(1000)
        browser.controlFlow().execute(function(){
            table.addResultsToArray(table.rowsOfTable);
            browser.sleep(1000)
                .then(function(){
                    var result = table.printResults();
                    browser.sleep(1000);
                    expect(result > 0);
                    if(true) console.log('The User can see ' + result + ' results of search Claim : ' + settings.patientName);
                })
        })
    });

    it('Verify If User Can Reset The Found Claim - 3', function(){
        table.resetTableRecord();
        browser.sleep(1000);

        expect(table.nameSearchField.value == '');
        if(true) console.log('The User can reset the claim');
    });

    it('Verify If User Can Browse Claim List - 4', function(){
        table.scrollingToPointOfDestination(table.buttonNextOfPagination);
        browser.sleep(1000)
            .then (function(){
            table.pagination();
            browser.sleep(1000);
        })
            .then(function(){
                table.cleanArray();
                browser.sleep(1000);
            })
        browser.controlFlow().execute(function(){
            table.addResultsToArray(table.rowsOfTable);
            browser.sleep(1000)
                .then (function(){
                var result = table.printResults();
                browser.sleep(1000);
                expect(result > 0);
                if(true) console.log('The User can see : ' + result + ' results after pagination');
            })
        })
     });

    it('Verify If User Can See Claims Details From Random Table Record - 5', function(){
        table.rowsOfTable.then(function (tableRow){
            var randomItem = Math.floor((Math.random() * tableRow.length));
            browser.actions().mouseMove(tableRow[randomItem]).click().perform()
            tableRow[randomItem].click();
            browser.sleep(3000);
        })
            .then(function(){
                table.scrollingToPointOfDestination(table.notePannel);
                browser.sleep(2000)
                    .then(function(){
                        var claimPanelDetails = ['Services','Facility','Billing Provider','Patient Information','Insurance Plan','Notes'];
                       // var claimPanelDetails = ['Notes','Insurance Plan','Patient Information','Billing Provider','Facility','Services'];
                        for (var i = claimPanelDetails.length - 1; i >=0; --i) {
                            expect(table.defaultClosedPannelDatails.get(i).getText()).toEqual(claimPanelDetails[i]);
                            table.defaultClosedPannelDatails.get(i).click();
                            browser.sleep(1000);
                        }
                    })
            })
            .then(function(){
                table.cleanArray();
                browser.sleep(1000);
            })
        browser.controlFlow().execute(function(){
            table.addResultsToArrayWithText(table.recordsClaimDetails)
            browser.sleep(1000)
                .then(function(){
                    var result = table.printResultsWithText();
                    expect(result > 0);
                    if(true) console.log('The User can see ' + result + ' details from random selected table record');
                })
        })
    });

    it('Verify If User Can Add Note To Claim - 6', function(){
        table.scrollingToPointOfDestination(table.editButton);
        browser.sleep(1000)
            .then(function(){
                table.addClaimButton.click();
                browser.sleep(2000)
                    .then(function(){
                        table.templateButton.click();
                        browser.sleep(500)
                            .then(function(){
                                text.inputText(locator.searchFieldForListContainer, settings.template);
                                browser.sleep(500)
                                    .then(function(){
                                        table.selectItemFromDropDown(settings.template);
                                        browser.sleep(500)
                                            .then(function(){
                                                text.inputText(table.freeFormText, /*table.getRandomString(10)*/ settings.comment);
                                                browser.sleep(500)
                                                    .then(function(){
                                                        locator.buttonOk.click();
                                                        browser.sleep(5000);
                                                    })
                                            })
                                    })
                            })
                    })
            })
            .then(function(){
                    table.scrollingToPointOfDestination(table.notePannel);
                    browser.sleep(1000)
                        .then(function(){
                            expect(table.commentNameInNotesDetails.getText()).toEqual(settings.comment);
                        })
                        /*.then(function(){
                            table.cleanArray();
                            browser.sleep(1000);
                        })*/
            })
       /* browser.controlFlow().execute(function(){
            table.addResultsToArrayWithText(table.commentNameInNotesDetails)
            browser.sleep(1000)
                .then(function(){
                    var result = table.isArrayContains(settings.comment); //table.commentNameInNotesDetails.getText() --> not work
                    expect(result == true);
                    console.log('The User can add note to claim');
                })
        })*/
    });

    it('verify If User Can See Confirmation PopUp When Deletes Note From Claim - 7',function(){
        browser.actions().mouseMove(table.commentNameInNotesDetails).perform();
        browser.sleep(2000)
        browser.controlFlow().execute(function(){
            browser.actions().mouseMove(table.deleteNoteButton).click().perform();
            browser.sleep(2000)
                .then(function(){
                    var actualConfirmationPopUpOnDeletion = 'Are you sure you want to delete';
                    expect(table.confirmationAboutDeletion.getText()).toEqual(actualConfirmationPopUpOnDeletion + ' ' + settings.template + ' ' + '?');
                    browser.sleep(1000)
                })
        })
    });

    it('verify If User Can See Successful Message When Note From Patient Is Deleted - 8', function(){
        locator.buttonYes.click();
        browser.sleep(2000)
            .then(function(){
                var actualSuccessfulMessage = 'was successfully deleted';
                expect(table.messageAboutSuccessfulDeletion.getText()).toEqual('Note' + ' ' + actualSuccessfulMessage);
                browser.sleep(1000)
            })
    });

    it('verify If User Can Delete Note From Patient - 9', function(){
        locator.buttonOk.click();
        browser.sleep(2000)
            .then(function(){
                var actualMessageAboutAbsenceNoteInNotesDetails = 'There are no notes yet on this claim';
                expect(table.messageAboutAbsenceNoteInNotesDetails.getText()).toEqual(actualMessageAboutAbsenceNoteInNotesDetails);
                browser.sleep(1000)
            })
    });


});





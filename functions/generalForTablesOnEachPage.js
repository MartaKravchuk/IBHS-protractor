/**
 * Created by marta on 13.02.15.
 */

var Table = function() {
    var array = [];
    var generalForText = require('../functions/generalForText.js');
    var locator = require('../settings/uniqueLocator.js');

    this.nameSearchField = element(by.xpath('//form[@ng-submit="search()"]//input[contains(@ng-model,"Name") or contains(@ng-model,"name")]'));
    this.searchButton = element(by.xpath('//button[@type="submit" and contains(text(), "Search")]'));
    this.resetButton = element(by.xpath('//button[contains(@ng-click,"reset") and contains(text(),"Reset")]'));

//pagination :
    this.buttonNextOfPagination = element(by.xpath('//ul[@class="pagination ng-table-pagination"]//a[@ng-switch-when="next"]'));
    this.rowsOfTable = element.all(by.xpath('//table//tbody[@class="table-wrap"]/tr'));
    this.cellsOfTable = element.all(by.xpath('//table//tbody[@class="table-wrap"]//td'));
    //this.listOfPageNumbers = element.all(by.xpath('//ul[@class="pagination ng-table-pagination"]//li[contains(@class, "ng-scope")]//span[contains(@ng-bind,"page.number")]'));

    //this.searchButton = element(by.xpath('//button[@type="submit" and contains(text(), "Search")]'));
    //this.nameSearchField = element(by.xpath('//form[@ng-submit="search()"]//input[contains(@ng-model,"Name") or contains(@ng-model,"name")]'));
    //this.resetButton = element(by.xpath('//button[contains(@ng-click,"reset") and contains(text(),"Reset")]'));
    this.notePannel = element(by.xpath('//div[@class="panel-group"]/div[contains(@class,"note panel")]'));
    this.defaultClosedPannelDatails = element.all(by.xpath('//div[contains(@class,"panel panel-default ng-isolate-scope") and not(contains(@class,"ng-hide")) and contains(@ng-init, "false")]//div[@class="panel-heading"]//a'));
    this.recordsClaimDetails = element.all(by.xpath('//div[@class="panel-collapse collapse in"]//div[@class="panel-body"]//div[1]/../../div//div[@class="col-md-12 ng-binding"]'));
    this.recordPatientsDetails = element.all(by.xpath('//div[contains(@class,"panel-collapse collapse in")]//div[contains(@class, "ng-scope")]/div[1]/../../div//div[contains(@class,"ng-binding")]'));

    this.addClaimButton = element(by.xpath('//a[@class="add-note pull-right"]'));
    this.editButton = element(by.xpath('//a[contains(text(), "Edit") and not(contains(@disabled, "disabled"))]'));

//For --> Add Note :
    this.templateButton = element(by.xpath('//div[contains(@style,"display")]//div[@class="modal-dialog"]//button[@data-id="templates"]'));
    this.freeFormText = element(by.xpath('//div[contains(@style,"display")]//div[@class="modal-dialog"]//textarea[contains(@ng-model, "NoteText")]'));
    this.commentNameInNotesDetails = element(by.xpath('//div[contains(@class, "note panel")]//div[@class="note-content with-delete"]//div[6]'));
    this.deleteNoteButton = element(by.xpath('//div[contains(@class,"note panel")]//div[@class="delete"]/a[contains(@ng-click, "deleteNote")]/i'));

    this.confirmationAboutDeletion = element(by.xpath('//div[@class="modal-dialog"]//div[contains(@class, "ng-binding")]'));
    this.messageAboutSuccessfulDeletion = element(by.xpath('//div[@class="modal-dialog"]//div[contains(@class, "ng-binding alert-success") and contains(@ng-class, "alert-success")]'));
    this.messageAboutAbsenceNoteInNotesDetails = element(by.xpath('//div[contains(@class,"note panel")]//div[@class="panel-body"]/div[@class="ng-scope"]'));


   this.selectItemFromDropDown = function (item) {
        var searchResult = element(by.xpath('//div[contains(@class,"open")]/div[@class="dropdown-menu open"]//li/a[contains(@data-normalized-text,"'+item+'")]'));
        searchResult.click();
    };

    this.searchTableRecordViaInputField = function(inputField, value) {
        generalForText.inputText(inputField, value);
        this.searchButton.click();
    };

    this.resetTableRecord = function() {
        this.resetButton.click();
    };

    this.addResultsToArrayWithText = function(elements) {
        var map = elements.map(function(details) {
            details.getText()
                .then(function(text){
                    array.push(text);
                })
        });
    };

    this.printResultsWithText = function(){
        for (var i in array) {
            console.log('details : ' + i + ' => ' + array[i]);
        }
        return array.length;
    };

    this.isArrayContains = function(value){
        var flag = false;
        var name = value;
        var isStringPresent = function(string){
            return String(string).match(name);
        }
        var test = function(string){
            if(isStringPresent(string)) {
                flag = true;
                return string;
            } else {
                flag = true;
                return String('not');
            }
        }
        var newArray = array.map(test);
        console.log(newArray.toString().match(value));
        return flag;
    };

    this.cleanArray = function() {
        while(array.length > 0) {
            array.pop()
        }
    };

    this.addResultsToArray = function(elements) {
        var map = elements.map(function(details) {
            array.push(details);
        });
    };

    this.printResults = function(){
        for (var i in array) {
            console.log('rows : ' + i);
        }
        return array.length;
    };

    this.pagination = function() {
       // not work
        /*var rowsOfClaimList = 10;
        if (this.rowsOfTable.length == rowsOfClaimList) {
        this.buttonNextOfPagination.click();
        browser.sleep(1000);
        }*/
        //failed on 6 number
        /*    var expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
         for (var i = 0; i < expected.length; ++i) {
         expect(this.listOfPageNumbers.get(i).getText()).toEqual(expected[i]);
         this.listOfPageNumbers.get(i).click();
         browser.sleep(2000);
         }*/
        //TypeError: Object [object Object] has no method 'filter'
        /*this.buttonNextOfPagination.filter(function(elem) {
         return elem.getText().then(function(text) {
         return text === 'Next';
         });
         }).click();*/

        //var next = ['Next','Next','Next','Next','Next','Next','Next','Next','Next','Next','Next','Next','Next','Next'];
        var next = 'Next';
        for(var i = 0; i < 14; ++i) {
            expect(this.buttonNextOfPagination.getText()).toEqual(next);
            this.buttonNextOfPagination.click();
            browser.sleep(1000);
        }
    };

    this.scrollingToPointOfDestination = function(point) {
        var scrollTo = function () {
            arguments[0].scrollIntoView();
        }
        browser.controlFlow().execute(function(){
            var pointOfDestination = point.getWebElement();
            browser.executeScript(scrollTo, pointOfDestination)
        })
    };

    this.getRandomString = function (characterLength) {
        var randomText = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < characterLength; i++)
            randomText += possible.charAt(Math.floor(Math.random() * possible.length));
        return randomText;
    };


};
module.exports = new Table();
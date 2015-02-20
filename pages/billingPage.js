/**
 * Created by marta on 03.02.15.
 */

var BillingPage = function() {
    var locator = require('../settings/uniqueLocator.js');

    this.buttonForSelectionFacility = element(by.xpath('//div[@class="modal-dialog"]//div[@class="modal-body"]//button'));

   /* this.selectItemByTextFromDropdown = function selectItem(dropDownButton, item) {
        console.log('222');
        browser.actions().mouseMove(dropDownButton).click().perform();
        browser.sleep(1000);
        var desiredItem;
        return this.listContainer
            .then(function findMatchingItem(options) {
                console.log('333');

                options.some(function (option) {
                    option.getText().then(function doesItemMatch(text) {
                        if (text.indexOf(item) != -1) {
                            desiredItem = option;
                            return true;
                        }
                    });
                });
            })
            .then(function clickOption() {
                console.log('444');
                if (desiredItem) {
                    desiredItem.click();
                }
            });
    };*/

    this.selectRandomItemFromDropdown = function (dropDownButton) {
        browser.actions().mouseMove(dropDownButton).click().perform();
        browser.sleep(1000);
        return locator.listContainer.then(function (options) {
               var randomItem = Math.floor((Math.random() * options.length));
               options[randomItem].click();
        });
    };

    this.getTextFromDropDown = function (element) {
        var value = element.getText()
                .then(function(text){
                    array.push(text);
                })
    };


    /*return options[randomItem].getText().then(function (text) {
     console.log(text);
     return text;
     })*/

    /* var selected = element(by.xpath('//div[contains(@class,"open")]/div[@class="dropdown-menu open"]//li[@data-original-index="'+randomItem+'"]//span[@class="text"]'));
     //newFacilitySelected.push(selected);
     selected.getText().then(function(value){this.newFacilitySelected = value;
     console.log('newFacilitySelected '+this.newFacilitySelected);
     return value;}) */

    /*this.saveChanges = function save() {
        locator.buttonOK.click();
    };*/

};

module.exports = new BillingPage();
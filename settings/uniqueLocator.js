/**
 * Created by marta on 18.02.15.
 */

var UniqueLocator = function() {
    this.searchFieldForListContainer = element(by.xpath('//div[contains(@class,"open")]//div[@class="dropdown-menu open"]//input'));
    this.listContainer = element.all(by.xpath('//div[contains(@class,"open")]/div[@class="dropdown-menu open"]//li[not(@data-original-index="0")]'));
    this.buttonOK = element(by.xpath('//div[@class="modal-dialog"]//button[contains(text(),"OK")]'));
    this.buttonOk = element(by.xpath('//div[@class="modal-dialog"]//button[contains(text(),"Ok")]'));
    this.linkThatDeterminateFacility = element(by.xpath('//div[@class="navbar-right"]//a[contains(@ng-click, "updateFacility")]'));
    this.buttonYes = element(by.xpath('//div[@class="modal-dialog"]//button[contains(@ng-click, "ok") and contains(text(), "Yes")]'));
};
module.exports = new UniqueLocator();


////div[@class='modal-dialog']//button[contains(@ng-click, 'OK') and contains(text(), 'Ok')]
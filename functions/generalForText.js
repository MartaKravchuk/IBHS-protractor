/**
 * Created by marta on 12.02.15.
 */

var GeneralForText = function() {

    this.inputText = function (element, value) {
        element.clear();
        element.sendKeys(value);
        browser.sleep(500);
    },

    this.getTextFromInput = function (element) {
        return element.getAttribute('value');
    }
};
module.exports = new GeneralForText();

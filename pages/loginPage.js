/**
 * Created by marta on 02.02.15.
 */
var LoginPage = function() {
    var generalForText = require('../functions/generalForText.js');

    this.nameInput = element(by.xpath('//input[@name="userName"]'));
    this.passwordInput = element(by.xpath('//input[@name="password"]'));
    this.logInButton = element(by.xpath('//button[contains(text(), "Login")]'));

    this.loginToIBHS = function (name, password) {
        generalForText.inputText(this.nameInput, name);
        generalForText.inputText(this.passwordInput, password);
        this.logInButton.click();
    }
};
module.exports = new LoginPage();

/**
 * Created by marta on 20.02.15.
 */

var PatientPage = function() {
    this.linkPatient = element(by.xpath('//div[@class="navbar-collapse collapse"]//a[contains(text(), "Patients")]'));
};
module.exports = new PatientPage();
/**
 * Created by marta on 12.02.15.
 */

var ClaimSearchPage = function() {
    this.linkClaimSearch = element(by.xpath('//div[@class="navbar-collapse collapse"]//a[contains(text(), "Claim Search")]'));
};
module.exports = new ClaimSearchPage();

/**
 * Created by marta on 20.02.15.
 */

exports.config = {
    allScriptsTimeout: 300000,
    seleniumAddress: 'http://localhost:4444/wd/hub',

    framework: 'jasmine',

    onPrepare: function(){
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
    },

    capabilities: {
        browserName: 'chrome'
    },

    suites: {
        specs: './test/testPatient_smoke.js'
    },

    params: {
        login: {
            user: 'billinguser',
            password: 'Welcome1!'
        },
        mainUrls: {
            userUrl: 'http://malkosuabox.thecvsi.com:8582/billing/#/login/'
        },
        facility: {
            constantFacility: 'Facility Automation'
        }
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose : true,
        includeStackTrace : true
    }
};



import Model from "./model";

(function () {
    const $ = require("jquery");
    chrome.runtime.onMessage.addListener(function (req, sender, res) {
        Model.loadAirdrops().then(function (airdrops) {
            console.log(airdrops);
            var airdrop = findCurrentAirdrop(airdrops);
            if (airdrop == undefined) {
                alert("There is no info about this airdrop");
                return;
            }
            fillInput(airdrop, req);
        });
    });

    function fillInput(airdrop, accountInfo) {
        for (var key in airdrop) {
            if (airdrop.hasOwnProperty(key)) {
                if (accountInfo[key] == undefined) {
                    continue;
                }
                $(airdrop[key]).val(accountInfo[key]);
            }
        }
    }

    function findCurrentAirdrop(airdrops) {
        var url = location.href;
        return airdrops.find(function (airdrop) {
            console.log("pairs: ", airdrop.url, url);
            return airdrop.url == url;
        });
    }

})();
console.log("air-hunt js is loaded");
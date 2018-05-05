var Model = {
    loadAccounts: function () {
        return new Promise(function (res, rej) {
            chrome.storage.local.get(['accounts'], function (result) {
                // check is empty obj
                if (Object.keys(result).length === 0 && result.constructor === Object) {
                    res([]);
                    return;
                }
                res(result["accounts"]);
            });
        });
    },
    addAccount: function (account) {
        return this.loadAccounts().then(function (res) {
            res.push(account);

            chrome.storage.local.set({
                accounts: res
            });
        });
    },
    removeAccount: function (account) {
        this.loadAccounts().then(function (res) {
            var unDeletedAccounts = res.filter(function (item) {
                return item.email != account.email;
            });

            chrome.storage.local.set({
                accounts: unDeletedAccounts
            });
        });
    },

    loadNewAccount: function () {
        return {
            email: "",
            firstName: "",
            lastName: "",
            eth: "",
            twitter: "",
            telegram: ""
        }
    },

    loadAirdrops: function () {
        return [{
            url: "https://www.xdac.co/airdrop/",
            twitter: "#ipt_fsqm_form_70_pinfo_6_value",
            email: "#ipt_fsqm_form_70_pinfo_10_value",
            eth: "#ipt_fsqm_form_70_pinfo_5_value",
        }];
    },
};

export default Model;
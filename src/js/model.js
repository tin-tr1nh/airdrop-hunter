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
            let add = true;

            for (let index = 0; index < res.length; index++) {
                if (res[index].email == account.email) {
                    res[index] = account;
                    add = false;
                }
            }

            if (add) {
                res.push(account);
            }

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
        return new Promise(function (res, rej) {
            chrome.storage.local.get(['airdrops'], function (result) {
                // check is empty obj
                if (Object.keys(result).length === 0 && result.constructor === Object) {
                    res([]);
                    return;
                }
                res(result["airdrops"]);
            });
        });
    },

    setAirdrop: function (data) {
        chrome.storage.local.set({
            airdrops: data
        });
    }
};

export default Model;
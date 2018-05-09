import "uikit/dist/css/uikit.css";
import "../css/popup.css";
import "../css/option.css";

import Text from "./view/Text";
import VerticalList from "./view/VerticalList";
import ColorAvatar from "./view/ColorAvatar";
import Button from "./view/Button";
import HorizontalList from "./view/HorizontalList";

import Model from "./model";

const $ = require("jquery");
const sha256 = require("js-sha256").sha256;
const Papa = require("papaparse");

const airdropUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQbpY9YbEqtfODfXHcREXUdckB6FSOXK1D5D8LCGWW0R2CPvhD4IDnCFczzGL6Sh1w0sEzNfT3aYpMK/pub?gid=0&single=true&output=csv";

var app = $("#app");
var airdropApp = $("#airdrop-list");

var octopus = {
    updateShowView: function () {
        Model.loadAccounts().then(function (res) {
            console.log("UpdateShowView", res);
            showView.init(res);
        });
    },

    updateAirdropView: function () {
        Model.loadAirdrops().then(function (res) {
            console.log("UpdateAirdropView", res);
            airdropView.init(res);
        });
    }
};

var showView = {
    init: function (accounts) {
        this.accounts = accounts;
        this.accountsView = new VerticalList([]);
        this.newButton = new Button("New");
        this.render();
    },
    handleOnClickNew: function (account) {
        return function () {
            this.empty();
            editView.init(account);
        }
    },
    handleOnClickEdit: function (account) {
        return function () {
            this.empty();
            editView.init(account);
        }
    },

    handleOnClickDelete: function (view, data) {
        return function () {
            view.remove();
            Model.removeAccount(data);
        }
    },

    render: function () {
        this.newButton.addClickListener(this.handleOnClickNew(Model.loadNewAccount()).bind(this));
        this.accountsView.addItem(this.newButton);

        this.accounts.forEach(account => {
            var avt = new ColorAvatar(sha256(account.email));
            var editButton = new Button("EDIT");
            var deleteButton = new Button("Remove");
            var emailText = new Text(account.email);

            avt.addClass("flex-basic-0 flex-grow-1 cursor-pointer");
            emailText.addClass("flex-basic-0 flex-grow-3 margin-0 break-word width-100");
            editButton.addClass("use-button flex-basic-0 flex-grow-1 margin-2");
            deleteButton.addClass("use-button flex-basic-0 flex-grow-1 margin-2");

            var item = new HorizontalList([avt, emailText, editButton, deleteButton]);
            item.addClass("uk-card uk-card-default uk-card-hover uk-card-body uk-padding-small margin-10");

            deleteButton.addClickListener(this.handleOnClickDelete(item, account).bind(this));
            editButton.addClickListener(this.handleOnClickEdit(account).bind(this));

            this.accountsView.addItem(item);
        });

        this.accountsView.render(app);
    },

    empty: function () {
        this.accountsView.empty();
    }
}

var editView = {
    init: function (account) {
        this.account = account;
        this.elem = $("<div></div>");
        this.inputs = {};
        this.saveButton = $('<button class="uk-button uk-button-default"></button>').text("Save");
        this.saveButton.click(this.handleClickSaveButton.bind(this));
        this.render();
    },

    handleClickSaveButton: function () {
        let account = {};
        let inputs = this.inputs;
        Object.keys(this.inputs).forEach(function (key) {
            account[key] = inputs[key].val();
        });
        Model.addAccount(account).then(function (res) {
            octopus.updateShowView();
        });
        this.elem.remove();
    },

    render: function () {
        for (var key in this.account) {
            if (this.account.hasOwnProperty(key)) {
                let item = $('<div class="uk-margin"></div>');
                let label = $('<label class="uk-form-label"></label>').text(key);
                let input = $('<input class="uk-input">').val(this.account[key]);

                this.inputs[key] = input;

                label.appendTo(item);
                input.appendTo(item);

                item.appendTo(this.elem);
            }
        }
        this.saveButton.appendTo(this.elem);
        this.elem.appendTo(app);
    }
};

var airdropView = {
    init: function (airdrops) {
        this.airdrops = airdrops;
        this.airdropListView = new VerticalList([]);
        this.fetchButton = new Button("Fetch");
        this.render();
    },

    handleOnClickFetch: function () {
        this.empty();

        console.log("Fetch new airdrops");
        Papa.parse(airdropUrl, {
            download: true,
            header: true,
            complete: function (result) {
                console.log("Finish fetch");
                console.log(result);
                Model.setAirdrop(result.data);
                octopus.updateAirdropView();
            },
            error: function (err, file, inputElem, reason) {
                alert("Fetch data got error. Inform admin!!!");
            },
        })
    },

    handleOnClickJoin: function (url) {
        return function () {
            console.log("Join airdrop");
            window.open(url, '_blank');
        }
    },

    render: function () {
        this.fetchButton.addClickListener(this.handleOnClickFetch.bind(this));
        this.airdropListView.addItem(this.fetchButton);

        this.airdrops.forEach(airdrop => {
            var avt = new ColorAvatar(sha256(airdrop.url));
            var joinButton = new Button("JOIN");
            var urlText = new Text(airdrop.url);

            avt.addClass("flex-basic-0 flex-grow-1 cursor-pointer");
            urlText.addClass("flex-basic-0 flex-grow-3 margin-0 break-word width-100");
            joinButton.addClass("use-button flex-basic-0 flex-grow-1 margin-2");

            var item = new HorizontalList([avt, urlText, joinButton]);
            item.addClass("uk-card uk-card-default uk-card-hover uk-card-body uk-padding-small margin-10");

            joinButton.addClickListener(this.handleOnClickJoin(airdrop.url));

            this.airdropListView.addItem(item);
        });

        this.airdropListView.render(airdropApp);
    },
    empty: function () {
        this.airdropListView.empty();
    }
}

octopus.updateShowView();
octopus.updateAirdropView();
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

var app = $("#app");

var octopus = {
    updateShowView: function () {
        Model.loadAccounts().then(function (res) {
            console.log("UpdateShowView", res);
            showView.init(res);
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

        this.newButton.addClickListener(this.handleOnClickNew(Model.loadNewAccount()).bind(this));
        this.accountsView.addItem(this.newButton);

        this.accountsView.render(app);
    },
    hide: function () {
        this.accountsView.hide();
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


octopus.updateShowView();
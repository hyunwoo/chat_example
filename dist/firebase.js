"use strict";

(function () {
    var config = {
        apiKey: "AIzaSyDN7a2oateloFHA-eje8RC5W0FgnVaJq50",
        authDomain: "crossroadtogether-207900.firebaseapp.com",
        databaseURL: "https://crossroadtogether-207900.firebaseio.com",
        projectId: "crossroadtogether-207900",
        storageBucket: "crossroadtogether-207900.appspot.com",
        messagingSenderId: "44080432018"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var messageRef = database.ref('/');

    // 인증 , 로그인을 하지 않았지.


    var methods = {
        'child_added': function child_added() {},
        'child_removed': function child_removed() {}
    };
    var api = {
        /**
         *
         * @param id {String}
         * @param message {String}
         * @returns {String}
         */
        sendMessage: function sendMessage(id, message) {
            var chatId = messageRef.push().key;
            var d = {};
            d[chatId] = {
                id: id,
                message: message,
                date: new Date().getTime()
            };
            messageRef.update(d);
            return chatId;
        },

        /**
         * @param chatId
         */
        deleteMessage: function deleteMessage(chatId) {
            messageRef.child(chatId).set(null);
        },


        /**
         * @param name {String} child_added, child_removed
         * @param func {function} callback
         */
        on: function on(name, func) {
            methods[name] = func;
        }
    };

    messageRef.on('child_added', function (snapshot) {
        var d = {};
        d[snapshot.key] = snapshot.val();
        methods['child_added'](d);
    });

    messageRef.on('child_removed', function (snapshot) {
        var d = {};
        d[snapshot.key] = snapshot.val();
        methods['child_removed'](d);
    });

    window.chatApi = api;
})();

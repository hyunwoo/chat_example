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


    const database = firebase.database();
    const messageRef = database.ref('/');


    // 인증 , 로그인을 하지 않았지.


    const methods = {
        'child_added': function () {
        },
        'child_removed': function () {
        },
    };
    const api = {
        /**
         *
         * @param id {String}
         * @param message {String}
         * @returns {String}
         */
        sendMessage(id, message){
            const chatId = messageRef.push().key;
            const d = {};
            d[chatId] = {
                id,
                message,
                date: new Date().getTime(),
            };
            messageRef.update(d);
            return chatId;
        },
        /**
         * @param chatId
         */
        deleteMessage(chatId){
            messageRef.child(chatId).set(null);
        },

        /**
         * @param name {String} child_added, child_removed
         * @param func {function} callback
         */
        on(name, func){
            methods[name] = func;
        },
    };

    messageRef.on('child_added', (snapshot) => {
        const d = {};
        d[snapshot.key] = snapshot.val();
        methods['child_added'](d);
    });

    messageRef.on('child_removed', (snapshot) => {
        const d = {};
        d[snapshot.key] = snapshot.val();
        methods['child_removed'](d);
    });


    window.chatApi = api;
})();
$('textarea').on('keypress',
function(){
    console.log('?');
})

/**
 * Created by hyunwoo on 2018. 6. 28..
 */
// chatApi.sendMessage({userId}, {message});
// chatApi.deleteMessage({messageId});

//

'use strict';

var $root = $('.chatting-field');
var template = '<div class="chat-group">\n  <div class="chat">\n    <div class="empty"></div>\n    <div class="delete">x</div>\n    <div class="date"></div>\n    <div class="text-group">\n      <div class="name"></div>\n      <div class="text"></div>\n    </div>\n    <div class="profile">\n      <div class="profile-image"></div>\n    </div>\n  </div>\n</div>';
var modal = new CreateModal('.modal.chat-message');

function Element(id, isMine) {
    var index = index;
    var $ele = $(template);
    var that = this;

    if (isMine) {
        $ele.find('.profile').remove();
        $ele.find('.name').remove();
        $ele.find('.delete').on('click', function () {
            modal.open({
                headerText: 'WT',
                contentText: 'WT',
                positiveText: 'WT',
                negativeText: 'WT'
            }, function () {
                chatApi.deleteMessage(id);
            });
        });
    }
    $ele.attr('id', id);

    var elementData = {};
    if (isMine !== undefined && !isMine) $ele.addClass('receive');
    // message , date , id setting

    this.getTime = function () {
        return elementData.date;
    };
    this.getUserName = function () {
        return elementData.id;
    };
    /**
     * @param data {Object}
     * @param data.date {String}
     * @param data.message {String}
     * @param data.id {String}
     */
    this.setMessage = function (data) {
        elementData = data;
        // var keys = Object.keys(data);
        // for(var i = 0 ; i < keys.length ; i ++){
        //     ele.find(`[type=${keys[i]}]`).text(data[keys[i]]);
        // }
        $ele.find('.text').html(data.message);
        $ele.find('.name').text(data.id);
        $ele.find('.date').text(data.date);
    };

    // visible setting
    /**
     * @param usage {bool}
     */
    this.setVisibleTime = function (usage) {
        $ele.find('.date').css('visibility', usage ? 'visible' : 'hidden');
    };

    this.setVisibleName = function (usage) {
        $ele.find('.name').css('display', usage ? 'block' : 'none');
    };

    this.setVisibleProfile = function (usage) {
        $ele.find('.profile-image').css('visibility', usage ? 'visible' : 'hidden');
    };

    // mine ?

    // pre
    var prev = null;
    this.prev = function (ele) {
        if (ele === undefined) return prev;
        prev = ele;
        that.update();
    };

    // next
    var next = null;
    this.next = function (ele) {
        if (ele === undefined) return next;
        next = ele;
        that.update();
    };

    // check Visible
    this.update = function () {
        // 0. 이전께 내가 보낸 거면서 시간이 같으면 나의 이름과 사진을 삭제한다.
        if (prev !== null && prev.getUserName() === that.getUserName() && prev.getTime() === that.getTime()) {
            that.setVisibleName(false);
            that.setVisibleProfile(false);
        } else {
            that.setVisibleName(true);
            that.setVisibleProfile(true);
        }

        // 1. 다음꺼와 나의 이름이 같으면서 나의 시간이 같으면 나의 시간을 삭제한다.
        if (next !== null && next.getUserName() === that.getUserName() && next.getTime() === that.getTime()) {
            that.setVisibleTime(false);
        } else {
            that.setVisibleTime(true);
        }
        // 나의 뷰를 구성하면 된다!
    };

    this.remove = function () {
        $ele.remove();
        var prev = that.prev();
        var next = that.next();
        if (prev !== null) prev.next(next);

        if (next !== null) next.prev(prev);
    };

    // get date, get text ,get user
    $ele.appendTo($root);
    this.$ele = $ele;
    return this;
}

var userId = 'h.hyunwoo';
// 메세지 추가 이벤트
var eles = {};
var lastElement = null;
chatApi.on('child_added', function (d) {
    console.log(d);
    var id = Object.keys(d)[0];
    var data = d[id];
    var date = new Date(data.date);
    var dateString = (date.getHours() > 12 ? '오후' : '오전') + ' ' + date.getHours() % 12 + ':' + date.getMinutes();
    data.date = dateString;
    var ele = new Element(id, userId === data.id);
    ele.setMessage(data);

    if (lastElement !== null) {
        lastElement.next(ele);
        ele.prev(lastElement);
    }
    eles[id] = ele;
    lastElement = ele;

    // ele3.setVisibleTime(false);
});

// 메세지 삭제 이벤트
chatApi.on('child_removed', function (d) {
    var id = Object.keys(d)[0];
    var ele = eles[id];
    ele.remove();
    delete eles[id];

    // console.log(d);
});

var $textarea = $('textarea');

$textarea.on('keyup', function (event) {
    console.log(this);

    // this.attr('')


    var val = $textarea.val();
    if (event.keyCode === 13) {
        console.log('enter !!!', val);
        $textarea.val('');
        if (val.replace('\n', '') === '') return;
        if (val !== '') chatApi.sendMessage(userId, val);
    }
});

function CreateModal(targetClass) {
    var $modal = $(targetClass);
    var $buttonOk = $modal.find('.button.positive');
    var $buttonCancel = $modal.find('.button.negative');
    var that = this;

    var positiveEvent = null;
    this.open = function (option, event) {
        positiveEvent = event;
        $modal.attr('status', 'open');
    };

    this.close = function () {
        $modal.attr('status', 'close');
    };

    $buttonOk.on('click', function () {
        if (positiveEvent !== null) positiveEvent();
        that.close();
    });
    $buttonCancel.on('click', function () {
        that.close();
    });
    return this;
};

// setInterval
// var i =0;
// var it = setInterval(function () {
//     i++;
//     console.log('interval', i);
//     if (i > 10) clearInterval(it);
// }, 100);


// setTimeout(function () {
//     modal.close();
// }, 2000);
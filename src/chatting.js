/**
 * Created by hyunwoo on 2018. 6. 28..
 */
// chatApi.sendMessage({userId}, {message});
// chatApi.deleteMessage({messageId});

//

'use strict'

const $root = $('.chatting-field');
const template = `<div class="chat-group">
  <div class="chat">
    <div class="empty"></div>
    <div class="delete">x</div>
    <div class="date"></div>
    <div class="text-group">
      <div class="name"></div>
      <div class="text"></div>
    </div>
    <div class="profile">
      <div class="profile-image"></div>
    </div>
  </div>
</div>`;
const modal = new CreateModal('.modal.chat-message');

function Element(id, isMine) {
    const index = index;
    const $ele = $(template);
    const that = this;

    if (isMine) {
        $ele.find('.profile').remove();
        $ele.find('.name').remove();
        $ele.find('.delete').on('click', function () {
            modal.open({
                    headerText: 'WT',
                    contentText: 'WT',
                    positiveText: 'WT',
                    negativeText: 'WT',
                },
                function () {
                    chatApi.deleteMessage(id);
                });
        })
    }
    $ele.attr('id', id);

    let elementData = {};
    if (isMine !== undefined && !isMine)
        $ele.addClass('receive');
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
    let prev = null;
    this.prev = function (ele) {
        if (ele === undefined) return prev;
        prev = ele;
        that.update();
    };

    // next
    let next = null;
    this.next = function (ele) {
        if (ele === undefined) return next;
        next = ele;
        that.update();
    };

    // check Visible
    this.update = function () {
        // 0. 이전께 내가 보낸 거면서 시간이 같으면 나의 이름과 사진을 삭제한다.
        if (prev !== null
            && prev.getUserName() === that.getUserName()
            && prev.getTime() === that.getTime()) {
            that.setVisibleName(false);
            that.setVisibleProfile(false);
        } else {
            that.setVisibleName(true);
            that.setVisibleProfile(true);
        }

        // 1. 다음꺼와 나의 이름이 같으면서 나의 시간이 같으면 나의 시간을 삭제한다.
        if (next !== null
            && next.getUserName() === that.getUserName()
            && next.getTime() === that.getTime()) {
            that.setVisibleTime(false);
        } else {
            that.setVisibleTime(true);
        }
        // 나의 뷰를 구성하면 된다!
    };

    this.remove = function () {
        $ele.remove();
        const prev = that.prev();
        const next = that.next();
        if (prev !== null)
            prev.next(next);

        if (next !== null)
            next.prev(prev);
    };

    // get date, get text ,get user
    $ele.appendTo($root);
    this.$ele = $ele;
    return this;
}


const userId = 'h.hyunwoo';
// 메세지 추가 이벤트
const eles = {};
let lastElement = null;
chatApi.on('child_added', function (d) {
    console.log(d);
    const id = Object.keys(d)[0];
    const data = d[id];
    const date = new Date(data.date);
    const dateString = `${date.getHours() > 12 ? '오후' : '오전'} ${date.getHours() % 12}:${date.getMinutes()}`;
    data.date = dateString;
    const ele = new Element(id, userId === data.id);
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
    const id = Object.keys(d)[0];
    const ele = eles[id];
    ele.remove();
    delete eles[id];

    // console.log(d);
});


const $textarea = $('textarea');


$textarea.on('keyup', function (event) {
    console.log(this);


    // this.attr('')


    const val = $textarea.val();
    if (event.keyCode === 13) {
        console.log('enter !!!', val);
        $textarea.val('');
        if (val.replace('\n', '') === '') return;
        if (val !== '') chatApi.sendMessage(userId, val);
    }
});


function CreateModal(targetClass) {
    const $modal = $(targetClass);
    const $buttonOk = $modal.find('.button.positive');
    const $buttonCancel = $modal.find('.button.negative');
    const that = this;

    let positiveEvent = null;
    this.open = function (option,
                          event) {
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

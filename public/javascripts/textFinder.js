const texts = `
What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
`;


const section = new function () {

    const that = this;
    const $textZone = $('.text-zone');
    const $section = $('.section');
    const $buttonSectorOpener = $('.button-sector-opener');
    const $input = $section.find('input');

    $textZone.html(texts);
    this.changeLeftSector = function () {
        if ($section.attr('mode') === 'hide') {
            $section.attr('mode', '')
        } else {
            $section.attr('mode', 'hide')
        }
    };

    this.search = function () {
        const searchWord = $input.val();


        const classes = checkGroup.getSelectedValues().join(' ');

        let regex = '';
        switch (radioGroup.getSelectedValue()) {
            case 'Letter':
                regex = new RegExp(`(${searchWord})`, 'g');
                break;
            case 'Word':
                regex = new RegExp(`(\\S*${searchWord}\\S*)`, 'g');
                break;
            case 'Sentence':
                regex = new RegExp(`([^.?!]*${searchWord}[^.?!]*[.?!])`, 'g');
                break;
        }


        const result = texts.replace(regex, `<div class="highlight ${classes}">$1</div>`);
        $textZone.html(result);

        const $resultZone = $('.result-zone');
        $resultZone.empty();
        const eles = $textZone.find('.highlight');
        for (let i = 0; i < eles.length; i++) {
            const ele = $(`<div class="item">${i + 1} : ${$(eles[i]).text()}</div>`);
            ele.appendTo($resultZone);
            ele.on('click', function () {
                // TODO LINK
            });
        }
    };
    $buttonSectorOpener.on('click', that.changeLeftSector);
    $input.on('keyup', this.search);
};
const checkGroup = new CheckBoxGroup('.check-group', section.search);
const radioGroup = new RadioGroup('.radio-group', section.search);


// var arr = [{ name: '재종', age: 28 },
//     { name: '준엽', age: 24 },
//     { name: '수정', age: 22 },
//     { name: '현식', age: 23.5 }];
// const $resultZone = $('.result-zone');
//
// const result = _.chain(arr).filter(item => item.age === 22).map(item => {
//     const ele = $(`<div> ${item.name}, ${item.age}</div>`);
//     ele.appendTo($resultZone);
//     return {
//         ele,
//         data: item,
//     }
// }).value();
//
// const r = _.takeRight(arr, 3).map();
// console.log(r);



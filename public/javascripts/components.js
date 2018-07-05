function CheckBoxGroup(selector, onChangeListener) {
    const $root = $(selector);
    const $items = $root.find('.component');

    $items.on('click', function () {
        const $this = $(this);

        // $this.addClass('');
        if ($this.is('[selected]')) {
            $this.find('.icon').removeClass('animate bounceIn');
            $this.removeAttr('selected');
        } else {

            $this.find('.icon').addClass('animate bounceIn');
            $this.attr('selected', '');
        }
        onChangeListener();
    });

    this.getSelectedValues = function () {
        const $selects = $root.find('[selected]').find('.text');
        const values = [];

        $selects.each(function (i, e) {
            values.push($(e).text());
        });
        return values;
    };
}


function RadioGroup(selector, onChangeListener) {
    const $root = $(selector);
    const $items = $root.find('.radio-button');
    $items.on('click', function () {
        $items.removeAttr('selected');
        $(this).attr('selected', '');
        onChangeListener();
    });

    this.getSelectedValue = function () {
        return $root.find('.radio-button[selected]').find('.text').text();
    };
}

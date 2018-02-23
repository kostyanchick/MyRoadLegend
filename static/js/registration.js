$(document).ready(function () {
    $('.form-control').keyup(function () {
        var $group = $(this).parent();
        var $feedback = $group.find('.help-block');

        if (this.checkValidity() && this.value) {
            $group.removeClass('has-error');
            $group.addClass('has-success');
            $feedback.html('');
            $group.find('span').addClass('glyphicon-ok');
            $group.find('span').removeClass('glyphicon-remove');
        } else {
            $group.removeClass('has-success');
            $group.addClass('has-error');
            $feedback.html(this.title);
            $group.find('span').addClass('glyphicon-remove');
            $group.find('span').removeClass('glyphicon-ok');
        }

    });
});
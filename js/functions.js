function createMainBlocks (){
    createElement('div', '#main', '', {id: 'bootstrap_block'});
    createElement('div', '#main', '', {id: 'moment_block'});
}

function createBtnShowModal() {
    createElement('button', '#bootstrap_block', 'Show modal window.',
        {
            type: 'button',
            id: 'btn_show_modal',
            className: 'bootstrap_block',
            'data-bs-placement': 'top',
            'data-bs-toggle': 'tooltip',
            'data-bs-title': 'Open modal window',
            'data-bs-custom-class': 'custom-tooltip'
        },
        {
            click: showModalWindow
        })
}

function createModalWindow() {
   createElement('div', '#main', '', {className: 'modal fade', id: 'myModal', tabindex:'-1', 'aria-labelledby':'exampleModalLabel', 'aria-hidden': 'true'});
   createElement('div', '#myModal', '', {className: 'modal-dialog', id: 'modal_dialog'});
   createElement('div', '#modal_dialog', '', {className: 'modal-content', id: 'modal_content'});
   createElement('div', '#modal_content', '', {className: 'modal-header"', id: 'modal_header'});
   createElement('h1', '#modal_header', 'Affirmation', {className: 'modal-title fs-5'});
   createElement('div', '#modal_content', '', {className: 'modal-body', id: 'modal_body'});
   createElement('p', '#modal_body', 'Everything I desire comes my way.');
   createElement('div', '#modal_content', '', {className: 'modal-footer', id: 'modal_footer'});
   createElement('button', '#modal_footer', 'Close', {className: 'btn btn-primary', type: 'button', 'data-bs-dismiss': 'modal'});
}

function showModalWindow() {
    const myModalAlternative = new bootstrap.Modal('#myModal');
    myModalAlternative.show();
}

function showTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function createAlertBtn() {
    createElement('button', '#bootstrap_block', 'Show or hide alert.',
        {
            type: 'button',
            id: 'btn_show_alert',
            className: 'btn btn-primary',
            'data-bs-placement': 'top',
            'data-bs-toggle': 'tooltip',
            'data-bs-title': 'Open alert window',
            'data-bs-custom-class': 'custom-tooltip-alert',
        },
        {
            click: () => {
                showOrHideAlert('Nice, you triggered this alert message!');
            }
        })
}

function showOrHideAlert(message) {
    if (document.getElementById('alert_wrap') !== null) {
        removeElement(document.getElementById('alert_wrap'));
    } else {
        createElement('div', '#main', '', {className: "alert alert-success alert-dismissible fade show", role: 'alert', id: 'alert_wrap'});
        const alertMessage = createElement('p', '#alert_wrap');
        alertMessage.textContent = message;
        createElement('button', '#alert_wrap', '', {className: 'btn-close', 'data-bs-dismiss': 'alert', 'aria-label': 'Close'});
    }
}

function showMyBirthdayDate() {
    const birthDate = moment('2000-10-03');
    const dateAfterFormatting = birthDate.format('DD.MM.YYYY');
    createElement('div', '#moment_block', `My birthday is: ${dateAfterFormatting}`);
}

function createInputForDate() {
    createElement('div', '#moment_block', '', {id: 'input_wrap'});
    createElement('input', '#input_wrap', '', {id: 'date_input', type: 'text', placeholder: 'Enter your date of birth in format: YYYY-MM-DD'});
    createElement('button', '#moment_block', 'Submit', {id: 'btnSubmit', className: 'btn btn-primary', type: 'button'}, {click: formattingDate});
    createElement('p', '#moment_block', '', {id: 'formatted_date'});
}
function validateDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/g.test(date);
}
function formattingDate() {
    const dateFromUser = document.getElementById('date_input').value;
    if (validateDate(dateFromUser)) {
        const userDate = moment(dateFromUser, 'YYYY-MM-DD');
        if (userDate.isValid()) {
            const formattedUserDate = userDate.format('MMMM Do YYYY');
            document.getElementById('formatted_date').textContent = `Another format of your birth date: ${formattedUserDate}`;
        } else {
            document.getElementById('formatted_date').textContent = '';
            showOrHideAlert(('Incorrect date'));
            document.getElementById('date_input').value = '';
        }
    } else {
        document.getElementById('formatted_date').textContent = '';
        showOrHideAlert('Incorrect format of date. Please try again.');
        document.getElementById('date_input').value = '';
    }
}
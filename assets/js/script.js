let checkbox = document.querySelector('.checkbox');
checkbox.addEventListener('click', () => {
  checkbox.classList.toggle('active');
});

let areaOptions = document.querySelector('.areaOptions');

areaOptions.addEventListener('click', (event) => {
  let target = event.target;
  if(target.classList.contains('options')) {
    let options = areaOptions.querySelectorAll('.options');
    options.forEach((option) => {
      option.classList.remove('active');
      let radio = option.querySelector('.radio');
      radio.classList.remove('active');
      let optionElement = option.querySelector('.option');
      optionElement.classList.remove('active');
    });
    target.classList.add('active');
    let selectedRadio = target.querySelector('.radio');
    selectedRadio.classList.add('active');
    let selectedOption = target.querySelector('.option');
    selectedOption.classList.add('active');
  }
});

let validator = {
  handleSubmit: (event) => {
    event.preventDefault();
    let send = true;

    let inputs = document.querySelectorAll('input, textarea');
    let options = document.querySelectorAll('.areaOptions');
    let checkboxes = document.querySelectorAll('.checkbox');

    validator.clearErrors();

    for(let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = validator.checkInput(input);
      if(check !== true) {
        send = false;
        validator.showError(input, check);
      }
    }

    for(let i = 0; i < options.length; i++) {
      let option = options[i];
      let check = validator.checkInput(option);
      if(check !== true) {
        send = false;
        validator.showError(option, check);
      }
    }

    for(let i = 0; i < checkboxes.length; i++) {
      let checkbox = checkboxes[i];
      let check = validator.checkInput(checkbox);
      if(check !== true) {
        send = false;
        validator.showError(checkbox, check);
      }
    }

    if(send) {
      validator.sendForm();
      setTimeout(() => {
        form.submit();
      }, 3500);
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute('data-rules');
    if(rules !== null) {
      rules = rules.split('|');
      for(let r in rules) {
        let rDetails = rules[r].split('=');
        switch(rDetails[0]) {
          case 'required':
            if(input.value?.trim() == '') {
              return 'This field is required.';
            }
            break;

          case 'min':
            if(input.value.length < rDetails[1]) {
              return `The minimum number of characters is ${rDetails[1]}.`;
            }
            break;

          case 'email':
            if(input.value != '') {
              let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
              if (!regex.test(input.value.toLowerCase())) {
                return 'Please enter a valid email address.';
              }
            }
            break;
        }
      }
    }

    if(input.classList.contains('areaOptions')) {
      let options = input.querySelectorAll('.options');
      if(!Array.from(options).some((option) => option.classList.contains('active'))) {
        return 'Please select a query type.';
      }
    }

    if(input.classList.contains('checkbox')) {
      if(!input.classList.contains('active')) {
        return 'To submit this form, please consent to being contacted.';
      }
    }

    return true;
  },
  showError: (input, error) => {
    input.style.borderColor = '#f00';
    checkbox.style.borderColor = ''
    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    if(input.classList.contains('areaOptions')) {
      input.appendChild(errorElement);
    } else if(input.classList.contains('checkbox')) {
      let label = input.closest('label');
      if(label) {
        label.appendChild(errorElement);
      }
    } else {
      input.parentElement.insertBefore(errorElement, input.nextElementSibling);
    }
  },
  clearErrors: () => {
    let inputs = form.querySelectorAll('input, textarea');
    for(let i = 0; i < inputs.length; i++) {
      inputs[i].style.borderColor = '';
    }

    let errorElements = document.querySelectorAll('.error');
    for(let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    }
  },
  sendForm: () => {
    const messageSentElement = document.querySelector('.messageSent');
    messageSentElement.style.display = 'block';
    setTimeout(() => {
      messageSentElement.style.opacity = 1;
    }, 1000)
    setTimeout(() => {
      messageSentElement.style.opacity = 0;
    }, 3000)
    setTimeout(() => {
      messageSentElement.style.display = 'none';
    }, 4000)
  }
};

// Selecionando o formulário
let form = document.querySelector('.validator');

// Bloqueando o envio
form.addEventListener('submit', validator.handleSubmit);

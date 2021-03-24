import validator from "validator";

let validateForm =  function() {
  const form = document.forms.raffle
  const formFields = [...document.querySelectorAll('input, select, textarea')]
  const radioBtn = [...document.querySelectorAll('input[type=radio]')]



  form.setAttribute('novalidate', true);

  form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    validateField(formFields)
    validateGroup('gender')


  });

  form.addEventListener('keyup', function(ev) {
    ev.preventDefault();
    validateField(formFields)
  });

  radioBtn.forEach(function(el){
    el.addEventListener('click', function() {
      validateGroup('gender')
    })
  })

  function validateField(fields) {

    fields.forEach(function(el) {

      let attrName = el.getAttribute("name");

      if (attrName === 'email') {

        if(validator.isEmail(el.value)) {
          el.classList.remove('error')
          document.querySelector('.error-message[data-error-msg="email"]').innerHTML = ''
 
        } else {
          el.classList.add('error')
          document.querySelector('.error-message[data-error-msg="email"]').innerHTML = 'completa correttamente il campo: email'
        }

      } else if (attrName === 'firstname') {
        if(!validator.isEmpty(el.value)) {
          el.classList.remove('error')
          document.querySelector('.error-message[data-error-msg="firstname"]').innerHTML = ''
     
        } else {
          el.classList.add('error')
          document.querySelector('.error-message[data-error-msg="firstname"]').innerHTML = 'completa correttamente il campo: nome'
        }

      } else if (attrName === 'lastname') {

        if(!validator.isEmpty(el.value)) {
          el.classList.remove('error')
          document.querySelector('.error-message[data-error-msg="lastname"]').innerHTML = ''
   
        } else {
          el.classList.add('error')
          document.querySelector('.error-message[data-error-msg="lastname"]').innerHTML = 'completa correttamente il campo: cognome'
        }

      } else if (attrName === 'dayofbirth') {

        if(validator.isInt(el.value, { min: 1, max: 31 })) {
          el.classList.remove('error')
          document.querySelector('.error-message[data-error-msg="dayofbirth"]').innerHTML = ''
  
        } else {
          el.classList.add('error')
          document.querySelector('.error-message[data-error-msg="dayofbirth"]').innerHTML = 'I minori di 18 anni non possono participare!'
        }

      } else if (attrName === 'monthofbirth') {

        if(validator.isInt(el.value, { min: 1, max: 12 })) {
          el.classList.remove('error')
          document.querySelector('.error-message[data-error-msg="dayofbirth"]').innerHTML = ''
     
        } else {
          el.classList.add('error')
          document.querySelector('.error-message[data-error-msg="dayofbirth"]').innerHTML = 'I minori di 18 anni non possono participare!'
        }

      } else if (attrName === 'yearofbirth') {

        if(validator.isInt(el.value, { min: 1900, max: 2003 })) {
          el.classList.remove('error')
          document.querySelector('.error-message[data-error-msg="dayofbirth"]').innerHTML = ''
 
        } else {
          el.classList.add('error')
          document.querySelector('.error-message[data-error-msg="dayofbirth"]').innerHTML = 'I minori di 18 anni non possono participare!'
        }
      }
    })
  }

  function validateGroup(groupName){
    const group = document.getElementsByName(groupName);
    let groupCount = 0;

    for (let i = 0; i < group.length; i++) {
      if (group[i].checked) {
        groupCount++;
      }
    }

    if (groupCount < 1) {
      for (let i = 0; i < group.length; i++) {

        group[i].classList.add("error")
        document.querySelector('.error-message[data-error-msg="gender"]').innerHTML = 'completa correttamente il campo: sesso'
      }
      return false;
    }

    if (groupCount === 1) {
      for (let i = 0; i < group.length; i++) {
        group[i].classList.remove("error")
        document.querySelector('.error-message').innerHTML = ''
      }
      return false;
    }
    return true;
  }
}

validateForm()
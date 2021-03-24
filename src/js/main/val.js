function formValidator (form, fields) {

  form.setAttribute('novalidate', 'novalidate')

  function initialize() {
    validateOnSubmit()
    validateOnEntry()
  }

  function validateOnSubmit() {
    form.addEventListener('submit', e => {
      e.preventDefault()
      // fields.forEach(field => {
        // const input = form.elements[field]
        const input = form.elements
        console.log(...input)
        validateFields(input)
      // })
    })
  }

  function validateOnEntry() {

  }

  function validateFields(field) {
    // console.log(field)

    // validate firsName
    // fields.forEach(el => {
    //   // console.log(el)
    // })
    // if () {
    //   console.log(field)
    // } else {
      
    // }
    // field.forEach(el => {
    //   // console.log('------')
    //   // console.log(field)
    //   // console.log(el.getAttribute('name'))
    //   // if (el.getAttribute('name') == 'name'){
    //   //   console.log(el)
    //   // }
    // })
  }

  initialize()
}

const form = document.forms.raffle
const fields = [
  "gender",
  "firstname",
  "lastname",
  "email",
  "dayofbirth",
  "monthofbirth",
  "yearofbirth"
]

// formValidator(form, fields)

// let formData = new FormData(form)
// console.log(formData)

// if (input instanceof NodeList) {
//   console.log("node list")
// } else console.log("element")

// const input = document.querySelectorAll(`[name='${field}']`)




// validateForm()

class FormValidator {
  constructor(form, fields) {
    this.form = form
    this.fields = fields
  }

  initialize() {
    this.validateOnEntry()
    this.validateOnSubmit()
  }

  validateOnSubmit() {
    let self = this

    
    this.form.addEventListener('submit', e => {
      e.preventDefault()
      console.log(fields)

      let fil = this.form.querySelectorAll('input, select, textarea')
      console.log(...fil)


	    self.fields.forEach(field => {
        console.log(field)
        
        const input = document.querySelector(`#${field}`)
        
        console.log(input)
        // const input = getAttribute("name")
        self.validateFields(input)
      })
    })
  }

  validateOnEntry() {
    let self = this
    this.fields.forEach(field => {

      const input = document.querySelector(`#${field}`)

      input.addEventListener('input', event => {
        self.validateFields(input)
      })
    })
  }

  validateFields(field) {

    // Check presence of values
    if (field.value.trim() === "") {
      this.setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, "error")
    } else {
      this.setStatus(field, null, "success")
    }

    // check for a valid email address
    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/
      if (re.test(field.value)) {
        this.setStatus(field, null, "success")
      } else {
        this.setStatus(field, "Please enter valid email address", "error")
      }
    }

    // Password confirmation edge case
    if (field.id === "password_confirmation") { 
      const passwordField = this.form.querySelector('#password')

      if (field.value.trim() == "") {
        this.setStatus(field, "Password confirmation required", "error")
      } else if (field.value != passwordField.value)  {
        this.setStatus(field, "Password does not match", "error")
      } else {
        this.setStatus(field, null, "success")
      }
    }
  }

  setStatus(field, message, status) {
    const successIcon = field.parentElement.querySelector('.icon-success')
    const errorIcon = field.parentElement.querySelector('.icon-error')
    const errorMessage = field.parentElement.querySelector('.error-message')

    if (status === "success") {
      if (errorIcon) { errorIcon.classList.add('hidden') }
      if (errorMessage) { errorMessage.innerText = "" }
      successIcon.classList.remove('hidden')
      field.classList.remove('input-error')
    }

    if (status === "error") {
      if (successIcon) { successIcon.classList.add('hidden') }
      field.parentElement.querySelector('.error-message').innerText = message
      errorIcon.classList.remove('hidden')
      field.classList.add('input-error')
    }
  }
}

// const form = document.forms.raffle
// const fields = ["gender", "firstname", "lastname", "email", "dayofbirth", "monthofbirth", "yearofbirth"]

// const formValidator = new FormValidator(form, fields)
// formValidator.initialize()
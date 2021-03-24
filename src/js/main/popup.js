function modal() {
  const modalBtn = [...document.querySelectorAll('.js-link-popup')]
  const modalWrapper = document.querySelector('.js-popup')

  let modalFlag = false

  if (!modalFlag) {
    // console.log(1)

  } else {
    // console.log(2)
  }

  setTimeout(() => {
    const firtSlideURL = './assets/popup/first-slide.html'
    getModalContent(firtSlideURL)
    modalWrapper.classList.add('is-active')

    document.addEventListener('click', e => {
      if (e.target.classList.contains('js-close-popup')) {
        modalWrapper.classList.remove('is-active')
      }
    })
  }, 1500)


  modalBtn.forEach(function (element) {
    element.addEventListener('click', function(event) {
      // modalFlag = true
      getModalContent(event.target.dataset.url)
      modalWrapper.classList.add('is-active')
      // console.log(modalFlag)


      document.addEventListener('click', e => {
        if (e.target.classList.contains('js-close-popup')) {
          // modalFlag = false
          modalWrapper.classList.remove('is-active')
          // console.log(modalFlag)
        }
     })
    })
  })

  function getModalContent(url) {
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        modalWrapper.innerHTML = data
      });
  }
}


modal()
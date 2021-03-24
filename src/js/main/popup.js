function modal() {
  const modalBtn = [...document.querySelectorAll('.js-link-popup')]
  const modalWrapper = document.querySelector('.js-popup')

  setTimeout(() => {
    modalWrapper.innerHTML = ''
    const firtSlideURL = './assets/popup/first-slide.html'
    getModalContent(firtSlideURL)
    modalWrapper.classList.add('is-active')

    document.addEventListener('click', e => {
      if (e.target.classList.contains('js-close-popup')) {
        modalWrapper.classList.remove('is-active')
        modalWrapper.innerHTML = ''
      }
    })
  }, 1500)

  modalBtn.forEach(function (element) {
    element.addEventListener('click', function(event) {
      modalWrapper.innerHTML = ''
      getModalContent(event.target.dataset.url)
      modalWrapper.classList.add('is-active')

      document.addEventListener('click', e => {
        if (e.target.classList.contains('js-close-popup')) {
          modalWrapper.classList.remove('is-active')
          modalWrapper.innerHTML = ''
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
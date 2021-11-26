///////////////////////////////////////////////////////// INPUT MASK

let inputTel = document.querySelectorAll('input[type="tel"]')

let im = new Inputmask('+7 (999) 999-99-99')
im.mask(inputTel)

///////////////////////////////////////////////////////// MODAL

let modal = document.querySelector('.modal')
let body = document.querySelector('body')

let openModalBtn = document.querySelectorAll('.contacts__submit-btn')
let activeBtn = null;
let isClickButtonInWindow = false;

openModalBtn.forEach(el => {
	el.addEventListener('click', () => {
		activeBtn = el
		modal.classList.remove('modal-hide')
		el.classList.add('contacts__submit-btn-active')
	})
})

document.addEventListener('click', (event) => {
	if (event.target.dataset.close == 'close' && !isClickButtonInWindow) {
		modal.classList.add('modal-hide')
		activeBtn.classList.remove('contacts__submit-btn-active')
		activeBtn = null
	}
})

///////////////////////////////////////////////////////// BUTTON 

const button = document.querySelectorAll('.send-btn');
const submit = document.querySelectorAll('.send-btn__submit');

function addClass(event) {
	this.classList.add('finished');

	setTimeout(() => {
		this.classList.remove('finished')
		modal.classList.add('modal-hide')
		if (event.target.classList.contains('modal-send-btn')) activeBtn.classList.remove('contacts__submit-btn-active')
		activeBtn = null
		isClickButtonInWindow = false
	}, 2000)
}

button.forEach(el => {
	el.addEventListener('click', function(event) {
		let validatePhone = event.target.closest('.form').querySelector('.form__input-phone');
		let validateName = event.target.closest('.form').querySelector('.form__input-name');
		
		if (validatePhone.value.split('').indexOf('_') == -1 && validatePhone.value != '' && validateName.value != '') {
			el.classList.toggle('active');
			isClickButtonInWindow = true
		}
	});
})

button.forEach(el => {
	el.addEventListener('transitionend', function() {
		this.classList.toggle('active');
		isClickButtonInWindow = true
	});
})

button.forEach(el => {
	el.addEventListener('transitionend', addClass);
})

///////////////////////////////////////////////////////// SLIDER

let main_slider = new Swiper('.swiper', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 30,
	speed: 800,
	loop: true,
	navigation: {
		nextEl: '.arrow-next',
		prevEl: '.arrow-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});

///////////////////////////////////////////////////////// SEND EMAIL

let validateForms = function (selector, rules) {
  new window.JustValidate(selector, {
    rules: rules,
    messages: {
      name: {
        required: "Это поле обязательно",
      },
      tel: {
        required: "Это поле обязательно",
        strength: "Заполните поле полностью",
      },
    },
    submitHandler: function (form) {
      let formData = new FormData(form);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        console.log(xhr.responseText);
      };

      xhr.open("POST", "../../send.php", true);
      xhr.send(formData);
      form.reset();
    },
  });
};

validateForms(".modal-form", {
  name: {
    required: true,
  },
  tel: {
    required: true,
    strength: {
      custom: "[^_]$",
    },
  },
});

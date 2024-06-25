const form = document.querySelector('#form');
const formContent = document.querySelector('#form-content');

const formObject = [
    { type: 'input', name: 'name', label: 'Name' },
    { type: 'input', name: 'surname', label: 'Surname' },
    { type: 'input', name: 'phone', label: 'Phone' },
    { type: 'input', name: 'email', label: 'Email' },
    {
        type: 'select', name: 'age', label: 'Age', options: [
            {value:'0-18', name:'0 - 18'},
            {value:'18-25', name:'18 - 25'},
            {value:'25 - 40', name:'25 - 40'},
            {value:'40 +', name:'40 +'},
        ]
    },
    {
        type: 'select', name: 'hobbi', label: 'Hobby', options: [
            { value: 'football', name: 'Football' },
            { value: 'basketball', name: 'Basketball' },
            { value: 'tennis', name: 'Tennis' }
        ]
    },
    { type: 'input', name: 'password', label: 'Password' },
    { type: 'input', name: 'rpassword', label: 'Repeat Password' },

]

// Düzgün emaili doğrulamaq üçün istifadə edilən funksiya
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// Düzgün parolu doğrulamaq üçün istifadə edilən funksiya
const validatePhoneNumber = (phone) => {
    return String(phone)
        .match(
            /^(\+?\d{1,4}|\d{1,4})?\s?\d{10}$/
        );
};

// Sadəcə rəqəm olmağını doğrulamaq üçün istifadə edilən funksiya
const isNumber = (str) => {
    var pattern = /^\d+\.?\d*$/;
    return pattern.test(str);
};

// Sadəcə hərf olmağını doğrulamaq üçün istifadə edilən funksiya
const isOnlyLetters = (str) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(str);
};


// Xətalı hissəyə xəta mesajını əlavə etmək üçün funsiya  
const errorMessage = (element, message) => {
    element.classList.add('border-red-500');
    element.parentElement.insertAdjacentHTML('beforeend', `<p class="text-red-500 text-sm mt-[2px]">${message}</p>`);
};

// Xəta mesajı təkrarlanmasın deyə yazılan funksiya
const removeErrorMessage = (element) => {
    if (element.parentElement.querySelector('p')) {
        element.parentElement.querySelector('p').remove();
        element.classList.remove('border-red-500');
    }
};

// Xəta mesajı olmasa verilənləri dataya əlavə etsin deyə yazılan funksiya
const handleSubmit = (values) => {
    console.log(values);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let error = 0;
    let values = {};

    for (let element of e.target.elements) {
        removeErrorMessage(element);

        if (element.tagName !== 'BUTTON' && element.type !== 'submit') {
            const value = element.value.trim();
            const message = element.getAttribute('data-message');
            const min = element.getAttribute('data-min');
            const max = element.getAttribute('data-max');
            const email = element.getAttribute('data-email');
            const phone = element.getAttribute('data-phone');
            const number = element.getAttribute('data-number');
            const text = element.getAttribute('data-text');
            const same = element.getAttribute('data-same');
            values[element.name] = value;

            if (!value) {
                errorMessage(element, message || "Zəhmət olmasa boş buraxma");
                error++;
            }
            else if (text && !isOnlyLetters(value)) {
                errorMessage(element, 'Zəhmət olmasa hərf daxil edin');
                error++;
            }
            else if (email && !validateEmail(value)) {
                errorMessage(element, 'Email formatını düzgün yazın');
                error++;
            }
            else if (number && !isNumber(value)) {
                errorMessage(element, 'Rəqəm daxil edin');
                error++;
            }
            else if (phone && !validatePhoneNumber(value)) {
                errorMessage(element, 'Phone formatını düzgün yazın');
                error++;
            }
            else if (max && value.length > parseInt(max)) {
                errorMessage(element, `Ən çox ${max} simvol ola bilər`);
                error++;
            }
            else if (min && value.length < parseInt(min)) {
                errorMessage(element, `Ən az ${min} simvol ola bilər`);
                error++;
            }
            else if (same) {
                const sameInput = form.querySelector(`[name="${same}"]`);
                if (sameInput && sameInput.value.toString().toLowerCase() !== value.toString().toLowerCase()) {
                    errorMessage(element, 'Şifrələr eyni deyil');
                    error++;
                }
            }
        }

    };
    if (!error) {
        handleSubmit(values);
    }

});

const formInput = (element) => {
    return `
        <input type="text" name="name"  data-text="true" data-min="3" data-message="Zəhmət olmasa ${element.name}'i boş buraxmayın" class="border border-gray-300 h-[40px] w-full rounded-[5px] px-[15px]">
    `
};

const formSelect = (element) => {
    let html = '<option value="">Seç</option>'
    for (let option of element.options) {
        html += `<option value="${option.value}">${option.name}</option>`
    }
    return `
        <select class="border border-gray-300 h-[40px] w-full rounded-[5px] px-[15px]">
            ${html}
        </select>
    `
};

const formElements = (element) => {
    if (element.type === 'input') {
        return formInput(element);
    }
    else if (element.type === 'select') {
        return formSelect(element);
    }
}

const formStart = () => {
    for (let el of formObject) {

        formContent.innerHTML += `
            <div>
                <label class="flex font-bold text-[16px]">${el.label}</label>
                ${formElements(el)}
            </div>
    `
    };
};

formStart();
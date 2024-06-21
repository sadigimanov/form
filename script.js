const form = document.querySelector('#form');


const errorMessage = (element,message) => {
    element.classList.add('border-red-500');
    element.parentElement.insertAdjacentHTML("beforeend", `<p class="text-sm text-red-500 mt-[2px] ">${message}</p>`)
}

const removeErrorMessage = (element) => {
    if (element.parentElement.querySelector('p')){
        element.parentElement.querySelector('p').remove();
        element.classList.remove('border-red-500');
    };
};
const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhoneNumber = (phone) => {
    return String(phone)
    .match(
    /^(\+?\d{1,4}|\d{1,4})?\s?\d{10}$/
    );
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    for (let element of e.target.elements) {
        removeErrorMessage(element);

        if (element.tagName !== 'BUTTON') {
            const value = element.value.trim();
            const message = element.getAttribute('data-message');
            const max = element.getAttribute('data-max');
            const min = element.getAttribute('data-min');
            const some = element.getAttribute('data-some');

            if (!value) {
                errorMessage(element,message || 'Zəhmət olmasa boş buraxmayın');
            }
            else if(max){
                if (value.length > parseInt(max)){
                    errorMessage(element,`Ən çox ${max} simvol ola bilər`);
                } 
            }
            else if(min){
                if (value.length < parseInt(min)){
                    errorMessage(element,`Ən az ${min} simvol ola bilər`);
                } 
            }
            else if (element.name === 'email' && !validateEmail(value)){
                errorMessage(element,`Email formatını düzgün yazın`);
            }
            else if (element.name === 'phone' && !validatePhoneNumber(value)){
                errorMessage(element,`Phone formatını düzgün yazın`);
            }
            else if (some){
                const someInput = form.querySelector(`[name="${some}"]`);
                if (someInput && someInput.value.toString().toLowerCase() !== value.toLowerCase()){
                    errorMessage(element,`Şifrələr uyğun deyil`);
                }
            }
        }
    };

});










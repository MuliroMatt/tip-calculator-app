const inputs = document.querySelectorAll('.form__input');
const billInput = inputs[0];
const peopleInput = inputs[1];
const error = document.querySelectorAll('.error-text');
const radioInput = document.querySelectorAll('.select-tip__input');
const checkedRadio = document.querySelector('.select-tip__input:checked')
const customInput = document.querySelector('.select-tip__option--custom');
const resetBtn = document.querySelector('.btn');
const totalValue = document.querySelector('.total')
const tipAmountValue = document.querySelector('.tip-amount')

//* Variables

let bill = 0;
let tip = 0;
let people = 0;

//* EventListenters

inputs.forEach((input) => {
   input.addEventListener('input', formatNumberInput);
   input.addEventListener('input', isZero);
   input.addEventListener('input', ()=>{
    calculateTotal()
   })
});

customInput.addEventListener('input', formatPercentageInput)
customInput.addEventListener('input', () =>{
    tip = parseFloat(customInput.value) * 0.01
    uncheckTips()
    calculateTotal()
})

radioInput.forEach(radio => {
    radio.addEventListener('input', () => {
        tip = parseFloat(radio.value)
        customInput.value = ''
        calculateTotal()
    })
});

resetBtn.addEventListener('click', reset);

//* Functions

function calculateTotal() {
    const bill = parseFloat(billInput.value)
    const people = parseInt(peopleInput.value)
    if(people > 0 && bill > 0 && tip > 0){
        let tipAmount = bill * tip / people
        let total = (bill + (bill * tip)) / people
        tipAmountValue.innerHTML = `$${tipAmount.toFixed(2)}`
        totalValue.innerHTML = `$${total.toFixed(2)}`
        enableResetBtn()
    }
    else{
        tipAmountValue.innerHTML = `$0.00`
        totalValue.innerHTML = `$0.00`
    }
}

function formatNumberInput() {
   this.value = this.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*?)\..*/g, '$1')
      .replace(/(\.\d{2})\d+/g, '$1');
}

function formatPercentageInput() {
    //* Allow only numbers less than 100
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value > 100) {
       this.value = '100';
    }
 }

function isZero() {
   inputBox = this.parentNode;
   if (this.value == 0) {
      inputBox.previousElementSibling.classList.remove('hidden');
      this.style.outlineColor = '#e75757';
   } else {
      inputBox.previousElementSibling.classList.add('hidden');
      this.style.outlineColor = '';
   }
}

function uncheckTips() {
   radioInput.forEach((radio) => (radio.checked = false));
}

function enableResetBtn() {
    resetBtn.classList.add('btn--active');
}

function reset() {
    if(resetBtn.classList.contains('btn--active')){
        inputs.forEach((input) => (input.value = ''));
        customInput.value = ''
        totalValue.innerHTML = '$0.00'
        tipAmountValue.innerHTML = '$0.00'
        error.forEach(item => {
            item.classList.add('hidden')
        });
        billInput.focus()
        resetBtn.classList.remove('btn--active')
        uncheckTips();
    }
}

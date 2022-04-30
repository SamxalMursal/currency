const leftbuttons = document.querySelectorAll('.left button')
const rightbuttons = document.querySelectorAll('.rigth button')
const info1 = document.querySelector('.left .info')
const info2 = document.querySelector('.rigth .info')
const input = document.querySelector('input')
const answer = document.querySelector('.answer')

let pul1 = 'RUB'
let pul2 = 'USD'

fetch(`https://api.exchangerate.host/latest?base=${pul1}&symbols=${pul2}`)
    .then(res => res.json())
    .then(data => {
        input.addEventListener('keyup', (e) => {
            input.value = e.target.value
            if (input.value.includes(',')) {
                let vergul = input.value.indexOf(',')
                input.value = input.value.slice(0, vergul) + '.'
            }
            answer.innerHTML = input.value * data.rates[pul2]
            if (answer.innerHTML == 'NaN') {
                answer.innerHTML = ''
            }
        })
        info1.innerHTML = `1 ${pul1} = ` + data.rates[pul2] + ` ${pul2}`
    })
fetch(`https://api.exchangerate.host/latest?base=${pul2}&symbols=${pul1}`)
    .then(res => res.json())
    .then(data =>
        info2.innerHTML = `1 ${pul2} = ` + data.rates[pul1] + ` ${pul1}`
    )


leftbuttons.forEach(item => {
    item.addEventListener('click', (e) => {
        leftbuttons.forEach(button => {
            button.className = 'normal'
        })
        e.target.className = 'active'
        pul1 = item.innerHTML
        fetch(`https://api.exchangerate.host/latest?base=${pul1}&symbols=${pul2}`)
            .then(res => res.json())
            .then(data => {
                input.addEventListener('keyup', () => {
                    answer.innerHTML = input.value * data.rates[pul2]
                })
                answer.innerHTML = input.value * data.rates[pul2]
                info1.innerHTML = `1 ${pul1} = ` + data.rates[pul2] + ` ${pul2}`
            })
        fetch(`https://api.exchangerate.host/latest?base=${pul2}&symbols=${pul1}`)
            .then(res => res.json())
            .then(data => {
                info2.innerHTML = `1 ${pul2} = ` + data.rates[pul1] + ` ${pul1}`
            })
    })
})
rightbuttons.forEach(item => {
    item.addEventListener('click', (e) => {
        rightbuttons.forEach(button => {
            button.className = 'normal'
        })
        e.target.className = 'active'
        pul2 = item.innerHTML
        fetch(`https://api.exchangerate.host/latest?base=${pul1}&symbols=${pul2}`)
            .then(res => res.json())
            .then(data => {
                input.addEventListener('keyup', (e) => {
                    input.value = e.target.value
                    answer.innerHTML = input.value * data.rates[pul2]
                })
                info1.innerHTML = `1 ${pul1} = ` + data.rates[pul2] + ` ${pul2}`
                answer.innerHTML = input.value * data.rates[pul2]
            })
        fetch(`https://api.exchangerate.host/latest?base=${pul2}&symbols=${pul1}`)
            .then(res => res.json())
            .then(data => {
                info2.innerHTML = `1 ${pul2} = ` + data.rates[pul1] + ` ${pul1}`
            })
    })
})
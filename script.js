const mlmt1 = document.querySelector('.left .info')
const mlmt2 = document.querySelector('.rigth .info')
const input = document.querySelector('input')
const answer = document.querySelector('.answer')
const lftbtn = document.querySelectorAll('.left button')
const rigbtn = document.querySelectorAll('.rigth button')

let mon1 = 'RUB'
let mon2 = 'USD'

fetch(`https://api.exchangerate.host/latest?base=${mon1}&symbols=${mon2}`)
    .then(res => res.json())
    .then(data => {
        input.addEventListener('keyup', (e) => {
            input.value = e.target.value
            if (input.value.includes(',')) {
                let vergul = input.value.indexOf(',')
                input.value = input.value.slice(0, vergul) + '.'
            }
            answer.innerHTML = input.value * data.rates[mon2]
            if (answer.innerHTML == 'NaN') {
                answer.innerHTML = ''
            }
        })
        mlmt1.innerHTML = `1 ${mon1} = ` + data.rates[mon2] + ` ${mon2}`
    })
fetch(`https://api.exchangerate.host/latest?base=${mon2}&symbols=${mon1}`)
    .then(res => res.json())
    .then(data =>
        mlmt2.innerHTML = `1 ${mon2} = ` + data.rates[mon1] + ` ${mon1}`
    )


lftbtn.forEach(item => {
    item.addEventListener('click', (e) => {
        lftbtn.forEach(button => {
            button.className = 'normal'
        })
        e.target.className = 'active'
        mon1 = item.innerHTML
        fetch(`https://api.exchangerate.host/latest?base=${mon1}&symbols=${mon2}`)
            .then(res => res.json())
            .then(data => {
                input.addEventListener('keyup', () => {
                    answer.innerHTML = input.value * data.rates[mon2]
                })
                answer.innerHTML = input.value * data.rates[mon2]
                mlmt1.innerHTML = `1 ${mon1} = ` + data.rates[mon2] + ` ${mon2}`
            })
        fetch(`https://api.exchangerate.host/latest?base=${mon2}&symbols=${mon1}`)
            .then(res => res.json())
            .then(data => {
                mlmt2.innerHTML = `1 ${mon2} = ` + data.rates[mon1] + ` ${mon1}`
            })
    })
})
rigbtn.forEach(item => {
    item.addEventListener('click', (e) => {
        rigbtn.forEach(button => {
            button.className = 'normal'
        })
        e.target.className = 'active'
        mon2 = item.innerHTML
        fetch(`https://api.exchangerate.host/latest?base=${mon1}&symbols=${mon2}`)
            .then(res => res.json())
            .then(data => {
                input.addEventListener('keyup', (e) => {
                    input.value = e.target.value
                    answer.innerHTML = input.value * data.rates[mon2]
                })
                mlmt1.innerHTML = `1 ${mon1} = ` + data.rates[mon2] + ` ${mon2}`
                answer.innerHTML = input.value * data.rates[mon2]
            })
        fetch(`https://api.exchangerate.host/latest?base=${mon2}&symbols=${mon1}`)
            .then(res => res.json())
            .then(data => {
                mlmt2.innerHTML = `1 ${mon2} = ` + data.rates[mon1] + ` ${mon1}`
            })
    })
})

'use strict'

import { listarUsuarios, pegarIdUsuario, cadastrarUsuario } from './funcoes-api.js'

const olho = document.getElementById('olho')
const inputSenha = document.getElementById('password')
const botaoCadastro = document.getElementById('botao')
let boolean = false 

olho.addEventListener('click', () => {

    if(boolean == true){
        olho.src = '../img/svg/olho.svg'
        boolean = false
        inputSenha.type = 'password'
    }
    else {
        olho.src = '../img/svg/olho-fechado.svg'
        boolean = true
        inputSenha.type = 'text'
    }


})

const cadastrar = async() => {
 
    const email = document.getElementById('email').value
    const senha = document.getElementById('password').value
    const nome = document.getElementById('name').value

    let validacaoEmail, validacaoSenha, usuarioJSON = {}

    const usuarios = await listarUsuarios()

    if(email != '' && senha != '' && nome != '' && email.includes('@')){

        usuarios.usuarios.forEach(usuario => {
    
            if(email.toUpperCase() == usuario.email.toUpperCase()){

                alert('Email já cadastrado')
                
            } else {

                validacaoEmail = usuario.email
                validacaoSenha = usuario.senha
                
                usuarioJSON.nome = nome
                usuarioJSON.email = email
                usuarioJSON.senha = senha
                
            }

        })

        await cadastrarUsuario(usuarioJSON)
        let id = await pegarIdUsuario(email)
        localStorage.setItem('usuarioID', id.id)   
        window.location.href = './tarefas.html'

    }

}

botaoCadastro.addEventListener('click', cadastrar)
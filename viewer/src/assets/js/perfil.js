'use strict'

import { pegarUsuario, atualizarUsuario } from './funcoes-api.js'

const olho = document.getElementById('olho')
const inputSenha = document.getElementById('password')
const inputNome = document.getElementById('name')
const inputEmail = document.getElementById('email')
const inputFoto = document.getElementById('foto-perfil')
const imagemLabel = document.getElementById('imagem')
const botaoVoltar = document.getElementById('voltar')
const botaoSair = document.getElementById('sair')
const botaoSalvar = document.getElementById('salvar')
const id = localStorage.getItem('usuarioID')
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

inputFoto.addEventListener('change', async() => {

    let file = inputFoto.files[0]
    
    if (file) {

        const reader = new FileReader();
    
        reader.addEventListener('load', (e) => {
            const readerTarget = e.target

            localStorage.setItem('imagem', readerTarget.result)
            imagemLabel.style.backgroundImage = `url(${localStorage.getItem('imagem')})`

            if(imagemLabel.children[0].classList.contains('hidden') == false)
                imagemLabel.children[0].classList.add('hidden') 
            
        })
    
    reader.readAsDataURL(file);

    }

})

const montarPerfil = (usuario) => {

    inputNome.value = usuario.nome
    inputEmail.value = usuario.email
    inputSenha.value = usuario.senha

}

botaoVoltar.addEventListener('click', () => {

    window.location.href = './tarefas.html'

})

botaoSair.addEventListener('click', () => {

    window.location.href = '../../index.html'

})

botaoSalvar.addEventListener('click', async() => {

    let novoUsuario = {
        id: id,
        nome:  inputNome.value,
        email: inputEmail.value,
        senha: inputSenha.value
    }

    atualizarUsuario(novoUsuario)
   
    let usuario = await pegarUsuario(id)
    montarPerfil(usuario.usuario[0])

})

window.addEventListener('load', async() => {

    let usuario = await pegarUsuario(id)

    montarPerfil(usuario.usuario[0])

    if(localStorage.getItem('imagem')){
        
        imagemLabel.style.backgroundImage = `url(${localStorage.getItem('imagem')})`

        if(imagemLabel.children[0].classList.contains('hidden') == false)
            imagemLabel.children[0].classList.add('hidden') 
    
    }

})

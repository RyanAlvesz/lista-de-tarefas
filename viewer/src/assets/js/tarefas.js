'use strict'

import {tarefasUsuario, tarefasUsuarioNaoConcluidas, selecionarTarefa, concluirTarefa, tarefaNaoConcluida, atualizarTarefa, removerTarefa, criarTarefa} from './funcoes-api.js'

const containerTarefas = document.getElementById('container-tarefas')
const botaoConcluido = document.getElementById('concluido')
const audio = document.getElementById('audio')
const idUsuario = localStorage.getItem('usuarioID')
let concluido

const resetarContainerTarefas = () => {

    let botaoCriarTarefa = document.createElement('button')
    botaoCriarTarefa.classList.add('flex', 'items-center', 'justify-center', 'rounded-md', 'bg-azulclaro/30', 'h-[24vh]', 'w-full', 'tarefas', 'hover:bg-azulclaro/60', 'ease-linear', 'duration-150')
    botaoCriarTarefa.id = 'adicionar-tarefa'

    let imgCriarTarefa = document.createElement('img')
    imgCriarTarefa.classList.add('h-3/5', 'w-3/5', 'pointer-events-none', 'select-none', 'max-md:h-4/5', 'max-md:w-4/5')
    imgCriarTarefa.src = '../img/svg/adicionar.svg'
    imgCriarTarefa.alt = 'Mais'

    botaoCriarTarefa.addEventListener('click', montarFormulario)
    botaoCriarTarefa.appendChild(imgCriarTarefa)

    containerTarefas.replaceChildren('')
    containerTarefas.appendChild(botaoCriarTarefa)

}

const criarFormularioMontarTarefa = () => {

    let criarTarefaForm = document.createElement('form')
    criarTarefaForm.classList.add('h-2/4', 'w-2/4', 'rounded-md', 'bg-azulclaro', 'm-auto', 'inset-0', 'flex', 'flex-col', 'px-5', 'py-1', 'max-md:w-full', 'max-md:h-[100vh]', 'fixed', 'max-md:rounded-none', 'z-20', 'fundo-tarefa')

    let containerSuperior = document.createElement('div')
    containerSuperior.classList.add('h-1/5', 'max-md:h-[18vh]', 'w-full', 'flex', 'items-center', 'justify-center', 'relative', 'Formulario')

    let titulo = document.createElement('input')
    titulo.classList.add('bg-transparent', 'text-white', 'placeholder:text-white', 'focus:outline-none', 'placeholder:text-3xl', 'placeholder:font-semibold', 'placeholder:drop-shadow-[-1px_1px_0px_#333d55]', 'text-3xl', 'font-semibold', 'drop-shadow-[-1px_1px_0px_#333d55]', 'placeholder:text-black', 'w-full', 'h-full', 'Formulario')
    titulo.placeholder = 'Título da tarefa'
    titulo.setAttribute('name', 'title')
    titulo.setAttribute('type', 'text')
    titulo.id = 'title'

    let botaoFechar = document.createElement('button')
    botaoFechar.classList.add('items-center', 'justify-center', 'h-2/5', 'max-md:h-1/4', 'flex', 'right-0')
    botaoFechar.setAttribute('type', 'button')

    let imagemFechar = document.createElement('img')
    imagemFechar.src = '../img/svg/x.svg'
    imagemFechar.alt = 'Fechar'
    imagemFechar.classList.add('h-full', 'w-full')

    let descricao = document.createElement('textarea')
    descricao.classList.add('grow', 'bg-white/50', 'rounded-lg', 'border-[1px]', 'border-azulmedio', 'px-3', 'py-2', 'focus:outline-none', 'placeholder:font-bold', 'placeholder:text-slate-700', 'font-bold', 'text-slate-700', 'resize-none', 'max-md:rounded-lg', 'max-md:border-none', 'Formulario')
    descricao.placeholder = 'Descrição...'
    descricao.id = 'description'

    let divBotao = document.createElement('div')
    divBotao.classList.add('h-1/6', 'flex', 'justify-end', 'max-md:h-[13vh]', 'Formulario')

    let botaoSalvar = document.createElement('button')
    botaoSalvar.classList.add('h-full', 'Formulario')
    botaoSalvar.setAttribute('type', 'button')
    botaoSalvar.addEventListener('click', async () => {

        if(descricao.value != ''){
            
            let tituloValue
    
            if (titulo.value == '') 
                tituloValue = `Tarefa sem título`
            else 
                tituloValue = titulo.value
    
            let tarefa = {
    
                idUsuario: idUsuario,
                titulo: tituloValue,
                descricao: descricao.value,
    
            }
    
            await criarTarefa(tarefa)
        
        }

        containerTarefas.removeChild(criarTarefaForm)
        let botaoAdicionarTarefa = containerTarefas.children[0]
        botaoAdicionarTarefa.classList.remove('pointer-events-none')
        montarTarefas()

    })

    let imagemSalvar = document.createElement('img')
    imagemSalvar.src = '../img/svg/salvar.svg'
    imagemSalvar.alt = 'Salvar'
    imagemSalvar.classList.add('h-3/5', 'Formulario')

    criarTarefaForm.replaceChildren(containerSuperior, descricao, divBotao)
    containerSuperior.replaceChildren(titulo, botaoFechar)
    botaoFechar.appendChild(imagemFechar)
    divBotao.appendChild(botaoSalvar)
    botaoSalvar.appendChild(imagemSalvar)

    return criarTarefaForm

}

const criarFormularioMontarTarefaPreenchido = (tarefa) => {

    let criarTarefa = document.createElement('form')
    criarTarefa.classList.add('h-2/4', 'w-2/4', 'rounded-md', 'bg-azulclaro', 'm-auto', 'inset-0', 'flex', 'flex-col', 'px-5', 'py-1', 'max-md:w-full', 'max-md:h-[100vh]', 'fixed', 'max-md:rounded-none', 'z-20', 'fundo-tarefa')

    let containerSuperior = document.createElement('div')
    containerSuperior.classList.add('h-1/5', 'max-md:h-[18vh]', 'w-full', 'flex', 'items-center', 'justify-center', 'relative', 'Formulario')

    let titulo = document.createElement('input')
    titulo.classList.add('bg-transparent', 'text-white', 'placeholder:text-white', 'focus:outline-none', 'placeholder:text-3xl', 'placeholder:font-semibold', 'placeholder:drop-shadow-[-1px_1px_0px_#333d55]', 'text-3xl', 'font-semibold', 'drop-shadow-[-1px_1px_0px_#333d55]', 'placeholder:text-black', 'w-full', 'h-full', 'Formulario')
    titulo.placeholder = 'Título da tarefa'
    titulo.setAttribute('name', 'title')
    titulo.setAttribute('type', 'text')
    titulo.id = 'title'
    titulo.value = tarefa.titulo

    let botaoFechar = document.createElement('button')
    botaoFechar.classList.add('items-center', 'justify-center', 'h-2/5', 'max-md:h-1/4', 'flex', 'right-0')
    botaoFechar.setAttribute('type', 'button')

    let imagemFechar = document.createElement('img')
    imagemFechar.src = '../img/svg/x.svg'
    imagemFechar.alt = 'Fechar'
    imagemFechar.classList.add('h-full', 'w-full')

    let descricao = document.createElement('textarea')
    descricao.classList.add('grow', 'bg-white/50', 'rounded-lg', 'border-[1px]', 'border-azulmedio', 'px-3', 'py-2', 'focus:outline-none', 'placeholder:font-bold', 'placeholder:text-slate-700', 'font-bold', 'text-slate-700', 'resize-none', 'max-md:rounded-lg', 'max-md:border-none', 'Formulario')
    descricao.placeholder = 'Descrição...'
    descricao.id = 'description'
    descricao.textContent = tarefa.descricao

    let divBotao = document.createElement('div')
    divBotao.classList.add('h-1/6', 'flex', 'justify-end', 'max-md:h-[13vh]', 'Formulario')

    let botaoSalvar = document.createElement('button')
    botaoSalvar.classList.add('h-full', 'Formulario')
    botaoSalvar.setAttribute('type', 'button')
    botaoSalvar.addEventListener('click', async() => {

        let tituloValue

        if (titulo.value == '') 
            tituloValue = `Tarefa sem título`
        else 
            tituloValue = titulo.value

        let tarefaAtualizada = {

            id: tarefa.id,
            titulo: tituloValue,
            descricao: descricao.value,
            concluido: tarefa.concluido

        }
        
        containerTarefas.removeChild(criarTarefa)
        let botaoAdicionarTarefa = containerTarefas.children[0]
        botaoAdicionarTarefa.classList.remove('pointer-events-none')
        await atualizarTarefa(tarefaAtualizada, idUsuario)
        montarTarefas()

    })

    let imagemSalvar = document.createElement('img')
    imagemSalvar.src = '../img/svg/salvar.svg'
    imagemSalvar.alt = 'Salvar'
    imagemSalvar.classList.add('h-3/5', 'Formulario')

    criarTarefa.replaceChildren(containerSuperior, descricao, divBotao)
    containerSuperior.replaceChildren(titulo, botaoFechar)
    botaoFechar.appendChild(imagemFechar)
    divBotao.appendChild(botaoSalvar)
    botaoSalvar.appendChild(imagemSalvar)

    return criarTarefa

}

const criarTarefas = (arrayTarefas) => {

    arrayTarefas.forEach((tarefa) => {

        let divTarefa = document.createElement('div')
        divTarefa.classList.add('flex', 'flex-col', 'h-[24vh]', 'bg-azulclaro/30', 'rounded-md', 'p-4', 'gap-3', 'tarefas', 'hover:bg-azulclaro/60', 'ease-linear', 'duration-150', 'max-md:p-2', 'max-md:gap-1', 'max-md:w-full', 'animate-aparecer')

        let containerTop = document.createElement('div')
        containerTop.classList.add('flex', 'justify-between')

        let tituloTarefa = document.createElement('h3')
        tituloTarefa.classList.add('font-semibold', 'text-2xl', 'max-md:text-lg')
        tituloTarefa.textContent = tarefa.titulo

        let containerOpcoes = document.createElement('div')
        containerOpcoes.classList.add('overflow-hidden', 'cursor-pointer', 'relative', 'flex', 'items-center', 'justify-center')

        let imgOpcoes = document.createElement('img')
        imgOpcoes.classList.add('w-8', 'h-8', 'max-md:w-6', 'max-md:h-6')
        imgOpcoes.src = '../img/svg/pontos.svg'
        imgOpcoes.alt = '3 pontos na horizontal'

        let opcoes = document.createElement('div')
        opcoes.classList.add('absolute', 'top-[100%]', 'right-0', 'w-fit', 'py-1', 'bg-azulbonito', 'rounded-lg', 'rounded-tr-none')

        let botaoEditar = document.createElement('button')
        botaoEditar.classList.add('text-white', 'px-4', 'flex', 'items-center', 'justify-center', 'text-end', 'w-full', 'font-medium', 'border-b-azulclaro', 'border-b-[1px]', 'hover:text-black', 'editar')

        let editar = document.createElement('span')
        editar.classList.add('editar')
        editar.textContent = 'Editar'

        let botaoExcluir = document.createElement('button')
        botaoExcluir.classList.add('text-white', 'px-4', 'flex', 'items-center', 'justify-center', 'text-end', 'w-full', 'font-medium', 'hover:text-black')

        let excluir = document.createElement('span')
        excluir.textContent = 'Excluir'

        let descricaoTarefa = document.createElement('p')
        descricaoTarefa.classList.add('text-xl', 'grow', 'max-md:text-base')
        descricaoTarefa.textContent = tarefa.descricao

        let divBotaoSalvar = document.createElement('div')
        divBotaoSalvar.classList.add('w-full', 'flex', 'gap-2', 'items-center', 'justify-end')

        let inputConcluido = document.createElement('input')
        inputConcluido.classList.add('hidden', 'concluido')
        inputConcluido.setAttribute('type', 'checkbox')
        inputConcluido.id = `conclusão-${tarefa.id}`

        if (tarefa.concluido == true) {
            inputConcluido.checked = true
            tituloTarefa.classList.add('line-through')
            descricaoTarefa.classList.add('line-through')
            divTarefa.classList.add('bg-azulclaro/60')
        }

        let labelConcluido = document.createElement('label')
        labelConcluido.classList.add('cursor-pointer', 'relative', "before:content-['']", 'before:absolute', 'before:-left-[120px]', 'before:top-0', 'before:bottom-0', 'before:right-0', 'before:m-auto', 'before:w-4', 'before:h-4', 'before:rounded', 'before:border-[1px]', 'before:border-solid', 'before:border-black', 'before:inline-block', 'max-md:before:w-3', 'max-md:before:h-3', 'max-md:before:-left-[125%]')
        labelConcluido.htmlFor = `conclusão-${tarefa.id}`

        let spanConcluido = document.createElement('span')
        spanConcluido.classList.add('text-lg', 'select-none', 'max-md:text-sm')
        spanConcluido.textContent = 'Concluído'

        containerOpcoes.addEventListener('click', () => {

            containerOpcoes.classList.toggle('overflow-hidden')

        })

        containerOpcoes.addEventListener('mouseleave', () => {
            containerOpcoes.classList.add('overflow-hidden')
        })

        labelConcluido.addEventListener('click', () => {

            if (inputConcluido.checked == false) {

                tituloTarefa.classList.add('line-through')
                descricaoTarefa.classList.add('line-through')
                divTarefa.classList.add('bg-azulclaro/60')

                concluirTarefa(tarefa.id, idUsuario)

            } else {

                tituloTarefa.classList.remove('line-through')
                descricaoTarefa.classList.remove('line-through')
                divTarefa.classList.remove('bg-azulclaro/60')

                tarefaNaoConcluida(tarefa.id, idUsuario)

            }

        })

        botaoExcluir.addEventListener('click', async() => {

            await removerTarefa(tarefa.id, idUsuario)  
            montarTarefas()

        })

        botaoEditar.addEventListener('click', () => {

            montarFormularioPreenchido(tarefa.id)

        })

        divTarefa.replaceChildren(containerTop, descricaoTarefa, divBotaoSalvar)
        containerTop.replaceChildren(tituloTarefa, containerOpcoes)
        containerOpcoes.replaceChildren(imgOpcoes, opcoes)
        opcoes.replaceChildren(botaoEditar, botaoExcluir)
        botaoEditar.appendChild(editar)
        botaoExcluir.appendChild(excluir)
        divBotaoSalvar.replaceChildren(inputConcluido, labelConcluido)
        labelConcluido.appendChild(spanConcluido)

        let botaoAdicionarTarefa = containerTarefas.children[0]
        botaoAdicionarTarefa.insertAdjacentElement('afterend', divTarefa)

    })

}

const montarFormularioPreenchido = async(idTarefa) => {

    let tarefa = await selecionarTarefa(idTarefa, idUsuario)

    let botaoAdicionarTarefa = containerTarefas.children[0]

    if (!botaoAdicionarTarefa.classList.contains('pointer-events-none')) {
        botaoAdicionarTarefa.classList.add('pointer-events-none')
    }

    let formularioTarefa = criarFormularioMontarTarefaPreenchido(tarefa.tarefa[0])

    containerTarefas.insertAdjacentElement('beforeend', formularioTarefa)

    window.addEventListener('click', (e) => {

        if (!e.target.classList.contains('Formulario') && e.target.id != 'adicionar-tarefa' && !e.target.classList.contains('editar')) {

            if (containerTarefas.lastChild == formularioTarefa) {
                containerTarefas.removeChild(formularioTarefa)
                botaoAdicionarTarefa.classList.remove('pointer-events-none')
            }

        }

    })


}

const montarFormulario = () => {

    let botaoAdicionarTarefa = containerTarefas.children[0]

    if (!botaoAdicionarTarefa.classList.contains('pointer-events-none')) {
        botaoAdicionarTarefa.classList.add('pointer-events-none')
    }

    let formularioTarefa = criarFormularioMontarTarefa()

    containerTarefas.insertAdjacentElement('beforeend', formularioTarefa)

    window.addEventListener('click', (e) => {

        if (!e.target.classList.contains('Formulario') && e.target.id != 'adicionar-tarefa' && !e.target.classList.contains('editar')) {

            if (containerTarefas.lastChild == formularioTarefa) {
                containerTarefas.removeChild(formularioTarefa)
                botaoAdicionarTarefa.classList.remove('pointer-events-none')
            }

        }

        if (e.target.nodeName == 'BUTTON') {
            audio.play()
        }

    })

}

const montarTarefas = async() => {

    let arrayTarefas = await tarefasUsuario(idUsuario)
    let arrayTarefasNaoConcluidas = await tarefasUsuarioNaoConcluidas(idUsuario)

    resetarContainerTarefas()

    if (localStorage.getItem('concluido')) {

        concluido = localStorage.getItem('concluido')

        if (concluido == 'true' ) {

            botaoConcluido.checked = true
            
            if(arrayTarefasNaoConcluidas.status != false)
                criarTarefas(arrayTarefasNaoConcluidas.tarefas)

        } else {

            if(arrayTarefas.status != false)
                criarTarefas(arrayTarefas.tarefas)

        }

    } else {

        concluido = false
        localStorage.setItem('concluido', false)

        if(arrayTarefas.status != false){
            resetarContainerTarefas()
            criarTarefas(tarefas)
        }

    }

}

botaoConcluido.addEventListener('click', (e) => {

    if (e.target.checked) {
        localStorage.setItem('concluido', true)
        montarTarefas()
    } else {
        localStorage.setItem('concluido', false)
        montarTarefas()
    }

})

window.onload = () => {
    montarTarefas()
}

// DOM criado com Javascript

/* 
<button id="adicionar-tarefa" class="flex items-center justify-center rounded-md bg-azulclaro/30 h-[24vh] w-full tarefas hover:bg-azulclaro/60 ease-linear duration-150">
    <img src="../img/svg/adicionar.svg" alt="Mais" class="h-3/5 w-3/5 pointer-events-none select-none max-md:h-4/5 max-md:w-4/5">
</button> 
*/

/*
<form action="" class="absolute h-4/5 w-3/5 rounded-md bg-azulclaro m-auto inset-0 flex flex-col px-5 py-1 max-md:w-full max-md:h-[100vh] max-md:fixed max-md:rounded-none z-20">
    <div class="h-1/5 max-md:h-[18vh] w-full flex items-center justify-center relative">
        <input type="text" name="title" id="title" placeholder="Título da tarefa" class="bg-transparent focus:outline-none placeholder:text-3xl placeholder:font-semibold placeholder:drop-shadow-[2px_2px_1px_#C6C6C6] text-3xl font-semibold drop-shadow-[2px_2px_1px_#C6C6C6] placeholder:text-black w-full h-full">
        <button class="absolute items-center justify-center bg-azulclaro h-2/5 max-md:h-1/4 flex right-0">
            <img src="../img/svg/x.svg" alt="Fechar" class="h-full w-full">
        </button>
    </div>
    <textarea id="text" placeholder="Descrição..." class="grow bg-white/70 rounded-lg border-[1px] border-azulmedio px-3 py-2 focus:outline-none placeholder:font-bold placeholder:text-slate-700 font-bold text-slate-700 resize-none max-md:rounded-none"></textarea>
    <div class="h-1/6 flex justify-end max-md:h-[13vh]">
        <button class="h-full">
            <img src="../img/svg/salvar.svg" alt="Salvar" class="h-3/5">
        </button>
    </div>
</form> 
*/

/* 
<div class="flex flex-col h-[24vh] bg-azulclaro/30 rounded-md p-4 gap-3 tarefas hover:bg-azulclaro/50 ease-linear duration-150 max-md:h-[18vh] max-md:p-2 max-md:gap-1">
    <div class="flex justify-between">
        <h3 class="font-semibold text-2xl max-md:text-lg">Fazer compras</h3>
        <div class="opcoes overflow-hidden cursor-pointer relative flex items-center justify-center">
            <img src="../img/svg/pontos.svg" alt="3 pontos na horizontal" class="w-8 h-8 max-md:w-6 max-md:h-6">
            <div class="absolute top-[100%] right-0 w-fit py-1 bg-azulbonito/50 rounded-lg rounded-tr-none">
                <button class="text-white px-4 flex items-center justify-center text-end w-full font-medium border-b-azulbonito border-b-[1px] hover:text-azulescuro">
                    <span>
                        Editar
                    </span>
                </button>
                <button class="text-white px-4 flex items-center justify-center text-end w-full font-medium hover:text-azulescuro">
                    <span>
                        Excluir
                    </span>
                </button>
            </div>
        </div>
    </div>
    <p class="text-xl grow max-md:text-base">
        Ir no mercado e comprar sorvete
    </p>

    <div class="w-full flex gap-2 items-center justify-end">
        <input type="checkbox" class="hidden concluido" id="conclusao">
        <label for="conclusao" class="cursor-pointer relative before:content-[''] before:absolute before:-left-[22px] before:top-[5px] before:w-4 before:h-4 before:rounded
                                    before:border-[1px] before:border-solid before:border-black before:inline-block max-md:before:w-3 max-md:before:h-3 max-md:before:-left-[16px]">
            <span class="text-lg max-md:text-sm select-none"> Concluído </span>
        </label>
    </div>
</div>
*/
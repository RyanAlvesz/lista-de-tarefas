'use strict'

// Funções - Usuário

const listarUsuarios = async() => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/usuarios/`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }  

} // GET

const pegarIdUsuario = async(email) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/usuarios/id/${email}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }

} //GET

const pegarUsuario = async(id) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/usuarios/${id}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    } 

} //GET

const atualizarUsuario = async(usuario) => {
    
    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/usuario/atualizar`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha
            })
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }  

} //UPDATE

const cadastrarUsuario = async(usuario) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/criar-usuario`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha
            })
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }   

} //POST




// Funções - Tarefas

const tarefasUsuario = async(id) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/tarefas/${id}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }


} //GET

const tarefasUsuarioNaoConcluidas = async(id) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/tarefas/nao-concluidas/${id}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const response = await fetch(url, options)
        const data = response.json()
        return data
                
    } catch (error) {

        return false
        
    }

} //GET

const selecionarTarefa = async(idTarefa, idUsuario) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/tarefa/?idTarefa=${idTarefa}&idUsuario=${idUsuario}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }

} //GET

const concluirTarefa = async(idTarefa, idUsuario) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/tarefa/concluir/?idTarefa=${idTarefa}&idUsuario=${idUsuario}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }  

} //UPDATE

const tarefaNaoConcluida = async(idTarefa, idUsuario) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/tarefa/nao-concluir/?idTarefa=${idTarefa}&idUsuario=${idUsuario}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }  

} //UPDATE

const atualizarTarefa = async(tarefa, idUsuario) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/tarefa/atualizar/?idTarefa=${tarefa.id}&idUsuario=${idUsuario}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: tarefa.titulo,
                descricao: tarefa.descricao
            })
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }  

} //UPDATE

const removerTarefa = async(idTarefa, idUsuario) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/tarefa/excluir/?idTarefa=${idTarefa}&idUsuario=${idUsuario}`
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }


} //DELETE

const criarTarefa = async(tarefa) => {

    try {
        
        const url = `http://localhost:8080/v1/lista-de-tarefas/criar-tarefa/${tarefa.idUsuario}`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: tarefa.titulo,
                descricao: tarefa.descricao
            })
        }
        const response = await fetch(url, options)
        const data = response.json()
        return data
        
    } catch (error) {

        return false
        
    }   

} //POST

export {
    listarUsuarios,
    pegarIdUsuario,
    cadastrarUsuario,
    pegarUsuario,
    atualizarUsuario,
    tarefasUsuario,
    tarefasUsuarioNaoConcluidas,
    concluirTarefa,
    tarefaNaoConcluida,
    removerTarefa,
    selecionarTarefa,
    criarTarefa,
    atualizarTarefa
}
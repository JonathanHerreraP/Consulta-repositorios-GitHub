const baseUrl = "https://api.github.com/users"






const botonagregar = document.getElementById("boton")
botonagregar.addEventListener("click", (event)=>{
    event.preventDefault()
    const nombre = document.getElementById("nombre").value
    const pagina = document.getElementById("pagina").value
    const cantidadRepo = document.getElementById("repoPagina").value

    const request = async (url)=>{
        const results = await fetch(url)
        const response = await results.json()
        /* console.log(response) */
        return response
    }
    request()

    const getUser =async (nombre)=>{
        const url = `${baseUrl}/${nombre}`
        return request(url)
    }
    
    const getRepo =async (pagina, cantidadRepo) => {
        const url = `${baseUrl}/${nombre}/repos?page=${pagina}&per_page=${cantidadRepo}`
        return request(url)
    }

    Promise.all ([getUser(nombre), getRepo(pagina,cantidadRepo)])
.then(resp=>{
   
    const user = resp[0]
    const repos = resp[1]

    let imagenusuario = document.getElementById("imagen")
    imagenusuario.setAttribute("src", user.avatar_url)

    let datosUsuario = document.getElementById("resultadonombre")
    datosUsuario.innerHTML = `Nombre de usuario: ${user.name}<br>Nombre de login: ${user.login}<br>Cantidad de repositorios: ${user.public_repos}<br>Localidad: ${user.location}<br>Tipo de usuario: ${user.type} `
    console.log(user)

    let datosRepos = document.getElementById("resultadorepos")
    repos.forEach(repositorio => {
        datosRepos.innerHTML+=`<a href="${repositorio.html_url}">${repositorio.name}</a><br>`
        console.log(repositorio)
        
    });
   
})
.catch(err => 
    err= alert("El usuario no existe"))
    /* console.log("El Usuario no existe", err)) */
    



})



/* const nombre = "DesafioLatam"
const pagina = 1
const cantidadRepo = 2 */


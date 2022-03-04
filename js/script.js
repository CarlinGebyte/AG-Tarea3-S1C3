let formulario = document.getElementById('formulario');
let citas = [];

formulario.addEventListener('submit', e => {
    e.preventDefault();
    capturarDatos();
})

const capturarDatos = () => {
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let sintomas = document.getElementById('sintomas').value;
    
    
    if (hora !== "" && fecha !== "" && hora !== "" && sintomas !== ""){
        let registrarCita = {
            id: Math.round(Math.random()*(100-1)+1),
            nombre: nombre,
            fecha: fecha,
            hora: hora,
            sintomas: sintomas
        };

        console.log(registrarCita);


        const key = JSON.parse(localStorage.getItem('citas'));

        if (key !== null) {
            key.unshift(registrarCita);
            localStorage.setItem('citas', JSON.stringify(key));
        } else {
            citas.unshift(registrarCita);
            localStorage.setItem('citas', JSON.stringify(citas));
        }
        getLocalStorage()
    } else {
        alert("Por favor rellene todos los campos");
        document.getElementById('formulario').reset();
    }
}

// list items

let table = document.getElementById('listarCita');

const getLocalStorage = () => {
    table.innerHTML = "";
    console.log(table);
    
    let getSchedules = JSON.parse(localStorage.getItem('citas'));
    console.log(getSchedules);
    
    if (getSchedules != undefined){
        getSchedules.map(schedule => {
            const {id, nombre, fecha, hora, sintomas} = schedule;
            table.innerHTML += ` <tr>
                <td>${nombre}</td>
                <td>${fecha}</td>
                <td>${hora}</td>
                <td>${sintomas}</td>
                <td><button class="btn btn-danger" id="${id}">Boton</button></td>
                </tr>
            `;        

        });
    }
}

// Cargar el DOM

document.addEventListener('DOMContentLoaded', getLocalStorage);

// Funcionalidad al boton de eliminar

table.addEventListener('click', e => {
    const buttonDelete = e.target.classList.contains('btn-danger');
    const id = e.target.id;
    console.log(e);
    
    const local = JSON.parse(localStorage.getItem('citas'));
    const search = local.find(data => data.id === Number(id));
    
    if (buttonDelete) {
        local.forEach((element, index) => {
            if (element.id === search.id) {
                local.splice(index, 1);
                localStorage.setItem('citas', JSON.stringify(local));
                getLocalStorage()
            }
        })
    }
})

// 5. búsqueda por nombre

let findByName = document.getElementById('btnBuscar');
let inputSearch = document.getElementById('busqueda');

findByName.addEventListener('click', e => {
    e.preventDefault();
    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('citas'));
    if (data !== null){
        let filtro = data.filter(datos => datos.nombre.toLowerCase().includes(input.toLowerCase()));
        console.log(filtro);

        inputSearch.innerHTML = "";

        filtro.length === 0? 
            inputSearch.innerHTML += `<div>El nombre ${input} no existe</div>`
            : 
            filtro.map(schedule => {
            const {nombre, fecha, hora, sintomas} = schedule;

            inputSearch.innerHTML += `
                <div>
                <div>
                    <h1>${nombre}</h1>
                </div>
                <div>
                    <h3>${fecha}</h3>
                    <h3>${hora}</h3>
                </div>
                    <h3>${sintomas}</h3>
                </div>
            `;
    });   
    }
});


// boton limpiar

const btnClean = document.getElementById('limpiar');


btnClean.addEventListener('click', e => {    
    e.preventDefault();
    document.getElementById('formulario').reset();
    
})
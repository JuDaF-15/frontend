import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import HomeAdmin from "../components/HomeAdmin.vue"
import Conductores from "../components/Conductores.vue"
import Vehiculos from "../components/Vehiculos.vue"
import Rutas from "../components/Rutas.vue"
import Vendedores from "../components/Vendedores.vue"
import Clientes from "../components/Clientes.vue"
import Tiquetes from "../components/Tiquetes.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/menuAdmin", component: Header, children: [
            { path: "/homeAdmin", component: HomeAdmin },
            { path: "/conductores", component: Conductores },
            { path: "/vehiculos", component: Vehiculos },
            { path: "/rutas", component: Rutas },
            { path: "/vendedores", component: Vendedores },
            { path: "/clientes", component: Clientes },
            { path: "/tiquetes", component: Tiquetes },
        ]
    },
    
]
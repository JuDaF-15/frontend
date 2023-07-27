import Login from "../components/Login.vue"
import Header from "../components/Header.vue"
import HeaderVen from "../components/HeaderVen.vue"
import HomeAdmin from "../components/HomeAdmin.vue"
import Conductores from "../components/Conductores.vue"
import Busetas from "../components/Busetas.vue"
import Rutas from "../components/Rutas.vue"
import Vendedores from "../components/Vendedores.vue"
import Clientes from "../components/Clientes.vue"
import Tiquetes from "../components/Tiquetes.vue"
import HomeVen from "../components/HomeVen.vue"

export const routes = [
    { path: "/", component: Login },
    {
        path: "/menuAdmin", component: Header, children: [
            { path: "/homeAdmin", component: HomeAdmin },
            { path: "/conductores", component: Conductores },
            { path: "/busetas", component: Busetas },
            { path: "/rutas", component: Rutas },
            { path: "/vendedores", component: Vendedores },
        ]
    },
    {
        path: "/menuVendedor", component: HeaderVen, children: [
            { path: "/homeVen", component: HomeVen },
            { path: "/clientes", component: Clientes },
            { path: "/tiquetes", component: Tiquetes },
        ]
    }
]
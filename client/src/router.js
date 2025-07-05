import {PUBLIC_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE, CATALOG_ROUTE, CHARACTER_ROUTE, CATALOGPAGE_ROUTE, BASKET_ROUTE, ORDER_ROUTE, POLITIC_ROUTE, CONTACTS_ROUTE, CATALOGPAGE_ONE_ROUTE} from './utils/const'
import Home from './pagesUser/Home'
import Authorization from './pagesAdmin/Authorization'
import Admin from './pagesAdmin/Admin'
import Catalog from './pagesAdmin/Catalog'
import Character from './pagesAdmin/Character'
import CatalogPub from './pagesUser/Catalog'
import Basket from './pagesUser/Basket'
import Order from './pagesAdmin/Order'
import Politic from './pagesUser/Politic'
import Contacts from './pagesUser/Contacts'

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: CHARACTER_ROUTE,
        Component: Character
    },
    {
        path: ORDER_ROUTE,
        Component: Order
    }
]
export const publicRoutes = [
    {
        path: PUBLIC_ROUTE,
        Component: Home
    },
    {
        path: CATALOGPAGE_ROUTE,
        Component: CatalogPub
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: POLITIC_ROUTE,
        Component: Politic
    },
    {
        path: LOGIN_ROUTE,
        Component: Authorization
    },
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: CATALOGPAGE_ONE_ROUTE,
        Component: CatalogPub
    },
]
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Produtos } from './pages/produtos/produtos';
import { Cadastro } from './pages/cadastro/cadastro';
import { Produto } from './pages/produto/produto';
import { Doacao } from './pages/doacao/doacao';
import { Carrinho } from './pages/carrinho/carrinho';
import { Contato } from './pages/contato/contato';
import { Layout } from './shared/layout/layout';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'cadastro',
        component: Cadastro
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '',
                component: Home
            },
            {
                path: 'produtos',
                component: Produtos
            },
            {
                path: 'produto/:id',
                component: Produto
            },
            {
                path: 'doacao',
                component: Doacao
            },
            {
                path: 'carrinho',
                component: Carrinho
            },
            {
                path: 'contato',
                component: Contato
            }
        ]
    }
];
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {

    menuAberto = false;

    // Quantidade de produtos no carrinho
    quantidadeCarrinho = 0;


    constructor(private router: Router) {

        this.atualizarCarrinho();

    }


    abrirMenu() {

        this.menuAberto = !this.menuAberto;

    }


    fecharMenu() {

        this.menuAberto = false;

    }


    abrirCarrinho() {

        this.router.navigate(['/carrinho']);

    }


    atualizarCarrinho() {

        const carrinho = localStorage.getItem('carrinho');

        if (carrinho) {

            const itens = JSON.parse(carrinho);

            this.quantidadeCarrinho = itens.reduce(
                (total: number, item: any) => {

                    return total + item.quantidade;

                },
                0
            );

        } else {

            this.quantidadeCarrinho = 0;

        }

    }

}
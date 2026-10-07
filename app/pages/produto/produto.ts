import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-produto',
    imports: [],
    templateUrl: './produto.html',
    styleUrl: './produto.css',
})
export class Produto {

    id = '';
    produto = '';
    preco = '';
    imagem = '';

    cores: string[] = [];
    variacoes: string[] = [];
    tamanhos: string[] = [];
    medidas: any[] = [];

    corSelecionada = '';
    variacaoSelecionada = '';
    tamanhoSelecionado = '';

    quantidade = 1;

    erroCor = false;
    erroModelo = false;
    erroTamanho = false;

    produtoAdicionado = false;

    constructor(private route: ActivatedRoute) {

        this.route.params.subscribe(params => {

            this.id = params['id'];

            this.carregarProduto();

        });

    }

    carregarProduto() {

        switch (this.id) {

            case 'camiseta':

                this.produto = 'Camiseta HAS';
                this.preco = 'R$60,00';
                this.imagem = '/images/uniformes/06_camiseta_preta.png';

                this.cores = [
                    'Preto',
                    'Branco'
                ];

                this.tamanhos = [
                    'PP',
                    'P',
                    'M',
                    'G',
                    'GG',
                    'EXGG'
                ];

                this.medidas = [
                    {
                        tamanho: 'PP',
                        comprimento: '64cm',
                        largura: '46cm',
                        manga: '17cm',
                        busto: '-'
                    },
                    {
                        tamanho: 'P',
                        comprimento: '67cm',
                        largura: '55cm',
                        manga: '18cm',
                        busto: '52cm'
                    },
                    {
                        tamanho: 'M',
                        comprimento: '66cm',
                        largura: '53cm',
                        manga: '-',
                        busto: '-'
                    },
                    {
                        tamanho: 'G',
                        comprimento: '69cm',
                        largura: '56cm',
                        manga: '-',
                        busto: '-'
                    },
                    {
                        tamanho: 'GG',
                        comprimento: '70cm',
                        largura: '58cm',
                        manga: '-',
                        busto: '-'
                    },
                    {
                        tamanho: 'EXGG',
                        comprimento: '70cm',
                        largura: '68cm',
                        manga: '-',
                        busto: '-'
                    }
                ];

                break;

            case 'calca':

                this.produto = 'Calça HAS';
                this.preco = 'R$85,00';
                this.imagem = '/images/uniformes/02_calca_preta.png';

                this.variacoes = [
                    'Tradicional',
                    'Legging'
                ];

                this.tamanhos = [
                    'P',
                    'M',
                    'G',
                    'GG'
                ];

                this.medidas = [
                    {
                        tamanho: 'G',
                        comprimento: '114cm',
                        cintura: '33cm',
                        coxa: '21cm'
                    }
                ];

                break;

            case 'bermuda':

                this.produto = 'Bermuda HAS';
                this.preco = 'R$85,00';
                this.imagem = '/images/uniformes/08_short_preto.png';

                this.variacoes = [
                    'Feminina',
                    'Masculina'
                ];

                this.tamanhos = [
                    'M',
                    'G'
                ];

                this.medidas = [
                    {
                        tamanho: 'M',
                        cintura: '32cm',
                        comprimento: '57cm'
                    },
                    {
                        tamanho: 'G',
                        cintura: '34cm',
                        comprimento: '59cm'
                    }
                ];

                break;

            case 'jaleco':

                this.produto = 'Jaleco HAS';
                this.preco = 'R$85,00';
                this.imagem = '/images/uniformes/03_jaleco_azul.png';

                this.tamanhos = [
                    'P',
                    'M',
                    'G',
                    'GG'
                ];

                break;

            case 'casaco':

                this.produto = 'Casaco HAS';
                this.preco = 'R$150,00';
                this.imagem = '/images/uniformes/05_jaqueta_preta.png';

                this.variacoes = [
                    'Com zíper',
                    'Sem zíper'
                ];

                this.tamanhos = [
                    'P',
                    'M',
                    'G',
                    'GG'
                ];

                break;

            case 'moletom':

                this.produto = 'Moletom HAS';
                this.preco = 'R$150,00';

                this.imagem = '';

                this.tamanhos = [
                    'P',
                    'M',
                    'G',
                    'GG'
                ];

                break;
        }
    }

    aumentarQuantidade() {

        this.quantidade++;

    }

    diminuirQuantidade() {

        if (this.quantidade > 1) {

            this.quantidade--;

        }

    }

    adicionarCarrinho() {

        this.erroCor = false;
        this.erroModelo = false;
        this.erroTamanho = false;

        if (
            this.cores.length > 0 &&
            this.corSelecionada === ''
        ) {

            this.erroCor = true;

        }

        if (
            this.variacoes.length > 0 &&
            this.variacaoSelecionada === ''
        ) {

            this.erroModelo = true;

        }

        if (this.tamanhoSelecionado === '') {

            this.erroTamanho = true;

        }

        if (
            this.erroCor ||
            this.erroModelo ||
            this.erroTamanho
        ) {

            return;

        }

        const precoNumerico = Number(
            this.preco
                .replace('R$', '')
                .replace('.', '')
                .replace(',', '.')
        );

        const item = {
            id: this.id,
            produto: this.produto,
            preco: precoNumerico,
            imagem: this.imagem,
            cor: this.corSelecionada,
            variacao: this.variacaoSelecionada,
            tamanho: this.tamanhoSelecionado,
            quantidade: this.quantidade
        };

        const carrinhoSalvo = localStorage.getItem('carrinho');

        let carrinho: any[] = [];

        if (carrinhoSalvo) {

            carrinho = JSON.parse(carrinhoSalvo);

        }

        const itemExistente = carrinho.find(itemCarrinho =>
            itemCarrinho.id === item.id &&
            itemCarrinho.cor === item.cor &&
            itemCarrinho.variacao === item.variacao &&
            itemCarrinho.tamanho === item.tamanho
        );

        if (itemExistente) {

            itemExistente.quantidade += this.quantidade;

        } else {

            carrinho.push(item);

        }

        localStorage.setItem(
            'carrinho',
            JSON.stringify(carrinho)
        );

        this.produtoAdicionado = true;

        setTimeout(() => {

            this.produtoAdicionado = false;

        }, 3000);
    }
}
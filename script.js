// Simulador de Fazenda Completa

class Planta {
    constructor(nome, emoji, custoSemente, precoVenda, tempoCrescimento, tipo) {
        this.nome = nome;
        this.emoji = emoji;
        this.custoSemente = custoSemente;
        this.precoVenda = precoVenda;
        this.tempoCrescimento = tempoCrescimento; // em segundos
        this.tipo = tipo; // 'verdura', 'legume', 'fruta'
        this.crescendo = false;
        this.pronta = false;
    }
}

class Horta {
    constructor(id) {
        this.id = id;
        this.plantas = [];
        this.capacidade = 10; // plantas por horta
    }

    plantar(planta) {
        if (this.plantas.length < this.capacidade) {
            this.plantas.push(planta);
            return true;
        }
        return false;
    }

    colher() {
        let colhidas = this.plantas.filter(p => p.pronta);
        this.plantas = this.plantas.filter(p => !p.pronta);
        return colhidas;
    }
}

class Animal {
    constructor(nome, emoji, custoCompra, producao) {
        this.nome = nome;
        this.emoji = emoji;
        this.custoCompra = custoCompra;
        this.producao = producao; // carne por dia
        this.vivo = true;
    }
}

class Curral {
    constructor(id) {
        this.id = id;
        this.animais = [];
        this.capacidade = 5;
    }

    adicionarAnimal(animal) {
        if (this.animais.length < this.capacidade) {
            this.animais.push(animal);
            return true;
        }
        return false;
    }
}

class Cliente {
    constructor() {
        this.desejo = this.escolherDesejo();
        this.orcamento = Math.random() * 100 + 50; // 50-150
        this.paciencia = Math.random() * 10 + 5; // 5-15 segundos
    }

    escolherDesejo() {
        let tipos = ['verdura', 'legume', 'fruta', 'carne'];
        return tipos[Math.floor(Math.random() * tipos.length)];
    }
}

// Dados globais
let dinheiro = 1000;
let funcionarios = 0;
let reputacao = 50;
let sustentabilidade = 100;
let hortas = [];
let currais = [];
let estoque = {}; // {nome: quantidade}
let plantasDisponiveis = [
    new Planta('Alface', '🥬', 2, 5, 30, 'verdura'),
    new Planta('Tomate', '🍅', 3, 7, 45, 'legume'),
    new Planta('Cenoura', '🥕', 2, 4, 40, 'legume'),
    new Planta('Batata', '🥔', 3, 6, 50, 'legume'),
    new Planta('Abóbora', '🎃', 5, 12, 60, 'legume'),
    new Planta('Melancia', '🍉', 6, 15, 70, 'fruta'),
    new Planta('Maçã', '🍎', 4, 8, 55, 'fruta'),
    new Planta('Banana', '🍌', 3, 6, 40, 'fruta'),
    new Planta('Laranja', '🍊', 4, 9, 50, 'fruta'),
    new Planta('Morango', '🍓', 5, 10, 35, 'fruta'),
    new Planta('Uva', '🍇', 6, 12, 45, 'fruta'),
    new Planta('Pêssego', '🍑', 5, 11, 50, 'fruta'),
    new Planta('Pera', '🍐', 4, 8, 55, 'fruta'),
    new Planta('Cereja', '🍒', 7, 14, 40, 'fruta'),
    new Planta('Kiwi', '🥝', 6, 13, 60, 'fruta'),
    new Planta('Abacaxi', '🍍', 8, 16, 80, 'fruta'),
    new Planta('Manga', '🥭', 7, 15, 65, 'fruta'),
    new Planta('Coco', '🥥', 10, 20, 90, 'fruta'),
    new Planta('Limão', '🍋', 3, 6, 45, 'fruta'),
    new Planta('Ameixa', '🍇', 5, 10, 50, 'fruta'), // uva já tem, mas ok
    // Adicionar mais verduras e legumes
    new Planta('Espinafre', '🥬', 2, 5, 25, 'verdura'),
    new Planta('Rúcula', '🥬', 2, 5, 20, 'verdura'),
    new Planta('Agrião', '🥬', 2, 4, 25, 'verdura'),
    new Planta('Couve', '🥬', 3, 6, 35, 'verdura'),
    new Planta('Repolho', '🥬', 4, 8, 50, 'verdura'),
    new Planta('Brócolis', '🥦', 4, 9, 45, 'verdura'),
    new Planta('Couve-flor', '🥦', 4, 8, 50, 'verdura'),
    new Planta('Beterraba', '🫛', 3, 6, 40, 'legume'),
    new Planta('Nabo', '🫛', 2, 4, 35, 'legume'),
    new Planta('Rabanete', '🫛', 1, 3, 20, 'legume'),
    new Planta('Cebola', '🧅', 2, 5, 40, 'legume'),
    new Planta('Alho', '🧄', 3, 7, 50, 'legume'),
    new Planta('Pimentão', '🫑', 4, 9, 45, 'legume'),
    new Planta('Berinjela', '🍆', 4, 8, 50, 'legume'),
    new Planta('Abobrinha', '🥒', 3, 6, 40, 'legume'),
    new Planta('Pepino', '🥒', 3, 6, 35, 'legume'),
    new Planta('Milho', '🌽', 5, 10, 60, 'legume'),
    new Planta('Ervilha', '🫛', 2, 4, 30, 'legume'),
    new Planta('Feijão', '🫘', 3, 6, 45, 'legume'),
    new Planta('Lentilha', '🫘', 3, 6, 40, 'legume'),
    new Planta('Grão-de-bico', '🫘', 4, 8, 50, 'legume'),
    new Planta('Soja', '🫘', 5, 10, 55, 'legume'),
    new Planta('Amendoim', '🥜', 4, 8, 60, 'legume'),
    new Planta('Mandioca', '🥔', 3, 6, 70, 'legume'),
    new Planta('Batata-doce', '🍠', 4, 9, 65, 'legume'),
    new Planta('Inhame', '🥔', 5, 10, 75, 'legume'),
    new Planta('Quiabo', '🫛', 3, 6, 40, 'legume'),
    new Planta('Jiló', '🍆', 3, 6, 45, 'legume'),
    new Planta('Chuchu', '🥒', 2, 5, 50, 'legume'),
    new Planta('Maxixe', '🥒', 2, 4, 40, 'legume'),
    new Planta('Taioba', '🥬', 3, 6, 35, 'verdura'),
    new Planta('Almeirão', '🥬', 2, 5, 25, 'verdura'),
    new Planta('Serralha', '🥬', 2, 4, 20, 'verdura'),
    new Planta('Mostarda', '🥬', 2, 5, 30, 'verdura'),
    new Planta('Nabo-da-folha', '🥬', 3, 6, 35, 'verdura'),
    new Planta('Rabanete-da-folha', '🥬', 2, 4, 25, 'verdura'),
    new Planta('Couve-chinesa', '🥬', 3, 6, 40, 'verdura'),
    new Planta('Gengibre', '🫚', 5, 10, 60, 'legume'),
    new Planta('Cúrcuma', '🫚', 6, 12, 65, 'legume'),
    new Planta('Pimenta', '🌶️', 4, 8, 50, 'legume'),
    new Planta('Pimentinha', '🌶️', 5, 10, 45, 'legume'),
    // Mais frutas
    new Planta('Framboesa', '🫐', 6, 12, 40, 'fruta'),
    new Planta('Mirtilo', '🫐', 7, 14, 45, 'fruta'),
    new Planta('Goiaba', '🥭', 5, 10, 55, 'fruta'),
    new Planta('Maracujá', '🥭', 6, 12, 50, 'fruta'),
    new Planta('Tangerina', '🍊', 4, 8, 45, 'fruta'),
    new Planta('Mexerica', '🍊', 4, 8, 45, 'fruta'),
    new Planta('Bergamota', '🍋', 5, 10, 50, 'fruta'),
    new Planta('Romã', '🫐', 8, 16, 60, 'fruta'),
    new Planta('Figo', '🫠', 6, 12, 55, 'fruta'),
    new Planta('Tâmara', '🌴', 10, 20, 80, 'fruta'),
    new Planta('Açaí', '🫐', 9, 18, 70, 'fruta'),
    new Planta('Cupuaçu', '🥭', 8, 16, 75, 'fruta'),
    new Planta('Jabuticaba', '🫐', 7, 14, 60, 'fruta'),
    new Planta('Pitanga', '🫐', 6, 12, 50, 'fruta'),
    new Planta('Araçá', '🫐', 5, 10, 45, 'fruta'),
    new Planta('Graviola', '🥭', 8, 16, 80, 'fruta'),
    new Planta('Jaca', '🥭', 10, 20, 90, 'fruta'),
    new Planta('Sapoti', '🥭', 7, 14, 65, 'fruta'),
    new Planta('Abiu', '🥭', 6, 12, 60, 'fruta'),
    new Planta('Cajá', '🥭', 5, 10, 55, 'fruta'),
    new Planta('Caju', '🥜', 6, 12, 70, 'fruta'),
    new Planta('Pinha', '🍍', 9, 18, 85, 'fruta'),
    new Planta('Seriguela', '🫐', 5, 10, 50, 'fruta'),
    new Planta('Jenipapo', '🫐', 4, 8, 45, 'fruta'),
    new Planta('Umbu', '🫐', 5, 10, 55, 'fruta'),
    new Planta('Mangaba', '🫐', 6, 12, 60, 'fruta'),
    new Planta('Araticum', '🫐', 7, 14, 65, 'fruta'),
    new Planta('Bacuri', '🥭', 8, 16, 75, 'fruta'),
    new Planta('Buriti', '🌴', 9, 18, 80, 'fruta'),
    new Planta('Tucumã', '🥭', 7, 14, 70, 'fruta'),
    new Planta('Pupunha', '🥥', 6, 12, 65, 'fruta'),
    new Planta('Acerola', '🫐', 4, 8, 40, 'fruta'),
    new Planta('Camu-camu', '🫐', 8, 16, 60, 'fruta'),
    new Planta('Guaraná', '🫐', 10, 20, 80, 'fruta'),
    new Planta('Castanha-do-pará', '🥜', 12, 24, 90, 'legume'), // mais uma
];

let animaisDisponiveis = [
    new Animal('Vaca', '🐄', 300, 10),
    new Animal('Porco', '🐖', 200, 8),
    new Animal('Galinha', '🐔', 50, 2),
    new Animal('Ovelha', '🐑', 250, 6),
    new Animal('Cabra', '🐐', 180, 5),
];

let upgrades = {
    eficiencia: { comprado: false, custo: 300, efeito: 0.2 }, // aumenta produção
    marketing: { comprado: false, custo: 400, efeito: 0.3 }, // aumenta clientes
};

let clientesAtivos = [];
let intervaloClientes;

// Funções principais
function atualizarUI() {
    document.getElementById('dinheiro').innerText = dinheiro.toFixed(2);
    document.getElementById('funcionarios').innerText = funcionarios;
    document.getElementById('reputacao').innerText = reputacao + '%';
    document.getElementById('sustentabilidade').innerText = sustentabilidade + '%';

    atualizarEstoque();
    atualizarHortas();
    atualizarCurrais();
}

function atualizarEstoque() {
    let lista = document.getElementById('estoque-lista');
    lista.innerHTML = '';
    for (let item in estoque) {
        if (estoque[item] > 0) {
            let div = document.createElement('div');
            div.className = 'item-estoque';
            div.innerHTML = `<p>${item}: ${estoque[item]}</p>`;
            lista.appendChild(div);
        }
    }
}

function atualizarHortas() {
    let container = document.getElementById('hortas');
    container.innerHTML = '';
    hortas.forEach(h => {
        let div = document.createElement('div');
        div.className = 'horta';
        div.innerHTML = `<h4>Horta ${h.id}</h4><p>Plantas: ${h.plantas.length}/${h.capacidade}</p>`;
        // Adicionar select para plantar
        let select = document.createElement('select');
        plantasDisponiveis.forEach(p => {
            let option = document.createElement('option');
            option.value = p.nome;
            option.text = p.nome + ' (R$ ' + p.custoSemente + ')';
            select.appendChild(option);
        });
        let btn = document.createElement('button');
        btn.innerText = 'Plantar';
        btn.onclick = () => plantarNaHorta(h.id, select.value);
        div.appendChild(select);
        div.appendChild(btn);
        // Colher
        let btnColher = document.createElement('button');
        btnColher.innerText = 'Colher';
        btnColher.onclick = () => colherHorta(h.id);
        div.appendChild(btnColher);
        container.appendChild(div);
    });
}

function atualizarCurrais() {
    let container = document.getElementById('currais');
    container.innerHTML = '';
    currais.forEach(c => {
        let div = document.createElement('div');
        div.className = 'curral';
        div.innerHTML = `<h4>Curral ${c.id}</h4><p>Animais: ${c.animais.length}/${c.capacidade}</p>`;
        // Adicionar select para animais
        let select = document.createElement('select');
        animaisDisponiveis.forEach(a => {
            let option = document.createElement('option');
            option.value = a.nome;
            option.text = a.nome + ' (R$ ' + a.custoCompra + ')';
            select.appendChild(option);
        });
        let btn = document.createElement('button');
        btn.innerText = 'Comprar';
        btn.onclick = () => comprarAnimal(c.id, select.value);
        div.appendChild(select);
        div.appendChild(btn);
        // Produzir carne
        let btnProduzir = document.createElement('button');
        btnProduzir.innerText = 'Produzir Carne';
        btnProduzir.onclick = () => produzirCarne(c.id);
        div.appendChild(btnProduzir);
        container.appendChild(div);
    });
}

function criarHorta() {
    if (dinheiro >= 200) {
        dinheiro -= 200;
        hortas.push(new Horta(hortas.length + 1));
        atualizarUI();
    } else {
        alert('Dinheiro insuficiente!');
    }
}

function plantarNaHorta(hortaId, plantaNome) {
    let horta = hortas.find(h => h.id === hortaId);
    let plantaTemplate = plantasDisponiveis.find(p => p.nome === plantaNome);
    if (horta && plantaTemplate && dinheiro >= plantaTemplate.custoSemente) {
        dinheiro -= plantaTemplate.custoSemente;
        let novaPlanta = new Planta(plantaTemplate.nome, plantaTemplate.emoji, plantaTemplate.custoSemente, plantaTemplate.precoVenda, plantaTemplate.tempoCrescimento, plantaTemplate.tipo);
        if (horta.plantar(novaPlanta)) {
            // Iniciar crescimento
            novaPlanta.crescendo = true;
            setTimeout(() => {
                novaPlanta.pronta = true;
                novaPlanta.crescendo = false;
                atualizarUI();
            }, novaPlanta.tempoCrescimento * 1000);
        }
        atualizarUI();
    } else {
        alert('Erro ao plantar!');
    }
}

function colherHorta(hortaId) {
    let horta = hortas.find(h => h.id === hortaId);
    if (horta) {
        let colhidas = horta.colher();
        colhidas.forEach(p => {
            if (!estoque[p.nome]) estoque[p.nome] = 0;
            estoque[p.nome] += 1;
        });
        atualizarUI();
    }
}

function comprarCurral() {
    if (dinheiro >= 500) {
        dinheiro -= 500;
        currais.push(new Curral(currais.length + 1));
        atualizarUI();
    } else {
        alert('Dinheiro insuficiente!');
    }
}

function comprarAnimal(curralId, animalNome) {
    let curral = currais.find(c => c.id === curralId);
    let animalTemplate = animaisDisponiveis.find(a => a.nome === animalNome);
    if (curral && animalTemplate && dinheiro >= animalTemplate.custoCompra) {
        dinheiro -= animalTemplate.custoCompra;
        let novoAnimal = new Animal(animalTemplate.nome, animalTemplate.emoji, animalTemplate.custoCompra, animalTemplate.producao);
        curral.adicionarAnimal(novoAnimal);
        atualizarUI();
    } else {
        alert('Erro ao comprar animal!');
    }
}

function produzirCarne(curralId) {
    let curral = currais.find(c => c.id === curralId);
    if (curral) {
        let totalCarne = 0;
        curral.animais.forEach(a => {
            if (a.vivo) {
                totalCarne += a.producao;
            }
        });
        if (!estoque['Carne']) estoque['Carne'] = 0;
        estoque['Carne'] += totalCarne;
        atualizarUI();
    }
}

function comprarUpgrade(tipo) {
    if (!upgrades[tipo].comprado && dinheiro >= upgrades[tipo].custo) {
        dinheiro -= upgrades[tipo].custo;
        upgrades[tipo].comprado = true;
        atualizarUI();
    } else {
        alert('Upgrade já comprado ou dinheiro insuficiente!');
    }
}

function processarSuco() {
    // Encontrar frutas no estoque
    let frutas = Object.keys(estoque).filter(item => {
        let p = plantasDisponiveis.find(pl => pl.nome === item && pl.tipo === 'fruta');
        return p && estoque[item] > 0;
    });
    if (frutas.length > 0) {
        let fruta = frutas[0];
        estoque[fruta] -= 1;
        let sucoNome = 'Suco de ' + fruta;
        if (!estoque[sucoNome]) estoque[sucoNome] = 0;
        estoque[sucoNome] += 1;
        atualizarUI();
    } else {
        alert('Sem frutas para processar!');
    }
}

// Sistema de Mercado
function iniciarMercado() {
    console.log('Mercado iniciado');
    intervaloClientes = setInterval(() => {
        if (Math.random() < 0.8 + (upgrades.marketing.comprado ? upgrades.marketing.efeito : 0)) { // chance de cliente aparecer
            console.log('Cliente aparecendo');
            let cliente = new Cliente();
            clientesAtivos.push(cliente);
            mostrarCliente(cliente);
            // Cliente sai após paciencia
            setTimeout(() => {
                console.log('Cliente saindo');
                clientesAtivos = clientesAtivos.filter(c => c !== cliente);
                atualizarMercado();
            }, cliente.paciencia * 1000);
        }
    }, 3000); // a cada 3 segundos
}

function mostrarCliente(cliente) {
    let mercado = document.getElementById('mercado');
    let div = document.createElement('div');
    div.className = 'cliente';
    div.innerHTML = `<p>Cliente quer ${cliente.desejo}. Orçamento: R$ ${cliente.orcamento.toFixed(2)}</p>`;
    // Botões para vender
    let btnVender = document.createElement('button');
    btnVender.innerText = 'Vender';
    btnVender.onclick = () => venderParaCliente(cliente, div);
    div.appendChild(btnVender);
    mercado.appendChild(div);
    atualizarMercado();
}

function venderParaCliente(cliente, div) {
    // Encontrar item no estoque do tipo desejado
    let itensDisponiveis = Object.keys(estoque).filter(item => {
        let p = plantasDisponiveis.find(pl => pl.nome === item);
        if (p && p.tipo === cliente.desejo) return true;
        if (cliente.desejo === 'carne' && item === 'Carne') return true;
        return false;
    });
    if (itensDisponiveis.length > 0) {
        let item = itensDisponiveis[0]; // vende o primeiro
        let preco = plantasDisponiveis.find(p => p.nome === item)?.precoVenda || 20; // carne 20
        if (estoque[item] > 0 && preco <= cliente.orcamento) {
            estoque[item] -= 1;
            dinheiro += preco;
            reputacao += 5;
            if (reputacao > 100) reputacao = 100;
            div.innerHTML = '<p>Cliente comprou! +R$ ' + preco + '</p>';
            setTimeout(() => div.remove(), 2000);
        } else if (preco > cliente.orcamento) {
            // Reclama ou negocia
            if (Math.random() < 0.5) {
                div.innerHTML = '<p>Cliente reclama: preço alto!</p>';
                reputacao -= 2;
            } else {
                let desconto = Math.random() * 0.3;
                let novoPreco = preco * (1 - desconto);
                if (novoPreco <= cliente.orcamento) {
                    estoque[item] -= 1;
                    dinheiro += novoPreco;
                    div.innerHTML = '<p>Cliente negociou e comprou por R$ ' + novoPreco.toFixed(2) + '!</p>';
                    setTimeout(() => div.remove(), 2000);
                } else {
                    div.innerHTML = '<p>Cliente foi embora!</p>';
                    reputacao -= 5;
                    setTimeout(() => div.remove(), 2000);
                }
            }
        } else {
            div.innerHTML = '<p>Sem estoque!</p>';
            reputacao -= 3;
            setTimeout(() => div.remove(), 2000);
        }
        clientesAtivos = clientesAtivos.filter(c => c !== cliente);
        atualizarUI();
    } else {
        div.innerHTML = '<p>Sem itens do tipo desejado!</p>';
        reputacao -= 3;
        setTimeout(() => div.remove(), 2000);
    }
}

function atualizarMercado() {
    let mercado = document.getElementById('mercado');
    // Manter apenas o primeiro elemento (o p inicial)
    let primeiro = mercado.firstElementChild;
    mercado.innerHTML = '';
    mercado.appendChild(primeiro);
}

// Inicialização
window.onload = () => {
    atualizarUI();
    iniciarMercado();
};
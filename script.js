function openNav() { document.getElementById("mySidebar").style.width = "250px"; }
function closeNav() { document.getElementById("mySidebar").style.width = "0"; }

async function solicitarServico(tipo) {
    // 1. Pop-up de Planos
    const { value: acao } = await Swal.fire({
        title: '💎 PLANOS DE PROTEÇÃO',
        background: '#0a0a0a', color: '#fff',
        showConfirmButton: false, showCancelButton: true,
        cancelButtonText: 'SOLICITAR SERVIÇO AVULSO',
        cancelButtonColor: '#333',
        html: `
            <div class="planos-container">
                <div class="plano-card" onclick="window.open('https://mpago.la/2iasbtH', '_blank')">
                    <h4>MENSAL</h4>
                    <div class="preco">R$ 9,90<span>/mês</span></div>
                    <ul><li>✅ Visita Técnica Grátis</li><li>✅ Atendimento em 3h</li></ul>
                    <button class="btn-comprar">ASSINAR</button>
                </div>
                <div class="plano-card destaque" onclick="window.open('https://mpago.la/2sxGtza', '_blank')">
                    <div class="plano-tag">MAIS VENDIDO</div>
                    <h4>TRIMESTRAL</h4>
                    <div class="preco">R$ 29,90</div>
                    <ul><li>✅ Prioridade Máxima</li><li>✅ Check-up Preventivo</li></ul>
                    <button class="btn-comprar">ASSINAR</button>
                </div>
                <div class="plano-card" onclick="window.open('https://mpago.la/28KedBS', '_blank')">
                    <h4>ANUAL</h4>
                    <div class="preco">R$ 99,90</div>
                    <ul><li>✅ Cobertura Total 24h</li><li>✅ Economize R$ 18,90</li></ul>
                    <button class="btn-comprar">ASSINAR</button>
                </div>
            </div>
        `
    });

    if (acao === undefined) { 
        continuarFormulario(tipo); 
    }
}

async function continuarFormulario(tipo) {
    const { value: f } = await Swal.fire({
        title: `SOLICITAR ${tipo}`,
        background: '#0a0a0a', color: '#fff', confirmButtonColor: '#00f2ff',
        html: `
            <p style="color:#ff3c00; font-size:11px; margin-bottom:10px;">📸 MANDE FOTO NO ZAP</p>
            <input id="n" class="swal2-input" placeholder="Seu Nome">
            <input id="e" class="swal2-input" placeholder="Endereço">
            <textarea id="d" class="swal2-textarea" placeholder="Descrição"></textarea>
        `,
        preConfirm: () => ({ n: document.getElementById('n').value, e: document.getElementById('e').value, d: document.getElementById('d').value })
    });

    if (f && f.n && f.e) {
        const msg = `*AVULSO:* ${tipo}%0A*Nome:* ${f.n}%0A*Endereço:* ${f.e}%0A*Detalhes:* ${f.d}`;
        window.open(`https://wa.me/5573988478170?text=${msg}`, '_blank');
    }
}

function atualizarStatus() {
    const agora = new Date();
    const dia = agora.getDay();
    const hora = agora.getHours();
    const ind = document.getElementById('status-indicator');
    const txt = document.getElementById('status-text');
    let aberto = (dia >= 1 && dia <= 5 && hora >= 8 && hora < 17) || ((dia === 0 || dia === 6) && hora >= 10 && hora < 15);

    if (aberto) {
        ind.className = 'status-badge status-open';
        txt.innerText = 'ABERTO AGORA';
    } else {
        ind.className = 'status-badge status-closed';
        txt.innerText = 'FECHADO NO MOMENTO';
    }
}

window.onload = atualizarStatus;

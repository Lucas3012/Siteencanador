function openNav() { document.getElementById("mySidebar").style.width = "250px"; }
function closeNav() { document.getElementById("mySidebar").style.width = "0"; }

async function solicitarServico(tipo) {
    // 1. Pop-up de Consulta Técnica Fixa
    const { value: aceitou } = await Swal.fire({
        title: '📑 CONSULTA TÉCNICA',
        background: '#0a0a0a',
        color: '#fff',
        confirmButtonText: 'PAGAR R$ 4,90',
        confirmButtonColor: '#39ff14',
        showCancelButton: true,
        cancelButtonText: 'CANCELAR',
        cancelButtonColor: '#333',
        html: `
            <div style="padding: 10px; border: 1px solid #333; border-radius: 10px; background: #111;">
                <h2 style="color: #39ff14; margin-bottom: 10px;">R$ 4,90</h2>
                <p style="font-size: 14px; color: #ccc;">Taxa única para análise técnica, diagnóstico via foto/vídeo e orçamento priorizado.</p>
                <ul style="text-align: left; font-size: 12px; margin-top: 15px; color: #00f2ff;">
                    <li>✅ Atendimento em até 60min</li>
                    <li>✅ Diagnóstico Especializado</li>
                    <li>✅ Valor descontado no serviço final</li>
                </ul>
            </div>
            <p style="margin-top: 15px; font-size: 10px; color: #666;">Pagamento via Mercado Pago (PIX ou Cartão)</p>
        `
    });

    if (aceitou) {
        // ABRA SEU LINK DE R$ 4,90 AQUI
        window.open('https://mpago.la/1SBSTbE', '_blank');
        
        // Pequeno atraso para o formulário
        setTimeout(() => {
            continuarFormulario(tipo);
        }, 1500);
    }
}

async function continuarFormulario(tipo) {
    const { value: f } = await Swal.fire({
        title: `DADOS DO LOCAL`,
        background: '#0a0a0a',
        color: '#fff',
        confirmButtonColor: '#00f2ff',
        confirmButtonText: 'ENVIAR PARA WHATSAPP',
        html: `
            <input id="n" class="swal2-input" placeholder="Seu Nome" style="background:#1a1a1a; color:#fff;">
            <input id="e" class="swal2-input" placeholder="Endereço em Itabuna" style="background:#1a1a1a; color:#fff;">
            <textarea id="d" class="swal2-textarea" placeholder="O que aconteceu? (Prepare as fotos)" style="background:#1a1a1a; color:#fff;"></textarea>
        `,
        preConfirm: () => ({ n: document.getElementById('n').value, e: document.getElementById('e').value, d: document.getElementById('d').value })
    });

    if (f && f.n && f.e) {
        const msg = `*CONSULTA TÉCNICA (PAGA)*%0A*Tipo:* ${tipo}%0A*Nome:* ${f.n}%0A*Endereço:* ${f.e}%0A*Descrição:* ${f.d}`;
        window.open(`https://wa.me/5573988478170?text=${msg}`, '_blank');
    }
}

function atualizarStatus() {
    const agora = new Date();
    const dia = agora.getDay();
    const hora = agora.getHours();
    const ind = document.getElementById('status-indicator');
    const txt = document.getElementById('status-text');
    
    // Segunda a Sexta: 8-17 | Sábado/Domingo: 10-15
    let aberto = (dia >= 1 && dia <= 5 && hora >= 8 && hora < 17) || 
                 ((dia === 0 || dia === 6) && hora >= 10 && hora < 15);

    if (aberto) {
        ind.className = 'status-badge status-open';
        txt.innerText = 'ABERTO AGORA';
    } else {
        ind.className = 'status-badge status-closed';
        txt.innerText = 'FECHADO NO MOMENTO';
    }
}

window.onload = atualizarStatus;

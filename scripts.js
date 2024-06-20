let pacientes = carregarPacientesLocalmente();
let agendamentos = carregarAgendamentosLocalmente();

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    document.getElementById('cadastroMsg').innerText = '';
    document.getElementById('marcacaoMsg').innerText = '';
    document.getElementById('cancelamentoMsg').innerText = '';
    if (sectionId === 'marcacao') {
        listarPacientesNumerados();
    }
    if (sectionId === 'cancelamento') {
        listarAgendamentosNumerados();
    }
}
function cadastrarPaciente(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    
    if (pacientes.some(paciente => paciente.telefone === telefone)) {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao cadastrar paciente!',
            text: 'Número de telefone já cadastrado.',
            confirmButtonColor: '#3abc80',
            confirmButtonText: 'OK'
        }).then(() => {
            document.querySelector('form').reset();
            showSection('menu-principal');
        });
        return;
    }
    if (pacientes.some(paciente => paciente.cpf === cpf)) {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao cadastrar paciente!',
            text: 'CPF já cadastrado.',
            confirmButtonColor: '#3abc80',
            confirmButtonText: 'OK'
        }).then(() => {
            document.querySelector('form').reset();
            showSection('menu-principal');
        });
        return;
    }
    pacientes.push({
        nome,
        telefone,
        dataNascimento,
        email,
        cpf
    });
    salvarPacientesLocalmente();

    Swal.fire({
        icon: 'success',
        title: 'Paciente cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
       
        showSection('menu-principal');
    });
    document.querySelector('form').reset();
}
function listarPacientesNumerados() {
    const listaPacientesNumerada = document.getElementById('listaPacientesNumerada');
    listaPacientesNumerada.innerHTML = '';
    pacientes.forEach((paciente, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${paciente.nome}`;
        li.style.cursor = 'pointer';
        li.onclick = () => mostrarFormularioMarcacao(index);
        listaPacientesNumerada.appendChild(li);
    });
}
function mostrarFormularioMarcacao(index) {
    const pacienteSelecionado = pacientes[index];
    document.getElementById('marcacaoForm').style.display = 'block';
    document.getElementById('paciente').innerHTML = `<option value="${pacienteSelecionado.cpf}">${pacienteSelecionado.nome}</option>`;
}
function listarMedicos() {
    const especialidade = document.getElementById('especialidade').value;
    const medicoSelect = document.getElementById('medico');
    medicoSelect.innerHTML = ''; 

    const medicos = [
        { nome: 'Dr. João', especialidade: 'cardiologia' },
        { nome: 'Dra. Maria', especialidade: 'dermatologia' },
        { nome: 'Dr. Pedro', especialidade: 'ginecologia' }
    ];

    medicos.filter(medico => medico.especialidade === especialidade).forEach(medico => {
        const option = document.createElement('option');
        option.value = medico.nome;
        option.textContent = medico.nome;
        medicoSelect.appendChild(option);
    });
}
function marcarConsulta(event) {
    event.preventDefault();
    
    const paciente = document.getElementById('paciente').value;
    const dataInput = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const especialidade = document.getElementById('especialidade').value;
    const medico = document.getElementById('medico').value;

    const dataSelecionada = new Date(dataInput);
    const dataAtual = new Date(); 

   
    if (dataSelecionada < dataAtual) {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao marcar consulta!',
            text: 'Não é possível marcar consultas retroativas.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then(() => {
            showSection('menu-principal');
        });
        return;
    }
    const consultaExistente = agendamentos.find(agendamento =>
        agendamento.medico === medico &&
        agendamento.data === dataInput &&
        agendamento.hora === hora
    );

    if (consultaExistente) {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao marcar consulta!',
            text: 'Já existe uma consulta marcada para este médico neste horário.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then(() => {
            showSection('menu-principal');
        });
        return;
    }
    agendamentos.push({
        paciente,
        data: dataInput,
        hora,
        especialidade,
        medico
    });

    Swal.fire({
        icon: 'success',
        title: 'Consulta marcada com sucesso!',
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        showSection('menu-principal');
    });
    document.querySelector('#marcacao form').reset();
    document.getElementById('marcacaoForm').style.display = 'none';
}
function listarAgendamentosNumerados() {
    const listaAgendamentosNumerada = document.getElementById('listaAgendamentosNumerada');
    listaAgendamentosNumerada.innerHTML = '';

    agendamentos.forEach((agendamento, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${agendamento.data} - ${agendamento.hora} - ${agendamento.especialidade}`;
        li.style.cursor = 'pointer';
        li.onclick = () => mostrarDetalhesConsulta(index); 
        listaAgendamentosNumerada.appendChild(li);
    });
}
function mostrarDetalhesConsulta(index) {
    const agendamento = agendamentos[index];
    const mensagem = `Consulta agendada para ${agendamento.data} às ${agendamento.hora} na especialidade de ${agendamento.especialidade}.`;
    Swal.fire({
        icon: 'info',
        title: 'Detalhes da Consulta',
        text: mensagem,
        confirmButtonColor: '#3abc80',
        confirmButtonText: 'OK'
    });
}
function escolherAgendamento(index) {
    const agendamentoSelecionado = agendamentos[index];
    const confirmacao = confirm(`Deseja cancelar a consulta?\nData: ${agendamentoSelecionado.data}\nHora: ${agendamentoSelecionado.hora}\nEspecialidade: ${agendamentoSelecionado.especialidade}`);
    if (confirmacao) {
        cancelarConsulta(index);
    }
}
function cancelarConsulta() {
    const paciente = document.getElementById('paciente').value;
    const consultaIndex = agendamentos.findIndex(agendamento => agendamento.paciente === paciente);
    if (consultaIndex !== -1) {
        const agendamento = agendamentos[consultaIndex];
        Swal.fire({
            icon: 'question',
            title: 'Cancelar Consulta',
            text: `Deseja realmente cancelar a consulta marcada para ${agendamento.data} às ${agendamento.hora} na especialidade de ${agendamento.especialidade}?`,
            showCancelButton: true,
            confirmButtonColor: '#4CAF50', 
            cancelButtonColor: '#f44336', 
            confirmButtonText: 'Sim, cancelar consulta',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                agendamentos.splice(consultaIndex, 1);
                Swal.fire({
                    icon: 'success',
                    title: 'Consulta cancelada!',
                    text: `A consulta marcada para ${agendamento.data} às ${agendamento.hora} na especialidade de ${agendamento.especialidade} foi cancelada com sucesso.`,
                    confirmButtonColor: '#4CAF50', 
                    confirmButtonText: 'OK'
                }).then(() => {
                    showSection('menu-principal');
                });
                salvarAgendamentosLocalmente();
                listarAgendamentosNumerados();
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao cancelar consulta!',
            text: 'Nenhuma consulta encontrada para cancelamento.',
            confirmButtonColor: '#4CAF50',
            confirmButtonText: 'OK'
        });
    }
}

function sair() {
    Swal.fire({
        icon: 'question',
        title: 'Tem certeza?',
        text: 'Você deseja realmente sair do sistema?',
        showCancelButton: true,
        confirmButtonColor: '#4CAF50',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Sim, sair',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Você saiu do sistema!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.close();
            });
        }
    });
}

function salvarPacientesLocalmente() {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
}
function salvarAgendamentosLocalmente() {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}
function carregarPacientesLocalmente() {
    const pacientesLocal = localStorage.getItem('pacientes');
    return pacientesLocal ? JSON.parse(pacientesLocal) : [];
}

function carregarAgendamentosLocalmente() {
    const agendamentosLocal = localStorage.getItem('agendamentos');
    return agendamentosLocal ? JSON.parse(agendamentosLocal) : [];
}




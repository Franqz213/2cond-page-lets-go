const COLORS = [
  '#2563eb','#0e9f9a','#e11d48','#d97706','#0891b2',
  '#7c3aed','#059669','#b45309','#be123c','#475569',
  '#0284c7','#65a30d','#c2410c','#9333ea','#0f766e'
];

const HELP = {
  fifo: 'FIFO: orden de llegada. En empates iniciales se usa orden alfabético; las colisiones de I/O se mantienen FIFO.',
  sjf: 'SJF: ordena por peso total CPU + I/O. No expulsa al proceso en ejecución.',
  spn: 'SPN: ordena por CPU total. En esta guía se trabaja como expulsivo.',
  rr: 'Round Robin: usa quantum por CPU. Al agotarse vuelve al final de la Ready Queue.',
  str: 'STR: expulsa si aparece una unidad con menor CPU restante.',
  prio: 'Prioridades: mayor número significa mayor prioridad.'
};

const EXAMPLES = {
  teoria_fifo: {
    cpuCount: 1,
    osAlgo: 'fifo',
    rows: [
      ['Proceso','A','',2,10,'io2',20,5,1],
      ['Proceso','B','',5,20,'io2',10,15,1],
      ['Proceso','C','',3,15,'io1',5,5,1],
      ['Proceso','D','',0,5,'io1',15,10,1],
    ]
  },
  teoria_sjf: {
    cpuCount: 1,
    osAlgo: 'sjf',
    rows: [
      ['Proceso','A','',3,10,'io2',20,5,1],
      ['Proceso','B','',2,20,'io1',15,15,1],
      ['Proceso','C','',7,15,'io1',5,5,1],
      ['Proceso','D','',0,5,'io1',15,10,1],
    ]
  },
  teoria_rr_2cpu: {
    cpuCount: 2,
    osAlgo: 'rr',
    q1: 2,
    q2: 4,
    queueMode: 'split',
    rows: [
      ['Proceso','A','',0,4,'io1',2,2,1],
      ['Proceso','B','',6,6,'io1',8,6,1],
      ['Proceso','C','',1,8,'io2',2,6,1],
      ['Proceso','D','',3,10,'io1',4,4,1],
    ]
  },
  guia_fifo_1: {
    cpuCount: 1,
    osAlgo: 'fifo',
    rows: [
      ['Proceso','A','',0,5,'io1',5,5,1],
      ['Proceso','B','',1,10,'io1',10,5,1],
      ['Proceso','C','',2,5,'none','', '',1],
      ['Proceso','D','',3,10,'io1',5,5,1],
    ]
  },
  guia_fifo_2: {
    cpuCount: 1,
    osAlgo: 'fifo',
    rows: [
      ['Proceso','A','',5,5,'io1',5,5,1],
      ['Proceso','B','',2,10,'io1',10,5,1],
      ['Proceso','C','',0,5,'none','', '',1],
      ['Proceso','D','',4,10,'io1',5,5,1],
    ]
  },
  guia_ej3_fifo: {
    cpuCount: 1,
    osAlgo: 'fifo',
    rows: [
      ['Proceso','A','',5,5,'io2',5,4,1],
      ['Proceso','B','',2,10,'io1',10,5,1],
      ['Proceso','C','',0,5,'io2',20,5,1],
      ['Proceso','D','',4,10,'io2',15,5,1],
      ['Proceso','F','',1,4,'io1',5,6,1],
      ['Proceso','G','',3,2,'io1',10,7,1],
    ]
  },
  guia_ej3_sjf: {
    cpuCount: 1,
    osAlgo: 'sjf',
    rows: [
      ['Proceso','A','',5,5,'io2',5,4,1],
      ['Proceso','B','',2,10,'io1',10,5,1],
      ['Proceso','C','',0,5,'io2',20,5,1],
      ['Proceso','D','',4,10,'io2',15,5,1],
      ['Proceso','F','',1,4,'io1',5,6,1],
      ['Proceso','G','',3,2,'io1',10,7,1],
    ]
  },
  guia_ej3_spn: {
    cpuCount: 1,
    osAlgo: 'spn',
    rows: [
      ['Proceso','A','',5,5,'io2',5,4,1],
      ['Proceso','B','',2,10,'io1',10,5,1],
      ['Proceso','C','',0,5,'io2',20,5,1],
      ['Proceso','D','',4,10,'io2',15,5,1],
      ['Proceso','F','',1,4,'io1',5,6,1],
      ['Proceso','G','',3,2,'io1',10,7,1],
    ]
  },
  guia_rr_5: {
    cpuCount: 1,
    osAlgo: 'rr',
    q1: 5,
    rows: [
      ['Proceso','A','',5,15,'io2',5,10,1],
      ['Proceso','B','',0,10,'io1',10,5,1],
      ['Proceso','C','',6,5,'io2',20,10,1],
      ['Proceso','D','',3,10,'io2',15,15,1],
      ['Proceso','F','',2,5,'io1',5,5,1],
    ]
  },
  guia_str_5: {
    cpuCount: 1,
    osAlgo: 'str',
    rows: [
      ['Proceso','A','',5,15,'io2',5,10,1],
      ['Proceso','B','',0,10,'io1',10,5,1],
      ['Proceso','C','',6,5,'io2',20,10,1],
      ['Proceso','D','',3,10,'io2',15,15,1],
      ['Proceso','F','',2,5,'io1',5,5,1],
    ]
  },
  guia_2cpu_rr: {
    cpuCount: 2,
    osAlgo: 'rr',
    q1: 2,
    q2: 4,
    queueMode: 'split',
    rows: [
      ['Proceso','A','',5,12,'io2',5,10,1],
      ['Proceso','B','',0,10,'io1',10,4,1],
      ['Proceso','C','',6,8,'io2',20,10,1],
      ['Proceso','D','',3,10,'io2',15,8,1],
      ['Proceso','F','',2,4,'none','', '',1],
    ]
  },
  guia_hilos_sjf: {
    cpuCount: 1,
    osAlgo: 'rr',
    threadAlgo: 'sjf',
    q1: 4,
    tq: 2,
    rows: [
      ['Proceso','A','A',0,4,'none','', '',1],
      ['ULT','ULT1.1','A',0,6,'io1',4,2,1],
      ['ULT','ULT1.2','A',0,8,'io2',4,2,1],
      ['Proceso','B','B',3,4,'io2',2,2,1],
      ['Proceso','C','C',1,2,'io1',3,2,1],
      ['KLT','KLT','KLT',2,5,'io2',2,1,1],
    ]
  },
  guia_hilos_rr: {
    cpuCount: 1,
    osAlgo: 'rr',
    threadAlgo: 'rr',
    q1: 4,
    tq: 2,
    rows: [
      ['Proceso','A','A',0,4,'none','', '',1],
      ['ULT','ULT1.1','A',0,6,'io1',4,2,1],
      ['ULT','ULT1.2','A',0,8,'io2',4,2,1],
      ['Proceso','B','B',3,4,'io2',2,2,1],
      ['Proceso','C','C',1,2,'io1',3,2,1],
      ['KLT','KLT','KLT',2,5,'io2',2,1,1],
    ]
  },
  hilos_xls: {
    cpuCount: 1,
    osAlgo: 'rr',
    threadAlgo: 'rr',
    q1: 4,
    tq: 2,
    rows: [
      ['Proceso','A','A',3,2,'none','',2,1],
      ['ULT','ULT1.1','A',3,6,'io1',4,2,1],
      ['ULT','ULT1.2','A',3,8,'io2',4,2,1],
      ['Proceso','B','B',0,4,'io2',2,2,1],
      ['Proceso','C','C',1,2,'io1',3,2,1],
      ['KLT','KLT','KLT',2,5,'io2',2,1,1],
    ]
  },
  teoria_hilos_rr: {
    cpuCount: 1,
    osAlgo: 'rr',
    threadAlgo: 'rr',
    q1: 5,
    tq: 2,
    rows: [
      ['KLT','KLT','KLT',4,7,'io1',10,5,1],
      ['Proceso','P1','P1',2,10,'none','',5,1],
      ['ULT','ULT1.1','P1',2,6,'io2',5,5,1],
      ['ULT','ULT1.2','P1',2,10,'io1',10,4,1],
      ['Proceso','P2','P2',0,7,'none','',9,1],
      ['ULT','ULT2.1','P2',0,1,'io1',5,10,1],
      ['ULT','ULT2.2','P2',0,6,'io2',5,10,1],
    ]
  },
};

let rowCounter = 0;
let traceLines = [];

window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  onConfigChange();
  loadExample('hilos_xls');
});

function initTheme() {
  const savedTheme = localStorage.getItem('sim-hilos-theme');
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('sim-hilos-theme', nextTheme);
  applyTheme(nextTheme);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.textContent = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
}

function onConfigChange() {
  const cpuCount = Number(document.getElementById('cpu-count').value);
  const algo = document.getElementById('os-algo').value;
  document.getElementById('quantum-config').style.display = algo === 'rr' ? 'grid' : 'none';
  document.getElementById('quantum-2-wrap').style.display = cpuCount === 2 ? 'block' : 'none';
  document.getElementById('queue-mode').disabled = cpuCount !== 2;
  document.getElementById('algo-help').textContent = HELP[algo] || '';
}

function addRow(type='Proceso', name='', group='', arrival=0, cpu1='', ioType='none', ioDur='', cpu2='', priority=1) {
  const id = rowCounter++;
  const tbody = document.getElementById('workload-body');
  const tr = document.createElement('tr');
  tr.id = `row-${id}`;
  tr.innerHTML = `
    <td>
      <select id="type-${id}">
        <option value="Proceso" ${type==='Proceso'?'selected':''}>Proceso</option>
        <option value="KLT" ${type==='KLT'?'selected':''}>KLT</option>
        <option value="ULT" ${type==='ULT'?'selected':''}>ULT</option>
      </select>
    </td>
    <td><input class="name-in" id="name-${id}" value="${escAttr(name)}" placeholder="P${id+1}"></td>
    <td><input class="group-in" id="group-${id}" value="${escAttr(group)}" placeholder="Padre"></td>
    <td><input id="arr-${id}" type="number" min="0" value="${arrival}"></td>
    <td><input id="cpu1-${id}" type="number" min="1" value="${cpu1}"></td>
    <td>
      <select id="io-type-${id}">
        <option value="none" ${ioType==='none'?'selected':''}>-</option>
        <option value="io1" ${ioType==='io1'?'selected':''}>I/O1</option>
        <option value="io2" ${ioType==='io2'?'selected':''}>I/O2</option>
      </select>
    </td>
    <td><input id="io-dur-${id}" type="number" min="0" value="${ioDur}"></td>
    <td><input id="cpu2-${id}" type="number" min="0" value="${cpu2}"></td>
    <td><input id="prio-${id}" type="number" min="1" value="${priority}"></td>
    <td><button class="del-btn" onclick="deleteRow(${id})">x</button></td>
  `;
  tbody.appendChild(tr);
}

function deleteRow(id) {
  document.getElementById(`row-${id}`)?.remove();
}

function clearRows() {
  document.getElementById('workload-body').innerHTML = '';
  rowCounter = 0;
}

function loadSelectedExample() {
  loadExample(document.getElementById('example-select').value);
}

function loadExample(key) {
  const ex = EXAMPLES[key];
  if (!ex) return;
  clearRows();
  document.getElementById('cpu-count').value = ex.cpuCount || 1;
  document.getElementById('os-algo').value = ex.osAlgo || 'fifo';
  document.getElementById('thread-algo').value = ex.threadAlgo || 'fifo';
  document.getElementById('queue-mode').value = ex.queueMode || 'shared';
  document.getElementById('quantum-1').value = ex.q1 || 4;
  document.getElementById('quantum-2').value = ex.q2 || ex.q1 || 4;
  document.getElementById('thread-quantum').value = ex.tq || 2;
  document.getElementById('example-select').value = key;
  onConfigChange();
  ex.rows.forEach(r => addRow(...r));
}

function getConfig() {
  return {
    cpuCount: Number(document.getElementById('cpu-count').value),
    queueMode: document.getElementById('queue-mode').value,
    osAlgo: document.getElementById('os-algo').value,
    q: [
      Number(document.getElementById('quantum-1').value) || 1,
      Number(document.getElementById('quantum-2').value) || 1
    ],
    threadAlgo: document.getElementById('thread-algo').value,
    threadQuantum: Number(document.getElementById('thread-quantum').value) || 1
  };
}

function getWorkload() {
  const rows = [...document.querySelectorAll('#workload-body tr')];
  const units = [];
  const errors = [];
  rows.forEach((tr, idx) => {
    const id = tr.id.replace('row-', '');
    const type = val(`type-${id}`);
    const name = val(`name-${id}`).trim() || `P${idx + 1}`;
    const group = val(`group-${id}`).trim() || name;
    const arrival = Number(val(`arr-${id}`)) || 0;
    const cpu1 = Number(val(`cpu1-${id}`));
    const ioType = val(`io-type-${id}`);
    const ioDur = Number(val(`io-dur-${id}`));
    const cpu2 = Number(val(`cpu2-${id}`));
    const priority = Number(val(`prio-${id}`)) || 1;

    if (!cpu1 || cpu1 <= 0) {
      errors.push(`${name}: CPU1 debe ser mayor a cero`);
      return;
    }

    const bursts = [{type:'cpu', duration: cpu1}];
    if (ioType !== 'none' && ioDur > 0) {
      if (!cpu2 || cpu2 <= 0) {
        errors.push(`${name}: si usa I/O debe tener CPU2 mayor a cero`);
        return;
      }
      bursts.push({type: ioType, duration: ioDur});
      bursts.push({type:'cpu', duration: cpu2});
    } else if (cpu2 > 0) {
      bursts.push({type:'cpu', duration: cpu2});
    }

    const totalCPU = bursts.filter(b => b.type === 'cpu').reduce((s,b) => s + b.duration, 0);
    const totalIO = bursts.filter(b => b.type !== 'cpu').reduce((s,b) => s + b.duration, 0);
    units.push({
      type, name, group, arrival, bursts, priority,
      totalCPU, totalIO,
      weight: totalCPU + totalIO
    });
  });

  const names = units.map(u => u.name);
  const duplicates = [...new Set(names.filter((n,i) => names.indexOf(n) !== i))];
  if (duplicates.length) errors.push(`Nombres duplicados: ${duplicates.join(', ')}`);
  if (!units.length) errors.push('Agregá al menos una unidad planificable.');
  if (errors.length) {
    alert(errors.join('\n'));
    return null;
  }
  return units;
}

function simulate(units, config) {
  traceLines = [];
  const log = (t, msg) => traceLines.push(`t=${String(t).padStart(3,'0')}: ${msg}`);
  const ps = units.map(u => ({
    ...u,
    bursts: u.bursts.map(b => ({...b})),
    state: 'new',
    burstIdx: 0,
    cpuRemaining: 0,
    cpuTotalRemaining: u.totalCPU,
    finishTime: null,
    readySeq: 0,
    rrThreadLeft: config.threadQuantum
  }));

  const cpus = Array.from({length: config.cpuCount}, (_, i) => ({
    label: `CPU${i + 1}`,
    current: null,
    quantumLeft: 0,
    timeline: []
  }));
  const readyQueues = config.queueMode === 'split'
    ? Array.from({length: config.cpuCount}, () => [])
    : [[]];
  const io = {
    io1: {label:'I/O1', current:null, queue:[], timeline:[]},
    io2: {label:'I/O2', current:null, queue:[], timeline:[]}
  };

  let seq = 0;
  let t = 0;
  const MAX = 4000;
  const markReady = (p, cause) => {
    p.state = 'ready';
    p.readyAt = t;
    p.readyCause = cause;
    p.readySeq = seq++;
  };

  while (t < MAX) {
    if (ps.every(p => p.state === 'kill')) break;
    const entering = [];

    for (const p of ps) {
      if (p.state === 'new' && p.arrival === t) {
        p.cpuRemaining = p.bursts[p.burstIdx].duration;
        markReady(p, 'arrival');
        entering.push(p);
        log(t, `ARRIBO ${labelOf(p)}`);
      }
    }

    for (const key of ['io1','io2']) {
      const dev = io[key];
      if (dev.current && dev.current.ioFinishTime === t) {
        const p = dev.current;
        p.burstIdx++;
        p.cpuRemaining = p.bursts[p.burstIdx].duration;
        markReady(p, 'io');
        entering.push(p);
        log(t, `IO_FIN ${labelOf(p)} en ${dev.label}`);
        dev.current = null;
      }
    }

    for (const cpu of cpus) {
      const p = cpu.current;
      if (!p) continue;
      if (p.cpuRemaining === 0) {
        p.burstIdx++;
        if (p.burstIdx >= p.bursts.length) {
          p.state = 'kill';
          p.finishTime = t;
          log(t, `KILL ${labelOf(p)} desde ${cpu.label}`);
        } else {
          const next = p.bursts[p.burstIdx];
          if (next.type === 'cpu') {
            p.cpuRemaining = next.duration;
            markReady(p, 'cpu');
            entering.push(p);
            log(t, `CPU_BURST ${labelOf(p)} vuelve a Ready`);
          } else {
            p.state = 'wait';
            io[next.type].queue.push(p);
            log(t, `IO_REQ ${labelOf(p)} a ${next.type.toUpperCase()}`);
          }
        }
        cpu.current = null;
      } else if (config.osAlgo === 'rr' && cpu.quantumLeft <= 0) {
        markReady(p, 'quantum');
        p.quantumFromCpu = cpus.indexOf(cpu);
        entering.push(p);
        cpu.current = null;
        log(t, `QUANTUM_EXP ${labelOf(p)} en ${cpu.label}`);
      } else if (p.type === 'ULT' && config.threadAlgo === 'rr' && p.rrThreadLeft <= 0) {
        markReady(p, 'thread-quantum');
        entering.push(p);
        cpu.current = null;
        log(t, `ULT_QUANTUM_EXP ${labelOf(p)}`);
      }
    }

    pushReady(readyQueues, entering, config);
    sortQueues(readyQueues, config);

    if (config.osAlgo !== 'rr') {
      for (const cpu of cpus) {
        if (!cpu.current) continue;
        const q = queueForCpu(readyQueues, cpus.indexOf(cpu), config);
        if (q.length && shouldPreempt(cpu.current, q[0], config.osAlgo)) {
          log(t, `PREEMPT ${labelOf(cpu.current)} por ${labelOf(q[0])}`);
          cpu.current.state = 'ready';
          cpu.current.readyAt = t;
          cpu.current.readyCause = 'preempt';
          cpu.current.readySeq = seq++;
          q.push(cpu.current);
          cpu.current = null;
          sortQueues(readyQueues, config);
        }
      }
    }

    for (const key of ['io1','io2']) {
      const dev = io[key];
      if (!dev.current && dev.queue.length) {
        dev.current = dev.queue.shift();
        dev.current.ioFinishTime = t + dev.current.bursts[dev.current.burstIdx].duration;
        log(t, `IO_START ${labelOf(dev.current)} en ${dev.label}`);
      }
    }

    for (let i = 0; i < cpus.length; i++) {
      const cpu = cpus[i];
      if (cpu.current) continue;
      const queue = queueForCpu(readyQueues, i, config);
      if (!queue.length) continue;
      const p = queue.shift();
      p.state = 'execute';
      if (config.osAlgo === 'rr') cpu.quantumLeft = config.q[i];
      if (p.type === 'ULT' && config.threadAlgo === 'rr') p.rrThreadLeft = config.threadQuantum;
      cpu.current = p;
      log(t, `CPU_START ${labelOf(p)} en ${cpu.label}`);
    }

    for (const cpu of cpus) {
      if (cpu.current) {
        const p = cpu.current;
        cpu.timeline.push({t, name:p.name, states: snapshotStates(ps)});
        p.cpuRemaining--;
        p.cpuTotalRemaining--;
        if (config.osAlgo === 'rr') cpu.quantumLeft--;
        if (p.type === 'ULT' && config.threadAlgo === 'rr') p.rrThreadLeft--;
      } else {
        cpu.timeline.push({t, name:'idle', states: snapshotStates(ps)});
      }
    }

    for (const key of ['io1','io2']) {
      const dev = io[key];
      if (dev.current) dev.timeline.push({t, name:dev.current.name, states: snapshotStates(ps)});
      else dev.timeline.push({t, name:'idle', states: snapshotStates(ps)});
    }
    t++;
  }

  return {
    totalTime: t,
    units: ps,
    resources: [
      ...cpus.map(c => ({label:c.label, timeline:c.timeline})),
      {label:'I/O1', timeline:io.io1.timeline},
      {label:'I/O2', timeline:io.io2.timeline}
    ]
  };
}

function pushReady(readyQueues, entering, config) {
  if (!entering.length) return;
  if (config.queueMode !== 'split') {
    const incoming = (config.osAlgo === 'fifo' || config.osAlgo === 'rr')
      ? [...entering].sort(compareReadyEntry)
      : entering;
    for (const p of incoming) {
      delete p.quantumFromCpu;
      enqueueReady(readyQueues, p, config);
    }
    return;
  }

  const quantumExpired = entering.filter(p => p.quantumFromCpu != null);
  const normalEntering = entering.filter(p => p.quantumFromCpu == null);
  const incoming = (config.osAlgo === 'fifo' || config.osAlgo === 'rr')
    ? [...normalEntering].sort(compareReadyEntry)
    : normalEntering;

  for (const p of incoming) {
    enqueueReady(readyQueues, p, config);
  }

  for (const p of quantumExpired.sort((a,b) => a.readySeq - b.readySeq)) {
    if (p.quantumFromCpu != null) {
      enqueueAfterQuantum(readyQueues, p, p.quantumFromCpu, config);
      delete p.quantumFromCpu;
    }
  }
}

function compareReadyEntry(a, b) {
  return a.arrival - b.arrival
    || a.name.localeCompare(b.name)
    || (a.readySeq ?? 0) - (b.readySeq ?? 0);
}

function queueForCpu(readyQueues, cpuIndex, config) {
  return config.queueMode === 'split' ? readyQueues[cpuIndex] : readyQueues[0];
}

function enqueueReady(readyQueues, unit, config) {
  if (config.queueMode === 'split' && readyQueues.length > 1) {
    readyQueues[0].push(unit);
  } else {
    readyQueues[0].push(unit);
  }
}

function enqueueAfterQuantum(readyQueues, unit, cpuIndex, config) {
  if (config.queueMode === 'split' && readyQueues.length > 1) {
    const nextQueue = Math.min(cpuIndex + 1, readyQueues.length - 1);
    readyQueues[nextQueue].push(unit);
  } else {
    readyQueues[0].push(unit);
  }
}

function sortQueues(queues, config) {
  if (config.osAlgo === 'fifo' || config.osAlgo === 'rr') return;
  queues.forEach(q => q.sort((a,b) => compareUnits(a,b,config)));
}

function compareUnits(a, b, config) {
  const osCmp = compareByAlgo(a, b, config.osAlgo);
  if (osCmp !== 0) return osCmp;
  if (a.type === 'ULT' && b.type === 'ULT' && a.group === b.group) {
    const threadCmp = compareByAlgo(a, b, config.threadAlgo);
    if (threadCmp !== 0) return threadCmp;
  }
  return compareReadyEntry(a, b);
}

function compareByAlgo(a, b, algo) {
  if (algo === 'sjf') return a.weight - b.weight;
  if (algo === 'spn') return a.totalCPU - b.totalCPU;
  if (algo === 'str') return a.cpuTotalRemaining - b.cpuTotalRemaining;
  if (algo === 'prio') return b.priority - a.priority;
  return 0;
}

function shouldPreempt(current, head, algo) {
  if (algo === 'spn') return head.totalCPU < current.totalCPU;
  if (algo === 'str') return head.cpuTotalRemaining < current.cpuTotalRemaining;
  if (algo === 'prio') return head.priority > current.priority;
  return false;
}

function runSimulation() {
  const units = getWorkload();
  if (!units) return;
  const config = getConfig();
  const result = units.some(u => u.type === 'ULT')
    ? simulateThreaded(units, config)
    : simulate(units, config);
  renderResult(result);
}

function simulateThreaded(units, config) {
  traceLines = [];
  const log = (t, msg) => traceLines.push(`t=${String(t).padStart(3,'0')}: ${msg}`);
  const byName = new Map(units.map(u => [u.name, u]));
  const childrenByGroup = new Map();
  for (const u of units) {
    if (u.type === 'ULT') {
      const list = childrenByGroup.get(u.group) || [];
      list.push(u);
      childrenByGroup.set(u.group, list);
    }
  }

  const makeRuntime = (u, ownerName, runtimeType = u.type) => ({
    ...u,
    runtimeType,
    ownerName,
    bursts: u.bursts.map(b => ({...b})),
    state: 'new',
    burstIdx: 0,
    cpuRemaining: 0,
    cpuTotalRemaining: u.totalCPU,
    finishTime: null,
    readySeq: 0,
    threadQuantumLeft: config.threadQuantum
  });

  const tasks = [];
  const runtimeUnits = [];
  const consumed = new Set();

  for (const u of units) {
    if (u.type === 'ULT') continue;
    const groupChildren = childrenByGroup.get(u.name) || childrenByGroup.get(u.group) || [];
    if (u.type === 'Proceso' && groupChildren.length) {
      const own = makeRuntime(u, u.name, 'MAIN');
      const children = [
        own,
        ...groupChildren.map(c => makeRuntime({...c, arrival: Math.max(c.arrival, u.arrival)}, u.name, 'ULT'))
      ];
      children.forEach(c => runtimeUnits.push(c));
      tasks.push({
        kind: 'process',
        name: u.name,
        type: 'Proceso',
        arrival: u.arrival,
        priority: u.priority,
        totalCPU: children.reduce((s,c) => s + c.totalCPU, 0),
        totalIO: children.reduce((s,c) => s + c.totalIO, 0),
        weight: children.reduce((s,c) => s + c.weight, 0),
        cpuTotalRemaining: children.reduce((s,c) => s + c.totalCPU, 0),
        children,
        currentChild: null,
        state: 'new',
        readySeq: 0,
        finishTime: null
      });
      consumed.add(u.name);
      groupChildren.forEach(c => consumed.add(c.name));
    } else {
      const child = makeRuntime(u, u.name);
      runtimeUnits.push(child);
      tasks.push({
        kind: 'direct',
        name: u.name,
        type: u.type,
        arrival: u.arrival,
        priority: u.priority,
        totalCPU: u.totalCPU,
        totalIO: u.totalIO,
        weight: u.weight,
        cpuTotalRemaining: u.totalCPU,
        children: [child],
        currentChild: child,
        state: 'new',
        readySeq: 0,
        finishTime: null
      });
      consumed.add(u.name);
    }
  }

  for (const u of units) {
    if (consumed.has(u.name)) continue;
    const child = makeRuntime(u, u.name);
    runtimeUnits.push(child);
    tasks.push({
      kind: 'direct',
      name: u.name,
      type: u.type,
      arrival: u.arrival,
      priority: u.priority,
      totalCPU: u.totalCPU,
      totalIO: u.totalIO,
      weight: u.weight,
      cpuTotalRemaining: u.totalCPU,
      children: [child],
      currentChild: child,
      state: 'new',
      readySeq: 0,
      finishTime: null
    });
  }

  const cpus = Array.from({length: config.cpuCount}, (_, i) => ({
    label: `CPU${i + 1}`,
    current: null,
    quantumLeft: 0,
    timeline: []
  }));
  const readyQueues = config.queueMode === 'split'
    ? Array.from({length: config.cpuCount}, () => [])
    : [[]];
  const io = {
    io1: {label:'I/O1', current:null, queue:[], timeline:[]},
    io2: {label:'I/O2', current:null, queue:[], timeline:[]}
  };

  let seq = 0;
  let t = 0;
  const MAX = 5000;
  const markTaskReady = (task, cause) => {
    task.state = 'ready';
    task.readyAt = t;
    task.readyCause = cause;
    task.readySeq = seq++;
  };
  const markChildReady = (child, cause) => {
    child.state = 'ready';
    child.readyAt = t;
    child.readyCause = cause;
    if (child.runtimeType === 'ULT' && config.threadAlgo === 'rr' && cause !== 'quantum' && cause !== 'preempt') {
      child.threadQuantumLeft = config.threadQuantum;
    }
    child.readySeq = seq++;
  };

  while (t < MAX) {
    if (tasks.every(task => task.state === 'kill')) break;
    const enteringTasks = [];

    for (const task of tasks) {
      if (task.state === 'new' && task.arrival === t) {
        markTaskReady(task, 'arrival');
        for (const child of task.children) {
          if (child.state === 'new') {
            child.cpuRemaining = child.bursts[child.burstIdx].duration;
            markChildReady(child, 'arrival');
          }
        }
        enteringTasks.push(task);
        log(t, `ARRIBO ${task.name}`);
      }
    }

    for (const key of ['io1','io2']) {
      const dev = io[key];
      if (dev.current && dev.current.ioFinishTime === t) {
        const child = dev.current;
        child.burstIdx++;
        child.cpuRemaining = child.bursts[child.burstIdx].duration;
        markChildReady(child, 'io');
        const owner = tasks.find(task => task.name === child.ownerName);
        if (owner && owner.state === 'wait') {
          markTaskReady(owner, 'io');
          enteringTasks.push(owner);
        }
        log(t, `IO_FIN ${labelOf(child)} en ${dev.label}`);
        dev.current = null;
      }
    }

    for (const cpu of cpus) {
      const task = cpu.current;
      if (!task) continue;
      const blockedByUltIo = finishCompletedThreadBursts(task, t, io, log, markChildReady);
      if (task.children.every(c => c.state === 'kill')) {
        task.state = 'kill';
        task.finishTime = t;
        task.children.forEach(c => { if (c.finishTime == null) c.finishTime = t; });
        log(t, `KILL ${task.name} desde ${cpu.label}`);
        cpu.current = null;
        continue;
      }
      if (blockedByUltIo) {
        task.state = 'wait';
        log(t, `PROC_WAIT ${task.name} por I/O ULT`);
        cpu.current = null;
        continue;
      }
      if (!task.children.some(c => c.state === 'ready' || c.state === 'execute')) {
        task.state = 'wait';
        cpu.current = null;
        continue;
      }
      if (config.osAlgo === 'rr' && cpu.quantumLeft <= 0) {
        markTaskReady(task, 'quantum');
        if (task.currentChild && task.currentChild.state === 'execute') {
          markChildReady(task.currentChild, 'quantum');
        }
        task.quantumFromCpu = cpus.indexOf(cpu);
        enteringTasks.push(task);
        log(t, `QUANTUM_EXP ${task.name} en ${cpu.label}`);
        cpu.current = null;
        continue;
      }
      if (task.kind === 'process' && task.currentChild?.runtimeType === 'ULT' && task.currentChild.threadQuantumLeft <= 0) {
        markChildReady(task.currentChild, 'thread-quantum');
        log(t, `ULT_QUANTUM_EXP ${labelOf(task.currentChild)}`);
        task.currentChild = null;
      }
    }

    pushReady(readyQueues, enteringTasks, config);
    sortThreadQueues(readyQueues, config);

    if (config.osAlgo !== 'rr') {
      for (let i = 0; i < cpus.length; i++) {
        const cpu = cpus[i];
        if (!cpu.current) continue;
        const q = queueForCpu(readyQueues, i, config);
        if (q.length && shouldPreempt(cpu.current, q[0], config.osAlgo)) {
          if (cpu.current.currentChild?.state === 'execute') {
            markChildReady(cpu.current.currentChild, 'preempt');
          }
          cpu.current.state = 'ready';
          cpu.current.readyAt = t;
          cpu.current.readyCause = 'preempt';
          cpu.current.readySeq = seq++;
          q.push(cpu.current);
          log(t, `PREEMPT ${cpu.current.name} por ${q[0].name}`);
          cpu.current = null;
          sortThreadQueues(readyQueues, config);
        }
      }
    }

    for (const key of ['io1','io2']) {
      const dev = io[key];
      if (!dev.current && dev.queue.length) {
        dev.current = dev.queue.shift();
        dev.current.ioFinishTime = t + dev.current.bursts[dev.current.burstIdx].duration;
        log(t, `IO_START ${labelOf(dev.current)} en ${dev.label}`);
      }
    }

    for (let i = 0; i < cpus.length; i++) {
      const cpu = cpus[i];
      if (!cpu.current) {
        const queue = queueForCpu(readyQueues, i, config);
        if (queue.length) {
          const task = queue.shift();
          task.state = 'execute';
          cpu.current = task;
          if (config.osAlgo === 'rr') cpu.quantumLeft = config.q[i];
          log(t, `CPU_START ${task.name} en ${cpu.label}`);
        }
      }
    }

    for (const cpu of cpus) {
      const task = cpu.current;
      if (!task) {
        cpu.timeline.push({t, names:['idle'], states: snapshotThreadStates(tasks, runtimeUnits)});
        continue;
      }
      const child = pickThreadChild(task, config, () => seq++);
      if (!child) {
        if (task.children.every(c => c.state === 'kill')) {
          task.state = 'kill';
          task.finishTime = t;
          log(t, `KILL ${task.name} desde ${cpu.label}`);
        } else {
          task.state = 'wait';
        }
        cpu.current = null;
        cpu.timeline.push({t, names:['idle'], states: snapshotThreadStates(tasks, runtimeUnits)});
        continue;
      }
      child.state = 'execute';
      task.currentChild = child;
      const names = child.name === task.name ? [task.name] : [task.name, child.name];
      cpu.timeline.push({t, names, states: snapshotThreadStates(tasks, runtimeUnits)});
      child.cpuRemaining--;
      child.cpuTotalRemaining--;
      task.cpuTotalRemaining--;
      if (config.osAlgo === 'rr') cpu.quantumLeft--;
      if (task.kind === 'process' && child.runtimeType === 'ULT') child.threadQuantumLeft--;
    }

    for (const key of ['io1','io2']) {
      const dev = io[key];
      dev.timeline.push({t, names: dev.current ? [dev.current.name] : ['idle'], states: snapshotThreadStates(tasks, runtimeUnits)});
    }
    t++;
  }

  const parentUnits = tasks.map(task => ({
    type: task.type,
    name: task.name,
    group: task.name,
    arrival: task.arrival,
    totalCPU: task.totalCPU,
    totalIO: task.totalIO,
    finishTime: task.finishTime ?? Math.max(...task.children.map(c => c.finishTime || 0))
  }));
  const visibleUnits = [...parentUnits, ...runtimeUnits.filter(u => u.type === 'ULT')];

  return {
    totalTime: t,
    units: visibleUnits,
    resources: [
      ...cpus.map(c => ({label:c.label, timeline:c.timeline})),
      {label:'I/O1', timeline:io.io1.timeline},
      {label:'I/O2', timeline:io.io2.timeline}
    ]
  };
}

function finishCompletedThreadBursts(task, t, io, log, markChildReady) {
  const child = task.currentChild;
  if (!child || child.cpuRemaining > 0) return false;
  child.burstIdx++;
  if (child.burstIdx >= child.bursts.length) {
    child.state = 'kill';
    child.finishTime = t;
    task.currentChild = null;
    log(t, `THREAD_KILL ${labelOf(child)}`);
    return false;
  }
  const next = child.bursts[child.burstIdx];
  if (next.type === 'cpu') {
    child.cpuRemaining = next.duration;
    markChildReady(child, 'cpu');
  } else {
    child.state = 'wait';
    io[next.type].queue.push(child);
    log(t, `IO_REQ ${labelOf(child)} a ${next.type.toUpperCase()}`);
    task.currentChild = null;
    return task.kind === 'process' && child.runtimeType === 'ULT';
  }
  task.currentChild = null;
  return false;
}

function pickThreadChild(task, config, nextSeq) {
  if (task.kind === 'direct') {
    const child = task.children[0];
    return child.state === 'ready' || child.state === 'execute' ? child : null;
  }
  if (task.currentChild && task.currentChild.state === 'execute') return task.currentChild;
  if (
    task.currentChild
    && task.currentChild.state === 'ready'
    && (task.currentChild.readyCause === 'quantum' || task.currentChild.readyCause === 'preempt')
    && (task.currentChild.runtimeType !== 'ULT' || task.currentChild.threadQuantumLeft > 0)
  ) {
    return task.currentChild;
  }
  const main = task.children.find(c => c.runtimeType === 'MAIN');
  const ults = task.children.filter(c => c.runtimeType === 'ULT');
  if (main && main.state === 'ready' && main.burstIdx === 0) {
    main.readySeq = nextSeq();
    return main;
  }
  const hasLiveUlt = ults.some(c => c.state !== 'kill');
  const ready = (hasLiveUlt ? ults : task.children).filter(c => c.state === 'ready');
  if (!ready.length) return null;
  ready.sort((a,b) => compareByAlgo(a, b, config.threadAlgo) || a.readySeq - b.readySeq || a.name.localeCompare(b.name));
  const child = ready[0];
  if (child.runtimeType === 'ULT' && config.threadAlgo === 'rr' && child.threadQuantumLeft <= 0) {
    child.threadQuantumLeft = config.threadQuantum;
  }
  child.readySeq = nextSeq();
  return child;
}

function sortThreadQueues(queues, config) {
  if (config.osAlgo === 'fifo' || config.osAlgo === 'rr') return;
  queues.forEach(q => q.sort((a,b) => compareTask(a,b,config)));
}

function compareTask(a, b, config) {
  const cmp = compareByAlgo(a, b, config.osAlgo);
  return cmp || compareReadyEntry(a, b);
}

function snapshotStates(units) {
  const states = {};
  for (const u of units) states[u.name] = u.state;
  return states;
}

function snapshotThreadStates(tasks, runtimeUnits) {
  const states = {};
  const taskByName = new Map(tasks.map(task => [task.name, task]));
  for (const task of tasks) states[task.name] = task.state;
  for (const child of runtimeUnits) {
    const owner = taskByName.get(child.ownerName);
    states[child.name] = owner?.state === 'wait' && child.state === 'ready'
      ? 'wait'
      : child.state;
  }
  return states;
}

function renderResult(result) {
  document.getElementById('empty-state').hidden = true;
  document.getElementById('results').hidden = false;
  document.getElementById('total-time').textContent = `Tiempo total: ${result.totalTime}`;

  const colorMap = {};
  result.units.forEach((u, i) => colorMap[u.name] = COLORS[i % COLORS.length]);
  renderLegend(result.units, colorMap);
  renderGantts(result, colorMap);
  renderStats(result.units, colorMap);
  renderTrace();
}

function renderLegend(units, colorMap) {
  const legend = document.getElementById('legend');
  legend.innerHTML = '';
  units.forEach(u => {
    const div = document.createElement('div');
    div.className = 'legend-item';
    div.innerHTML = `<span class="legend-dot" style="background:${colorMap[u.name]}"></span>${labelOf(u)}`;
    legend.appendChild(div);
  });
}

function renderGantts(result, colorMap) {
  const out = document.getElementById('gantt-output');
  out.innerHTML = '';
  const names = result.units.map(u => u.name);
  result.resources.forEach(resource => {
    const block = document.createElement('div');
    block.className = 'gantt-block';
    block.innerHTML = `<div class="gantt-title">${resource.label}</div>`;
    const scroll = document.createElement('div');
    scroll.className = 'gantt-scroll';
    scroll.appendChild(buildGanttTable(resource.timeline, names, result.totalTime, colorMap));
    block.appendChild(scroll);
    out.appendChild(block);
  });
}

function buildGanttTable(timeline, names, totalTime, colorMap) {
  const table = document.createElement('table');
  table.className = 'gantt-table';
  const head = document.createElement('tr');
  head.innerHTML = '<th>Unidad</th>' + Array.from({length: totalTime}, (_, t) => `<th>${t}</th>`).join('');
  table.appendChild(head);
  names.forEach(name => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${escHtml(name)}</td>`;
    for (let t = 0; t < totalTime; t++) {
      const activeNames = timeline[t]?.names || (timeline[t]?.name ? [timeline[t].name] : []);
      const active = activeNames.includes(name);
      const ownerOnly = active && activeNames.length > 1 && activeNames[0] === name;
      const state = timeline[t]?.states?.[name];
      const td = document.createElement('td');
      td.className = active ? `busy${ownerOnly ? ' owner-cell' : ''}` : `idle${state === 'ready' ? ' state-ready' : ''}${state === 'wait' ? ' state-wait' : ''}`;
      if (!active && (state === 'ready' || state === 'wait')) td.title = state === 'ready' ? 'Ready' : 'Wait';
      if (active) {
        td.textContent = ownerOnly ? '' : name;
        if (!ownerOnly) td.style.background = colorMap[name];
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  });
  return table;
}

function renderStats(units, colorMap) {
  const table = document.getElementById('stats-table');
  table.innerHTML = `<thead><tr>
    <th>Unidad</th><th>Tipo</th><th>Grupo</th><th>Arribo</th><th>Fin</th>
    <th>Turnaround</th><th>CPU</th><th>I/O</th><th>Espera</th>
  </tr></thead><tbody></tbody>`;
  const body = table.querySelector('tbody');
  let taSum = 0;
  let waitSum = 0;
  let n = 0;
  units.forEach(u => {
    const ta = u.finishTime == null ? null : u.finishTime - u.arrival;
    const wait = ta == null ? null : Math.max(0, ta - u.totalCPU - u.totalIO);
    if (ta != null) {
      taSum += ta;
      waitSum += wait;
      n++;
    }
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="legend-dot" style="display:inline-block;background:${colorMap[u.name]}"></span> ${escHtml(u.name)}</td>
      <td>${escHtml(u.type)}</td>
      <td>${escHtml(u.group)}</td>
      <td>${u.arrival}</td>
      <td>${u.finishTime ?? '-'}</td>
      <td>${ta ?? '-'}</td>
      <td>${u.totalCPU}</td>
      <td>${u.totalIO}</td>
      <td>${wait ?? '-'}</td>
    `;
    body.appendChild(tr);
  });
  document.getElementById('avg-stats').innerHTML = `
    <span><strong>Prom. Turnaround:</strong> ${n ? (taSum / n).toFixed(2) : '-'}</span>
    <span><strong>Prom. Espera:</strong> ${n ? (waitSum / n).toFixed(2) : '-'}</span>
  `;
}

function renderTrace() {
  const trace = document.getElementById('trace');
  trace.style.display = 'none';
  document.getElementById('trace-toggle').textContent = 'Mostrar';
  trace.innerHTML = traceLines.map(line => {
    let color = 'var(--muted)';
    if (line.includes('ARRIBO')) color = 'var(--green)';
    if (line.includes('CPU_START')) color = 'var(--accent2)';
    if (line.includes('QUANTUM') || line.includes('PREEMPT')) color = 'var(--yellow)';
    if (line.includes('IO_')) color = 'var(--cyan)';
    if (line.includes('KILL')) color = 'var(--red)';
    return `<div style="color:${color}">${escHtml(line)}</div>`;
  }).join('');
}

function toggleTrace() {
  const trace = document.getElementById('trace');
  const show = trace.style.display !== 'block';
  trace.style.display = show ? 'block' : 'none';
  document.getElementById('trace-toggle').textContent = show ? 'Ocultar' : 'Mostrar';
}

function labelOf(u) {
  if (u.type === 'ULT') return `${u.name} (${u.group})`;
  return u.name;
}

function val(id) {
  return document.getElementById(id).value;
}

function escAttr(s) {
  return String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
}

function escHtml(s) {
  return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

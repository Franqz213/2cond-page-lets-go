const COLORS = [
  '#6c5fff','#1de9a0','#ff4d6a','#ffc940','#22d4f5',
  '#ff79c6','#8be9fd','#50fa7b','#ffb86c','#bd93f9',
  '#f1fa8c','#ff6e6e','#43e8d8','#c792ea','#82aaff'
];

const HELP = {
  fifo: 'FIFO: orden de llegada. En empates iniciales se usa orden alfabético; las colisiones de I/O se mantienen FIFO.',
  sjf: 'SJF: ordena por peso total CPU + I/O. No expulsa al proceso en ejecución.',
  spn: 'SPN: ordena por CPU total. No expulsa al proceso en ejecución.',
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
  excel_fifo: {
    cpuCount: 1,
    osAlgo: 'fifo',
    rows: [
      ['Proceso','A','',2,4,'io2',5,6,1],
      ['Proceso','B','',0,3,'io1',3,2,1],
      ['Proceso','C','',6,4,'io2',5,5,1],
      ['Proceso','D','',3,5,'io1',5,5,1],
      ['Proceso','E','',4,4,'none','', '',1],
    ]
  },
  excel_sjf: {
    cpuCount: 1,
    osAlgo: 'sjf',
    rows: [
      ['Proceso','A','',2,3,'io2',2,4,1],
      ['Proceso','B','',0,5,'io1',3,5,1],
      ['Proceso','C','',5,4,'io2',2,4,1],
      ['Proceso','D','',4,2,'io1',2,2,1],
      ['Proceso','E','',3,4,'io1',2,4,1],
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
  onConfigChange();
  loadExample('hilos_xls');
});

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
      bursts[0].duration += cpu2;
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

  while (t < MAX) {
    if (ps.every(p => p.state === 'kill')) break;
    const entering = [];

    for (const p of ps) {
      if (p.state === 'new' && p.arrival === t) {
        p.state = 'ready';
        p.cpuRemaining = p.bursts[p.burstIdx].duration;
        p.readySeq = seq++;
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
        p.state = 'ready';
        p.readySeq = seq++;
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
            p.state = 'ready';
            p.cpuRemaining = next.duration;
            p.readySeq = seq++;
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
        p.state = 'ready';
        p.readySeq = seq++;
        p.quantumFromCpu = cpus.indexOf(cpu);
        entering.push(p);
        cpu.current = null;
        log(t, `QUANTUM_EXP ${labelOf(p)} en ${cpu.label}`);
      } else if (p.type === 'ULT' && config.threadAlgo === 'rr' && p.rrThreadLeft <= 0) {
        p.state = 'ready';
        p.readySeq = seq++;
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
        cpu.timeline.push({t, name:p.name});
        p.cpuRemaining--;
        p.cpuTotalRemaining--;
        if (config.osAlgo === 'rr') cpu.quantumLeft--;
        if (p.type === 'ULT' && config.threadAlgo === 'rr') p.rrThreadLeft--;
      } else {
        cpu.timeline.push({t, name:'idle'});
      }
    }

    for (const key of ['io1','io2']) {
      const dev = io[key];
      if (dev.current) dev.timeline.push({t, name:dev.current.name});
      else dev.timeline.push({t, name:'idle'});
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
  const quantumExpired = entering.filter(p => p.quantumFromCpu != null);
  const normalEntering = entering.filter(p => p.quantumFromCpu == null);
  const incoming = (config.osAlgo === 'fifo' || config.osAlgo === 'rr')
    ? [...normalEntering].sort((a,b) => a.arrival - b.arrival || a.name.localeCompare(b.name))
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
  return a.readySeq - b.readySeq || a.arrival - b.arrival || a.name.localeCompare(b.name);
}

function compareByAlgo(a, b, algo) {
  if (algo === 'sjf') return a.weight - b.weight;
  if (algo === 'spn') return a.totalCPU - b.totalCPU;
  if (algo === 'str') return a.cpuTotalRemaining - b.cpuTotalRemaining;
  if (algo === 'prio') return b.priority - a.priority;
  return 0;
}

function shouldPreempt(current, head, algo) {
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
    if (groupChildren.length) {
      const own = makeRuntime(u, u.name, 'MAIN');
      const children = [
        own,
        ...groupChildren.map(c => makeRuntime({...c, arrival: c.arrival || u.arrival}, u.name, 'ULT'))
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
        threadQueue: [],
        currentChild: null,
        resumeChild: null,
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
        threadQueue: [],
        currentChild: child,
        resumeChild: null,
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
      threadQueue: [],
      currentChild: child,
      resumeChild: null,
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

  while (t < MAX) {
    if (tasks.every(task => task.state === 'kill')) break;
    const enteringTasks = [];

    for (const task of tasks) {
      if (task.state === 'new' && task.arrival === t) {
        task.state = 'ready';
        task.readySeq = seq++;
        for (const child of task.children) {
          if (child.state === 'new') {
            child.state = 'ready';
            child.cpuRemaining = child.bursts[child.burstIdx].duration;
            child.readySeq = seq++;
            enqueueThread(task, child);
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
        child.state = 'ready';
        child.readySeq = seq++;
        const owner = tasks.find(task => task.name === child.ownerName);
        if (owner) enqueueThread(owner, child);
        if (owner && owner.state === 'wait') {
          owner.state = 'ready';
          owner.readySeq = seq++;
          enteringTasks.push(owner);
        }
        log(t, `IO_FIN ${labelOf(child)} en ${dev.label}`);
        dev.current = null;
      }
    }

    for (const cpu of cpus) {
      const task = cpu.current;
      if (!task) continue;
      finishCompletedThreadBursts(task, t, io, log, () => seq++);
      if (task.children.every(c => c.state === 'kill')) {
        task.state = 'kill';
        task.finishTime = t;
        task.children.forEach(c => { if (c.finishTime == null) c.finishTime = t; });
        log(t, `KILL ${task.name} desde ${cpu.label}`);
        cpu.current = null;
        continue;
      }
      if (!task.children.some(c => c.state === 'ready' || c.state === 'execute')) {
        task.state = 'wait';
        cpu.current = null;
        continue;
      }
      if (config.osAlgo === 'rr' && cpu.quantumLeft <= 0) {
        task.state = 'ready';
        task.readySeq = seq++;
        if (task.currentChild && task.currentChild.state === 'execute') {
          task.currentChild.state = 'ready';
          task.currentChild.readySeq = seq++;
          if (task.kind === 'process' && config.threadAlgo === 'rr' && task.currentChild.threadQuantumLeft <= 0) {
            enqueueThread(task, task.currentChild);
            task.resumeChild = null;
            log(t, `ULT_QUANTUM_EXP ${labelOf(task.currentChild)}`);
          } else {
            task.resumeChild = task.currentChild;
          }
          task.currentChild = null;
        }
        task.quantumFromCpu = cpus.indexOf(cpu);
        enteringTasks.push(task);
        log(t, `QUANTUM_EXP ${task.name} en ${cpu.label}`);
        cpu.current = null;
        continue;
      }
      if (task.kind === 'process' && config.threadAlgo === 'rr' && task.currentChild && task.currentChild.threadQuantumLeft <= 0) {
        task.currentChild.state = 'ready';
        task.currentChild.readySeq = seq++;
        if (task.resumeChild === task.currentChild) task.resumeChild = null;
        enqueueThread(task, task.currentChild);
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
            cpu.current.currentChild.state = 'ready';
            cpu.current.currentChild.readySeq = seq++;
            cpu.current.resumeChild = cpu.current.currentChild;
            cpu.current.currentChild = null;
          }
          cpu.current.state = 'ready';
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
        cpu.timeline.push({t, names:['idle']});
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
        cpu.timeline.push({t, names:['idle']});
        continue;
      }
      child.state = 'execute';
      task.currentChild = child;
      cpu.timeline.push({t, names:[child.name]});
      child.cpuRemaining--;
      child.cpuTotalRemaining--;
      task.cpuTotalRemaining--;
      if (config.osAlgo === 'rr') cpu.quantumLeft--;
      if (task.kind === 'process') child.threadQuantumLeft--;
    }

    for (const key of ['io1','io2']) {
      const dev = io[key];
      dev.timeline.push({t, names: dev.current ? [dev.current.name] : ['idle']});
    }
    t++;
  }

  const parentUnits = tasks.map(task => {
    const visible = task.kind === 'process'
      ? task.children.find(child => child.runtimeType === 'MAIN')
      : task.children[0];
    return {
      type: task.type,
      name: task.name,
      group: task.name,
      arrival: task.arrival,
      totalCPU: visible.totalCPU,
      totalIO: visible.totalIO,
      finishTime: visible.finishTime ?? task.finishTime
    };
  });
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

function finishCompletedThreadBursts(task, t, io, log, nextSeq) {
  const child = task.currentChild;
  if (!child || child.cpuRemaining > 0) return;
  child.burstIdx++;
  if (child.burstIdx >= child.bursts.length) {
    child.state = 'kill';
    child.finishTime = t;
    if (task.resumeChild === child) task.resumeChild = null;
    task.currentChild = null;
    log(t, `THREAD_KILL ${labelOf(child)}`);
    return;
  }
  const next = child.bursts[child.burstIdx];
  if (next.type === 'cpu') {
    child.state = 'ready';
    child.cpuRemaining = next.duration;
    child.readySeq = nextSeq();
    if (task.resumeChild === child) task.resumeChild = null;
    enqueueThread(task, child);
    task.currentChild = null;
  } else {
    child.state = 'wait';
    io[next.type].queue.push(child);
    if (task.resumeChild === child) task.resumeChild = null;
    log(t, `IO_REQ ${labelOf(child)} a ${next.type.toUpperCase()}`);
  }
  task.currentChild = null;
}

function pickThreadChild(task, config, nextSeq) {
  if (task.kind === 'direct') {
    const child = task.children[0];
    return child.state === 'ready' || child.state === 'execute' ? child : null;
  }
  if (task.currentChild && task.currentChild.state === 'execute') return task.currentChild;
  if (task.resumeChild && task.resumeChild.state === 'ready' && task.resumeChild.threadQuantumLeft > 0) {
    return task.resumeChild;
  }
  const ready = config.threadAlgo === 'sjf'
    ? task.children.filter(c => c.state === 'ready')
    : cleanThreadQueue(task);
  if (!ready.length) return null;
  if (config.threadAlgo === 'sjf') {
    ready.sort((a,b) => compareByAlgo(a, b, config.threadAlgo) || a.readySeq - b.readySeq || a.name.localeCompare(b.name));
  }
  const child = config.threadAlgo === 'sjf' ? ready[0] : ready.shift();
  task.resumeChild = null;
  if (config.threadAlgo === 'rr') child.threadQuantumLeft = config.threadQuantum;
  child.readySeq = nextSeq();
  return child;
}

function enqueueThread(task, child) {
  if (task.kind !== 'process' || child.state !== 'ready') return;
  task.threadQueue = task.threadQueue || [];
  if (!task.threadQueue.includes(child)) task.threadQueue.push(child);
}

function cleanThreadQueue(task) {
  task.threadQueue = (task.threadQueue || []).filter(child => child.state === 'ready');
  return task.threadQueue;
}

function sortThreadQueues(queues, config) {
  if (config.osAlgo === 'fifo' || config.osAlgo === 'rr') return;
  queues.forEach(q => q.sort((a,b) => compareTask(a,b,config)));
}

function compareTask(a, b, config) {
  const cmp = compareByAlgo(a, b, config.osAlgo);
  return cmp || a.readySeq - b.readySeq || a.arrival - b.arrival || a.name.localeCompare(b.name);
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
      const td = document.createElement('td');
      td.className = active ? `busy${ownerOnly ? ' owner-cell' : ''}` : 'idle';
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

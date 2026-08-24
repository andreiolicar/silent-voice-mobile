export type SystemMetricId = 'battery' | 'connection' | 'latency' | 'modules';

export type SystemModuleId =
  'confirmation' | 'imu' | 'inmp441' | 'myoware' | 'openmv';

export type SystemModule = Readonly<{
  battery: number;
  icon: 'activity' | 'box' | 'camera' | 'eye' | 'mic';
  id: SystemModuleId;
  name: string;
  requirement: 'optional' | 'required';
  rssi: number | null;
  state: 'connected' | 'disconnected';
}>;

export type SystemMetric = Readonly<{
  description: string;
  id: SystemMetricId;
  label: string;
  value: string;
}>;

export type HomeOverview = Readonly<{
  communication: Readonly<{
    description: string;
    title: string;
  }>;
  metrics: readonly SystemMetric[];
  status: Readonly<{
    description: string;
    title: string;
  }>;
  user: Readonly<{
    initial: string;
    name: string;
    welcome: string;
  }>;
}>;

export type HealthMetricId =
  'battery' | 'latency' | 'processor' | 'temperature';

export type HealthMetric = Readonly<{
  description?: string;
  icon: 'activity' | 'battery' | 'cpu' | 'thermometer';
  id: HealthMetricId;
  label: string;
  progress?: number;
  status?: string;
  value: string;
}>;

export type SystemHealth = Readonly<{
  metrics: readonly HealthMetric[];
  privacy: string;
  stability: Readonly<{
    description: string;
    status: string;
    title: string;
  }>;
}>;

export const systemModulesMock = [
  {
    id: 'openmv',
    name: 'OpenMV Cam H7',
    icon: 'camera',
    requirement: 'required',
    state: 'connected',
    rssi: -42,
    battery: 96,
  },
  {
    id: 'myoware',
    name: 'Myoware 2.0',
    icon: 'activity',
    requirement: 'required',
    state: 'connected',
    rssi: -50,
    battery: 100,
  },
  {
    id: 'inmp441',
    name: 'INMP441',
    icon: 'mic',
    requirement: 'required',
    state: 'connected',
    rssi: -58,
    battery: 82,
  },
  {
    id: 'imu',
    name: 'IMU',
    icon: 'box',
    requirement: 'required',
    state: 'connected',
    rssi: -65,
    battery: 22,
  },
  {
    id: 'confirmation',
    name: 'Confirmation',
    icon: 'eye',
    requirement: 'optional',
    state: 'disconnected',
    rssi: null,
    battery: 0,
  },
] as const satisfies readonly SystemModule[];

const requiredModules = systemModulesMock.filter(
  (module) => module.requirement === 'required',
);

export const requiredModuleSummary = {
  connected: requiredModules.filter((module) => module.state === 'connected')
    .length,
  total: requiredModules.length,
} as const;

export const homeOverviewMock: HomeOverview = {
  user: { initial: 'A', name: 'Andrei', welcome: 'Seja bem-vindo' },
  status: {
    title: 'Tudo operacional',
    description: 'Seu sistema está funcionando\nnormalmente.',
  },
  metrics: [
    {
      id: 'battery',
      label: 'Bateria',
      value: '86%',
      description: 'Carregado',
    },
    {
      id: 'latency',
      label: 'Latência',
      value: '142 ms',
      description: 'Tempo',
    },
    {
      id: 'connection',
      label: 'Conexão',
      value: 'BLE +Wi-Fi',
      description: 'Conectado',
    },
    {
      id: 'modules',
      label: 'Módulos',
      value: `${requiredModuleSummary.connected}/${requiredModuleSummary.total}`,
      description: 'Operando',
    },
  ],
  communication: {
    title: 'Pronto para comunicação\nem tempo real',
    description:
      'Todos os sistemas estão ativos e\notimizados para uma comunicação\nclara e contínua.',
  },
};

export const systemHealthMock: SystemHealth = {
  metrics: [
    {
      id: 'battery',
      icon: 'battery',
      label: 'Bateria Li-Po',
      value: '86%',
      progress: 0.8,
      description: 'Carregamento normal.',
    },
    {
      id: 'temperature',
      icon: 'thermometer',
      label: 'Temperatura',
      value: '26°C',
      progress: 0.48,
      description: 'Dentro da faixa ideal.',
    },
    {
      id: 'latency',
      icon: 'activity',
      label: 'Latência',
      value: '142ms',
      status: 'Abaixo de 200ms',
    },
    {
      id: 'processor',
      icon: 'cpu',
      label: 'Uso ESP32-S3',
      value: '48%',
      progress: 0.64,
      description: 'Carregamento normal.',
    },
  ],
  stability: {
    title: 'Estabilidade',
    description: 'Desempenho na última hora.',
    status: 'Estável',
  },
  privacy: 'Seus dados são protegidos e não são compartilhados.',
};

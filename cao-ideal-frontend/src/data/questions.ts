export const questions = [
  {
    id: 'housing',
    title: 'ONDE VOCÊ',
    subtitle: 'MORA ATUALMENTE?',
    options: [
      { label: 'Apartamento pequeno', value: 'APT_SMALL' },
      { label: 'Apartamento médio', value: 'APT_MEDIUM' },
      { label: 'Casa sem quintal', value: 'HOUSE_NO_YARD' },
      { label: 'Casa com quintal pequeno', value: 'HOUSE_YARD_SMALL' },
      { label: 'Casa com quintal grande', value: 'HOUSE_YARD_LARGE' }
    ]
  },
  {
    id: 'timeDedicated',
    title: 'QUANTO TEMPO DIÁRIO',
    subtitle: 'PARA O CACHORRO?',
    options: [
      { label: 'Menos de 30 minutos', value: 'MIN_30' },
      { label: '30 min a 1 hora', value: 'MIN_60' },
      { label: '1 a 2 horas', value: 'HOURS_2' },
      { label: 'Mais de 2 horas', value: 'HOURS_PLUS' }
    ]
  },
  {
    id: 'activityLevel',
    title: 'QUAL SEU NÍVEL DE',
    subtitle: 'ATIVIDADE FÍSICA?',
    options: [
      { label: 'Sedentário', value: 'LOW' },
      { label: 'Levemente ativo', value: 'MEDIUM' },
      { label: 'Ativo', value: 'HIGH' },
      { label: 'Muito ativo (esportes/trilhas)', value: 'VERY_HIGH' }
    ]
  },
  {
    id: 'workRoutine',
    title: 'VOCÊ COSTUMA',
    subtitle: 'TRABALHAR FORA?',
    options: [
      { label: 'Trabalho remoto', value: 'REMOTE' },
      { label: 'Híbrido', value: 'HYBRID' },
      { label: 'Fora meio período', value: 'PART_TIME' },
      { label: 'Fora o dia inteiro', value: 'FULL_TIME' }
    ]
  },
  {
    id: 'household',
    title: 'COM QUEM',
    subtitle: 'VOCÊ MORA?',
    options: [
      { label: 'Moro sozinho', value: 'ALONE' },
      { label: 'Adultos', value: 'ADULTS' },
      { label: 'Adultos e crianças', value: 'ADULTS_KIDS' },
      { label: 'Adultos, crianças e pets', value: 'ADULTS_KIDS_PETS' }
    ]
  },
  {
    id: 'hasChildren',
    title: 'TEM CRIANÇAS',
    subtitle: 'EM CASA OU CONTATO?',
    options: [
      { label: 'Não', value: 'false' },
      { label: 'Sim, ocasionalmente', value: 'OCCASIONAL' },
      { label: 'Sim, diariamente', value: 'true' }
    ]
  },
  {
    id: 'experienceLevel',
    title: 'JÁ TEVE',
    subtitle: 'CACHORRO ANTES?',
    options: [
      { label: 'Nunca tive', value: 'BEGINNER' },
      { label: 'Tive quando criança', value: 'KID_EXP' },
      { label: 'Tive e cuidei ativamente', value: 'INTERMEDIATE' },
      { label: 'Tenho ou tive vários', value: 'ADVANCED' }
    ]
  },
  {
    id: 'messTolerance',
    title: 'COMO LIDAR COM',
    subtitle: 'BAGUNÇA E PELOS?',
    options: [
      { label: 'Não suporto sujeira', value: 'NONE' },
      { label: 'Lido com um pouco', value: 'LITTLE' },
      { label: 'Normal, faz parte', value: 'NORMAL' },
      { label: 'Zero problema', value: 'MAX' }
    ]
  },
  {
    id: 'noiseTolerance',
    title: 'QUANTO BARULHO',
    subtitle: 'VOCÊ TOLERA?',
    options: [
      { label: 'Muito pouco (vizinhos)', value: 'LOW' },
      { label: 'Médio', value: 'MEDIUM' },
      { label: 'Não ligo para latidos', value: 'HIGH' }
    ]
  },
  {
    id: 'reasonForDog',
    title: 'QUAL O MOTIVO DE',
    subtitle: 'QUERER UM CÃO?',
    options: [
      { label: 'Companhia', value: 'COMPANION' },
      { label: 'Segurança', value: 'GUARD' },
      { label: 'Atividade física', value: 'SPORT' },
      { label: 'Apoio emocional', value: 'EMOTIONAL' },
      { label: 'Família / Crianças', value: 'FAMILY' },
      { label: 'Todos os motivos', value: 'ALL' }
    ]
  },
  {
    id: 'investment',
    title: 'ESTÁ DISPOSTO A',
    subtitle: 'INVESTIR EM:',
    options: [
      { label: 'Apenas o básico', value: 'BASIC' },
      { label: 'Premium e Veterinário', value: 'PREMIUM' },
      { label: 'Adestramento profissional', value: 'TRAINING' },
      { label: 'Tudo o que for necessário', value: 'ALL_IN' }
    ]
  },
  {
    id: 'dogProfile',
    title: 'QUAL PERFIL DE CÃO',
    subtitle: 'VOCÊ IMAGINA?',
    options: [
      { label: 'Calmo e independente', value: 'CALM' },
      { label: 'Carinhoso e grudado', value: 'AFFECTIONATE' },
      { label: 'Brincalhão e energético', value: 'PLAYFUL' },
      { label: 'Protetor', value: 'PROTECTOR' },
      { label: 'Não sei, recomendar', value: 'UNKNOWN' }
    ]
  }
];
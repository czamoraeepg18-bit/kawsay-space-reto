// data/missions.ts
import { 
  type StarMapMission, 
  type NasaArticle, 
  type Quiz, 
  type Badge,
  createStarMapMission,
  createBadge 
} from '../types/index';

// ========== MISIONES DEL MAPA ESTELAR ==========
export const STAR_MAP_MISSIONS: StarMapMission[] = [
  {
    ...createStarMapMission('bone-loss', 'PÉRDIDA ÓSEA', 'Microgravedad y Huesos', 'earth', { x: 30, y: 70 }),
    isLocked: false,
    connections: ['bench-to-exploration'],
    difficulty: 'medium',
    estimatedTime: 12
  },
  {
    ...createStarMapMission('bench-to-exploration', 'MEDICINA ESPACIAL', 'Del Laboratorio al Espacio', 'moon', { x: 55, y: 50 }),
    isLocked: true,
    connections: ['cardiovascular-cells'],
    difficulty: 'medium',
    estimatedTime: 15
  },
  {
    ...createStarMapMission('cardiovascular-cells', 'CORAZÓN ESTELAR', 'Células Cardíacas en Órbita', 'mars', { x: 75, y: 35 }),
    isLocked: true,
    connections: ['neural-stem-cells'],
    difficulty: 'hard',
    estimatedTime: 18
  },
  {
    ...createStarMapMission('neural-stem-cells', 'NEURONAS ESPACIALES', 'Células Cerebrales Voladoras', 'europa', { x: 25, y: 20 }),
    isLocked: true,
    connections: [],
    difficulty: 'hard',
    estimatedTime: 16
  }
];

// ========== ARTÍCULOS NASA ==========
// IMPORTANTE: Los IDs deben seguir el patrón: nasa-article-{missionId}
export const NASA_ARTICLES: Record<string, NasaArticle> = {
  // ✅ ARTÍCULO 1: bone-loss
  'nasa-article-bone-loss': {
    id: 'nasa-article-bone-loss',
    title: 'Microgravedad y Pérdida Ósea en el Espacio',
    content: '',
    sections: [
      {
        icon: '🎯',
        title: 'OBJETIVO DE LA MISIÓN',
        type: 'text',
        content: 'Descubrir cómo la microgravedad (o sea, estar en el espacio sin gravedad) afecta los huesos de la pelvis de ratones, para así entender qué pasa con los huesos humanos cuando flotan en el espacio.'
      },
      {
        icon: '🔬',
        title: 'HIPÓTESIS DE LA MISIÓN',
        type: 'list',
        content: [
          'Osteólisis osteocítica: los osteocitos (células del hueso) también estarían destruyendo partes del hueso.',
          'Inhibición del ciclo celular de los osteoblastos: los osteoblastos (células que construyen hueso) dejarían de multiplicarse o funcionar bien, por una proteína llamada CDKN1a/p21.'
        ]
      },
      {
        icon: '🚀',
        title: 'CÓMO HICIERON EL EXPERIMENTO',
        type: 'steps',
        content: [
          { number: 1, description: 'Usaron ratones hembra de cierta edad y los llevaron en la misión espacial (15 días en el transbordador espacial).' },
          { number: 2, description: 'Compararon esos ratones en microgravedad con ratones normales en la Tierra.' },
          { number: 3, description: 'Midieron muchas cosas: volumen de hueso, grosor, actividad de osteoclastos, tamaño de "lagunas" en hueso.' }
        ]
      },
      {
        icon: '📊',
        title: 'RESULTADOS',
        type: 'table',
        content: 'Imagina que los huesos son castillos, y las células que los destruyen son dragones, y las que los reparan son constructores.'
      }
    ],
    conclusions: [
      { icon: '🐉', text: 'En microgravedad, no solo los "dragones" (osteoclastos) atacan el castillo (hueso), sino que los propios habitantes (osteocitos) también hacen daño al alrededor.' },
      { icon: '🔨', text: 'Los "constructores" (osteoblastos) no se multiplican ni reparan como deberían, debido a que CDKN1a/p21 los obliga a pausarse.' },
      { icon: '📉', text: 'Los huesos de la pelvis pierden masa y grosor más rápido de lo que pensaban.' },
      { icon: '👨‍🚀', text: 'Este conocimiento es útil para astronautas, para saber cómo proteger sus huesos en el espacio.' }
    ],
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3630201/',
    publishedDate: new Date('2024-01-15'),
    readingTime: 12,
    tags: ['microgravedad', 'huesos', 'osteoblastos', 'osteoclastos']
  },

  // ✅ ARTÍCULO 2: bench-to-exploration
  'nasa-article-bench-to-exploration': {
    id: 'nasa-article-bench-to-exploration',
    title: 'Del Laboratorio a la Exploración Médica Espacial',
    content: '',
    sections: [
      {
        icon: '🎯',
        title: 'OBJETIVO: ¡Del banco de laboratorio al espacio profundo!',
        type: 'text',
        content: 'La NASA quiere que los científicos terrestres compartan sus descubrimientos médicos con astronautas en misiones largas. Esto se llama "investigación traslacional": llevar algo desde el laboratorio (donde se investiga) hasta la práctica real (proteger a astronautas).'
      },
      {
        icon: '🔬',
        title: 'HIPÓTESIS: ¿Qué pasa con el cuerpo en el espacio?',
        type: 'list',
        content: [
          'El sistema inmune se debilita: los astronautas se enferman más fácil.',
          'Algunos microbios (bacterias/virus) se vuelven más fuertes en el espacio.',
          'Los huesos y músculos se debilitan sin gravedad.',
          'El cuerpo envejece más rápido en condiciones espaciales.'
        ]
      },
      {
        icon: '🚀',
        title: 'EXPERIMENTO: ¿Cómo proteger a los astronautas?',
        type: 'steps',
        content: [
          { number: 1, description: 'Estudiar cómo afecta la microgravedad al sistema inmune.' },
          { number: 2, description: 'Probar vacunas y medicinas que funcionen en el espacio.' },
          { number: 3, description: 'Diseñar contramedidas: ejercicio, dietas especiales, medicamentos.' },
          { number: 4, description: 'Entrenar médicos espaciales para emergencias.' }
        ]
      },
      {
        icon: '📊',
        title: 'RESULTADOS: Súper poderes médicos espaciales',
        type: 'text',
        content: 'Los científicos encontraron formas de fortalecer el sistema inmune en el espacio, desarrollaron medicinas que funcionan en microgravedad, y crearon protocolos médicos para emergencias espaciales. Todo esto ayuda tanto a astronautas como a pacientes en la Tierra.'
      }
    ],
    conclusions: [
      { icon: '🏥', text: 'La investigación traslacional permite llevar descubrimientos del laboratorio al espacio.' },
      { icon: '💪', text: 'Las contramedidas médicas protegen la salud de los astronautas.' },
      { icon: '🌍', text: 'Los avances espaciales también benefician la medicina terrestre.' },
      { icon: '🚀', text: 'Este conocimiento prepara misiones largas a Marte y más allá.' }
    ],
    sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5460236/',
    publishedDate: new Date('2024-02-20'),
    readingTime: 15,
    tags: ['medicina espacial', 'sistema inmune', 'contramedidas']
  },

  // ✅ ARTÍCULO 3: cardiovascular-cells
  'nasa-article-cardiovascular-cells': {
    id: 'nasa-article-cardiovascular-cells',
    title: 'Células del Corazón Cultivadas en la Estación Espacial',
    content: '',
    sections: [
      {
        icon: '🎯',
        title: 'OBJETIVO: ¿Qué le pasa al corazón en el espacio?',
        type: 'text',
        content: 'Investigar cómo las células cardiovasculares progenitoras (CPCs) del corazón se comportan en microgravedad. Las CPCs son células "jóvenes" que pueden convertirse en diferentes tipos de células del corazón.'
      },
      {
        icon: '🔬',
        title: 'HIPÓTESIS: Células del corazón rejuvenecidas',
        type: 'list',
        content: [
          'Las CPCs podrían comportarse diferente en microgravedad.',
          'El espacio podría cambiar cómo se mueven y dividen estas células.',
          'Las CPCs de recién nacidos vs adultos podrían reaccionar diferente.',
          'Estos cambios podrían ayudar a regenerar tejido cardíaco.'
        ]
      },
      {
        icon: '🚀',
        title: 'EXPERIMENTO: Células voladoras',
        type: 'steps',
        content: [
          { number: 1, description: 'Enviaron CPCs de corazones de recién nacidos y adultos a la ISS.' },
          { number: 2, description: 'Las dejaron 4 semanas en el espacio.' },
          { number: 3, description: 'Compararon con células que quedaron en la Tierra.' },
          { number: 4, description: 'Analizaron genes, proteínas y comportamiento celular.' }
        ]
      },
      {
        icon: '📊',
        title: 'RESULTADOS: ¡Rejuvenecimiento celular!',
        type: 'text',
        content: 'Las CPCs de recién nacidos se volvieron más "jóvenes" genéticamente. Migraron mejor (se movieron más rápido). Algunos genes de regeneración se activaron más. Las células adultas también mejoraron, pero menos que las de bebés.'
      }
    ],
    conclusions: [
      { icon: '❤️', text: 'La microgravedad hace que las células del corazón actúen más jóvenes.' },
      { icon: '🔄', text: 'Las CPCs mejoran su capacidad de regeneración en el espacio.' },
      { icon: '🧬', text: 'Los genes de rejuvenecimiento se activan en microgravedad.' },
      { icon: '💊', text: 'Esto podría ayudar a desarrollar terapias para corazones dañados.' }
    ],
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6062551/',
    publishedDate: new Date('2024-03-10'),
    readingTime: 18,
    tags: ['cardiovascular', 'regeneración', 'CPCs']
  },

  // ✅ ARTÍCULO 4: neural-stem-cells
  'nasa-article-neural-stem-cells': {
    id: 'nasa-article-neural-stem-cells',
    title: 'Células Madre Neuronales Volaron al Espacio',
    content: '',
    sections: [
      {
        icon: '🎯',
        title: 'OBJETIVO: ¿Qué le pasa al cerebro en el espacio?',
        type: 'text',
        content: 'Estudiar cómo las células madre neuronales (células que pueden convertirse en neuronas) se comportan en la ISS. Estas células son importantes para reparar el cerebro.'
      },
      {
        icon: '🔬',
        title: 'HIPÓTESIS: Neuronas espaciales',
        type: 'list',
        content: [
          'Las células madre neuronales podrían cambiar en microgravedad.',
          'Su capacidad de convertirse en neuronas podría alterarse.',
          'El metabolismo celular (cómo usan energía) podría cambiar.',
          'Los genes relacionados con el cerebro podrían activarse diferente.'
        ]
      },
      {
        icon: '🚀',
        title: 'EXPERIMENTO: Cerebros voladores',
        type: 'steps',
        content: [
          { number: 1, description: 'Enviaron células madre neuronales humanas a la ISS.' },
          { number: 2, description: 'Permanecieron 39 días en órbita.' },
          { number: 3, description: 'Las compararon con células control en la Tierra.' },
          { number: 4, description: 'Probaron si todavía podían convertirse en neuronas al regresar.' }
        ]
      },
      {
        icon: '📊',
        title: 'RESULTADOS: ¡Modo turbo activado!',
        type: 'text',
        content: 'Las células usaron más oxígeno y glucosa (energía en modo turbo). Los genes de metabolismo se activaron más. Las células mantuvieron su capacidad de convertirse en neuronas. Algunos genes de estrés también se activaron como respuesta al espacio.'
      }
    ],
    conclusions: [
      { icon: '🧠', text: 'Las células madre neuronales sobreviven y funcionan en el espacio.' },
      { icon: '⚡', text: 'Su metabolismo aumenta (usan más energía) en microgravedad.' },
      { icon: '🔬', text: 'Mantienen su capacidad de convertirse en neuronas funcionales.' },
      { icon: '🌟', text: 'Esto abre posibilidades para terapias cerebrales en el espacio.' }
    ],
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8412175/',
    publishedDate: new Date('2024-04-05'),
    readingTime: 16,
    tags: ['neuronas', 'células madre', 'cerebro']
  }
};

// ========== CUESTIONARIOS ==========
export const MISSION_QUIZZES: Record<string, Quiz> = {
  'bone-loss': {
    id: 'quiz-bone-loss',
    missionId: 'bone-loss',
    passingScore: 70,
    timeLimit: 360,
    questions: [
      {
        id: 'bone-q1',
        question: '¿Qué células son conocidas como los "comedores de hueso"?',
        options: ['Osteocitos', 'Osteoblastos', 'Osteoclastos', 'Osteocondrocitos'],
        correctAnswer: 2,
        explanation: 'Los osteoclastos son las células responsables de destruir el tejido óseo.',
        points: 10
      },
      {
        id: 'bone-q2',
        question: '¿Qué proteína inhibe el ciclo celular de los osteoblastos?',
        options: ['MMP-1', 'CDKN1a/p21', 'Helio-3', 'Calcitonina'],
        correctAnswer: 1,
        explanation: 'La proteína CDKN1a/p21 detiene la multiplicación de los osteoblastos.',
        points: 10
      },
      {
        id: 'bone-q3',
        question: '¿Cuántos días duraron los ratones en el espacio?',
        options: ['7 días', '15 días', '30 días', '60 días'],
        correctAnswer: 1,
        explanation: 'Los ratones permanecieron 15 días en el transbordador espacial.',
        points: 10
      }
    ]
  },

  'bench-to-exploration': {
    id: 'quiz-bench-to-exploration',
    missionId: 'bench-to-exploration',
    passingScore: 70,
    timeLimit: 360,
    questions: [
      {
        id: 'bench-q1',
        question: '¿Qué es la investigación traslacional?',
        options: [
          'Solo estudiar el espacio',
          'Llevar descubrimientos del laboratorio a la práctica real',
          'Traducir documentos científicos',
          'Trasladar astronautas al espacio'
        ],
        correctAnswer: 1,
        explanation: 'La investigación traslacional busca llevar los descubrimientos del laboratorio a aplicaciones prácticas.',
        points: 10
      },
      {
        id: 'bench-q2',
        question: '¿Qué le pasa al sistema inmune en el espacio?',
        options: [
          'Se fortalece mucho',
          'Se debilita',
          'No cambia nada',
          'Desaparece completamente'
        ],
        correctAnswer: 1,
        explanation: 'El sistema inmune se debilita en el espacio, haciendo a los astronautas más vulnerables.',
        points: 10
      },
      {
        id: 'bench-q3',
        question: '¿Qué tipo de contramedidas desarrollan los científicos?',
        options: [
          'Solo medicinas',
          'Ejercicio, dietas especiales y medicamentos',
          'Solo ejercicio',
          'Solo dietas'
        ],
        correctAnswer: 1,
        explanation: 'Los científicos desarrollan contramedidas integrales que incluyen ejercicio, dieta y medicamentos.',
        points: 10
      }
    ]
  },

  'cardiovascular-cells': {
    id: 'quiz-cardiovascular',
    missionId: 'cardiovascular-cells',
    passingScore: 70,
    timeLimit: 420,
    questions: [
      {
        id: 'cardio-q1',
        question: '¿Qué son las CPCs?',
        options: [
          'Células Planetarias Cósmicas',
          'Células cardiovasculares progenitoras',
          'Células de la piel',
          'Células del hígado'
        ],
        correctAnswer: 1,
        explanation: 'CPCs son células cardiovasculares progenitoras, células "jóvenes" del corazón.',
        points: 10
      },
      {
        id: 'cardio-q2',
        question: '¿Cuánto tiempo estuvieron las células en el espacio?',
        options: ['1 semana', '2 semanas', '4 semanas', '8 semanas'],
        correctAnswer: 2,
        explanation: 'Las CPCs permanecieron 4 semanas en la Estación Espacial Internacional.',
        points: 10
      },
      {
        id: 'cardio-q3',
        question: '¿Qué pasó con las CPCs tras estar en el espacio?',
        options: [
          'Murieron todas',
          'Se volvieron más jóvenes genéticamente',
          'No cambiaron',
          'Se convirtieron en células de piel'
        ],
        correctAnswer: 1,
        explanation: 'Las CPCs de recién nacidos se volvieron más "jóvenes" genéticamente tras el viaje espacial.',
        points: 10
      }
    ]
  },

  'neural-stem-cells': {
    id: 'quiz-neural',
    missionId: 'neural-stem-cells',
    passingScore: 70,
    timeLimit: 400,
    questions: [
      {
        id: 'neural-q1',
        question: '¿Cuántos días estuvieron las células cerebrales en la ISS?',
        options: ['15 días', '30 días', '39 días', '60 días'],
        correctAnswer: 2,
        explanation: 'Las células madre neuronales estuvieron 39 días en la Estación Espacial Internacional.',
        points: 10
      },
      {
        id: 'neural-q2',
        question: '¿Qué le pasó a la energía de las células en el espacio?',
        options: [
          'Disminuyó mucho',
          'Se mantuvo igual',
          'Aumentó (modo turbo)',
          'Desapareció'
        ],
        correctAnswer: 2,
        explanation: 'Las células usaban más oxígeno y glucosa en el espacio, entraron en "modo turbo".',
        points: 10
      },
      {
        id: 'neural-q3',
        question: '¿Pudieron las células convertirse en neuronas tras volver?',
        options: [
          'No, murieron todas',
          'Sí, seguían pudiendo transformarse',
          'Solo algunas pocas',
          'Se convirtieron en células del corazón'
        ],
        correctAnswer: 1,
        explanation: 'Las células mantuvieron su capacidad de transformarse en neuronas funcionales.',
        points: 10
      }
    ]
  }
};

// ========== INSIGNIAS ==========
export const MISSION_BADGES: Record<string, Badge[]> = {
  'bone-loss': [
    createBadge('bone-scientist', 'Científico Óseo', 'Estudió la pérdida ósea espacial', '🦴', 'rare')
  ],
  'bench-to-exploration': [
    createBadge('space-medic', 'Médico Espacial', 'Domina la medicina espacial', '🏥', 'rare')
  ],
  'cardiovascular-cells': [
    createBadge('heart-explorer', 'Explorador Cardíaco', 'Investigó células del corazón', '❤️', 'epic')
  ],
  'neural-stem-cells': [
    createBadge('brain-pioneer', 'Pionero Cerebral', 'Estudió neuronas espaciales', '🧠', 'epic')
  ]
};
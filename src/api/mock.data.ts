import type {
  AuthTokens,
  Center,
  Appointment,
  Campaign,
  CenterPanelData,
  FAQ,
  Myth,
} from '../types';

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const MOCK_AUTH: AuthTokens = {
  access_token: 'mock.access.token',
  refresh_token: 'mock.refresh.token',
  user: {
    id: 'u-001',
    nombre: 'María Rodríguez',
    email: 'maria@ejemplo.com',
    telefono: '+57 300 123 4567',
    rol: 'DONOR',
  },
};

// ─── Centers ──────────────────────────────────────────────────────────────────

export const MOCK_CENTERS: Center[] = [
  {
    id: 'c-001',
    nombre: 'Estética Bella',
    zona: 'Chapinero',
    ciudad: 'Bogotá',
    direccion: 'Cra 7 #63-44',
    horarios: 'Lun-Vie 9AM-6PM, Sáb 10AM-4PM',
    rating: 4.8,
    reviews: 127,
    verificado: true,
    servicios: ['Corte especializado', 'Asesoría gratuita'],
    telefono: '+57 300 123 4567',
    lat: 4.6490,
    lng: -74.0628,
  },
  {
    id: 'c-002',
    nombre: 'Salón Esperanza',
    zona: 'Usaquén',
    ciudad: 'Bogotá',
    direccion: 'Calle 116 #15-08',
    horarios: 'Lun-Sáb 8AM-7PM',
    rating: 4.9,
    reviews: 98,
    verificado: true,
    servicios: ['Corte especializado', 'Empaque profesional', 'Donación grupal'],
    telefono: '+57 301 234 5678',
    lat: 4.6963,
    lng: -74.0315,
  },
  {
    id: 'c-003',
    nombre: 'Corte con Causa',
    zona: 'Centro',
    ciudad: 'Bogotá',
    direccion: 'Calle 19 #5-14',
    horarios: 'Lun-Vie 10AM-5PM',
    rating: 4.7,
    reviews: 84,
    verificado: true,
    servicios: ['Corte especializado', 'Certificado de donación'],
    telefono: '+57 302 345 6789',
    lat: 4.6120,
    lng: -74.0718,
  },
  {
    id: 'c-004',
    nombre: 'Belleza Solidaria',
    zona: 'Suba',
    ciudad: 'Bogotá',
    direccion: 'Cra 91 #145-32',
    horarios: 'Mar-Sáb 9AM-6PM',
    rating: 4.6,
    reviews: 56,
    verificado: true,
    servicios: ['Corte especializado', 'Parking gratuito'],
    telefono: '+57 303 456 7890',
    lat: 4.7411,
    lng: -74.0929,
  },
];

// ─── Appointments ─────────────────────────────────────────────────────────────

export const MOCK_MY_APPOINTMENT: Appointment = {
  id: 'DON-2026-001234',
  donante: 'María Rodríguez',
  email: 'maria@ejemplo.com',
  telefono: '+57 300 123 4567',
  centro: {
    id: 'c-001',
    nombre: 'Estética Bella',
    direccion: 'Cra 7 #63-44, Chapinero',
    telefono: '+57 300 123 4567',
  },
  fecha: '5 de marzo, 2026',
  hora: '10:00 AM',
  estado: 'Realizada',
  creadoEn: '2026-02-25T15:45:00.000Z',
};

// ─── Campaigns ────────────────────────────────────────────────────────────────

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-001',
    titulo: 'Marzo Rosa 2026',
    descripcion:
      'Únete a nuestra campaña especial del mes de la mujer. Convoca a tus amigas, familiares y compañeras de trabajo para donar juntas y generar un impacto colectivo.',
    estado: 'Activa',
    progreso: 327,
    meta: 500,
    unidad: 'donaciones',
    fechaInicio: '1 de marzo',
    fechaFin: '31 de marzo',
    participantes: 327,
    tipo: 'nacional',
    iconTipo: 'heart',
  },
  {
    id: 'camp-002',
    titulo: 'Empresas Solidarias',
    descripcion:
      'Empresas colombianas se unen para organizar jornadas de donación corporativas. Inscribe a tu empresa y coordina una jornada en tus oficinas.',
    estado: 'Activa',
    meta: 15,
    unidad: 'empresas',
    fechaInicio: 'Febrero 2026',
    fechaFin: 'Diciembre 2026',
    participantes: 243,
    tipo: 'corporativo',
    iconTipo: 'users',
  },
  {
    id: 'camp-003',
    titulo: 'Universidades con Causa',
    descripcion:
      'Estudiantes universitarios lideran la donación solidaria en sus campus. Inscribe a tu universidad y organiza jornadas con tus compañeros.',
    estado: 'Activa',
    progreso: 147,
    meta: 200,
    unidad: 'estudiantes',
    fechaInicio: 'Enero 2026',
    fechaFin: 'Junio 2026',
    participantes: 147,
    tipo: 'universitario',
    iconTipo: 'megaphone',
  },
];

// ─── Center Panel ─────────────────────────────────────────────────────────────

export const MOCK_CENTER_PANEL: CenterPanelData = {
  centro: MOCK_CENTERS[0],
  citasHoy: [
    {
      id: 'DON-2026-001234',
      hora: '10:00 AM',
      donante: 'María Rodríguez',
      telefono: '+57 300 123 4567',
      estado: 'Agendada',
      notas: 'Primera donación, preguntar sobre largo final deseado',
    },
    {
      id: 'DON-2026-001235',
      hora: '11:30 AM',
      donante: 'Ana Martínez',
      telefono: '+57 301 234 5678',
      estado: 'Confirmada',
      notas: '',
    },
    {
      id: 'DON-2026-001236',
      hora: '02:00 PM',
      donante: 'Camila López',
      telefono: '+57 302 345 6789',
      estado: 'Agendada',
      notas: 'Cabello rizado, 25 cm aproximadamente',
    },
  ],
  citasSemana: [
    { id: 'DON-2026-001237', fecha: '28 Feb', hora: '09:00 AM', donante: 'Laura Gómez',      estado: 'Agendada' },
    { id: 'DON-2026-001238', fecha: '28 Feb', hora: '03:00 PM', donante: 'Sofía Castro',     estado: 'Agendada' },
    { id: 'DON-2026-001239', fecha: '1 Mar',  hora: '10:00 AM', donante: 'Daniela Ruiz',     estado: 'Agendada' },
    { id: 'DON-2026-001240', fecha: '1 Mar',  hora: '11:00 AM', donante: 'Valentina Pérez',  estado: 'Agendada' },
    { id: 'DON-2026-001241', fecha: '3 Mar',  hora: '02:00 PM', donante: 'Isabella Torres',  estado: 'Agendada' },
  ],
  estadisticas: { confirmadas: 24, pendientes: 8, totalMes: 32 },
  proximaRecoleccion: {
    fecha: 'Lunes, 2 de marzo',
    hora: '10:00 AM - 11:00 AM',
    paquetes: 18,
  },
};

// ─── Community ────────────────────────────────────────────────────────────────

export const MOCK_FAQS: FAQ[] = [
  { id: 'faq-001', pregunta: '¿Puedo donar cabello teñido o con mechas?', respuesta: 'Sí, en la mayoría de los casos el cabello teñido es aceptado siempre que esté en buen estado. Sin embargo, te recomendamos consultar directamente con el centro aliado al momento de agendar, ya que algunos tratamientos químicos muy fuertes pueden afectar la calidad del cabello.' },
  { id: 'faq-002', pregunta: '¿Cuál es el largo mínimo de cabello para donar?', respuesta: 'El largo mínimo sugerido es de 20 cm, medidos desde la raíz hasta las puntas. Este largo puede variar según la campaña o el destino final del cabello.' },
  { id: 'faq-003', pregunta: '¿Cómo debo amarrar mi cabello antes del corte?', respuesta: 'Debes hacer una trenza firme o una coleta bien amarrada con una banda elástica. Evita usar clips metálicos.' },
  { id: 'faq-004', pregunta: '¿Dónde puedo donar mi cabello de forma segura?', respuesta: 'Solo debes donar en centros aliados verificados que aparecen en nuestra plataforma. Usa nuestro buscador o mapa para encontrar el centro más cercano.' },
  { id: 'faq-005', pregunta: '¿Qué pasa con mi cabello después de donarlo?', respuesta: 'Después de la donación, el centro aliado empaca tu cabello y lo envía a fundaciones especializadas en la elaboración de pelucas oncológicas.' },
  { id: 'faq-006', pregunta: '¿La donación tiene algún costo?', respuesta: 'No, la donación de cabello es completamente gratuita. Los centros aliados no cobran por el corte de donación.' },
  { id: 'faq-007', pregunta: '¿Puedo donar si tengo el cabello corto?', respuesta: 'Si actualmente tienes el cabello corto pero quieres donar en el futuro, puedes dejarlo crecer hasta alcanzar el largo mínimo de 20 cm.' },
  { id: 'faq-008', pregunta: '¿Cómo sé que mi donación realmente llegó a alguien?', respuesta: 'Una vez que el centro aliado confirma tu donación en el sistema, queda registrada oficialmente. DonaCabello trabaja con fundaciones verificadas que entregan las pelucas a pacientes oncológicos.' },
];

export const MOCK_MYTHS: Myth[] = [
  { id: 'myth-001', mito: 'Solo las mujeres pueden donar cabello',         verdad: 'Falso. Cualquier persona, sin importar su género, puede donar cabello.',                                                         tipo: 'falso'   },
  { id: 'myth-002', mito: 'Donar cabello es doloroso o dañino',            verdad: 'Falso. Donar cabello es simplemente un corte de cabello normal.',                                                                    tipo: 'falso'   },
  { id: 'myth-003', mito: 'El cabello debe ser virgen (sin químicos)',      verdad: 'Parcialmente falso. Aunque el cabello sin tratamientos es ideal, muchas veces se acepta cabello teñido en buen estado.',             tipo: 'parcial' },
  { id: 'myth-004', mito: 'No puedo donar si tengo canas',                 verdad: 'Falso. El cabello con canas es perfectamente aceptable para donar.',                                                                  tipo: 'falso'   },
  { id: 'myth-005', mito: 'Tengo que cortarme todo el cabello',            verdad: 'Falso. Solo se corta la cantidad necesaria para cumplir con el largo mínimo.',                                                        tipo: 'falso'   },
  { id: 'myth-006', mito: 'Las pelucas se venden con fines lucrativos',    verdad: 'Falso. Las pelucas se entregan gratuitamente a pacientes oncológicos.',                                                               tipo: 'falso'   },
];

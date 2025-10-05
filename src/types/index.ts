// types/index.ts - Definición de tipos para la aplicación

// Tipos para los astronautas
export interface Astronaut {
  id: number;
  name: string;
  color: string;
  avatar: string;
  mission?: string;
  status?: 'active' | 'inactive' | 'on-mission';
}

// Tipos para las misiones
export interface Mission {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  type: 'new' | 'power' | 'completed';
  badge: string;
  color: string;
  description?: string;
  duration?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

// Tipos para formularios
export interface LoginFormData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Tipos para props de componentes principales
export interface CreateAccountButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface AstronautPanelProps {
  selectedAstronaut?: number;
  onAstronautSelect?: (id: number) => void;
  astronauts?: Astronaut[];
}

export interface LoginPanelProps {
  onLogin?: (data: LoginFormData) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export interface MissionNewsPanelProps {
  missions?: Mission[];
  onMissionClick?: (mission: Mission) => void;
}

// Tipos para props de componentes específicos de MainDashboard
export interface StarFieldProps {
  starCount: number;
  className?: string;
  animated?: boolean;
}

export interface GlassPanelProps {
  children: React.ReactNode;
  curved?: boolean;
  animated?: boolean;
  glowEffect?: boolean;
  borderColor?: 'cyan' | 'blue' | 'green' | 'red' | 'yellow';
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  className?: string;
}

export interface PlanetEarthProps {
  size: number;
  rotationSpeed?: number;
  showAtmosphere?: boolean;
  showClouds?: boolean;
  showRocket?: boolean;
  className?: string;
}

export interface NavigationButtonProps {
  icon?: string;
  text?: string;
  variant?: 'profile' | 'logic' | 'account' | 'info' | 'question' | 'help';
  size?: 'small' | 'medium' | 'large';
  active?: boolean;
  onClick?: () => void;
  tooltip?: string;
  disabled?: boolean;
}

// Tipos para MainDashboard
export interface MainDashboardProps {
  onNavigate?: (route: string) => void;
  userName?: string;
  userAvatar?: string;
  systemStatus?: {
    system: 'online' | 'offline' | 'maintenance';
    connection: 'stable' | 'unstable' | 'disconnected';
    explorer: string;
  };
}

// Tipos para estados de la aplicación
export interface AppState {
  user: {
    name: string;
    avatar?: string;
    isLoggedIn: boolean;
  };
  currentView: 'login' | 'register' | 'dashboard' | 'mission';
  selectedMission?: Mission;
  loading: boolean;
  error: string | null;
}

// Tipos para rutas
export type RouteNames = 
  | 'login'
  | 'register' 
  | 'dashboard'
  | 'profile'
  | 'settings'
  | 'team'
  | 'info'
  | 'about'
  | 'faq'
  | 'help'
  | 'missions'
  | `mission-${number}`;

// Tipos para eventos
export interface NavigationEvent {
  route: RouteNames;
  timestamp: Date;
  source: 'button' | 'keyboard' | 'programmatic';
}

// Tipos para configuración
export interface AppConfig {
  theme: 'dark' | 'light';
  language: 'es' | 'en';
  animations: boolean;
  soundEffects: boolean;
}

// Interfaces para errores personalizados (en lugar de clases)
export interface NavigationErrorData {
  name: 'NavigationError';
  message: string;
  route: string;
  source: string;
}

export interface MissionErrorData {
  name: 'MissionError';
  message: string;
  missionId: number;
}

// Factory functions para crear errores (reemplazo de las clases)
export function createNavigationError(
  message: string,
  route: string,
  source: string
): NavigationErrorData {
  return {
    name: 'NavigationError',
    message,
    route,
    source
  };
}

export function createMissionError(
  message: string,
  missionId: number
): MissionErrorData {
  return {
    name: 'MissionError',
    message,
    missionId
  };
}

// Tipos para utilidades
export interface Coordinates {
  x: number;
  y: number;
  z?: number;
}

// Tipos para constantes (reemplazo de as const)
export type MissionType = 'new' | 'power' | 'completed';
export type NavigationVariant = 'profile' | 'logic' | 'account' | 'info' | 'question' | 'help';
export type SystemStatus = 'online' | 'offline' | 'maintenance';

// Arrays de constantes normales (sin as const)
export const MISSION_TYPES: MissionType[] = ['new', 'power', 'completed'];
export const NAVIGATION_VARIANTS: NavigationVariant[] = ['profile', 'logic', 'account', 'info', 'question', 'help'];
export const SYSTEM_STATUS_OPTIONS: SystemStatus[] = ['online', 'offline', 'maintenance'];

// Funciones de utilidad para validación de tipos
export function isMissionType(value: string): value is MissionType {
  return MISSION_TYPES.includes(value as MissionType);
}

export function isNavigationVariant(value: string): value is NavigationVariant {
  return NAVIGATION_VARIANTS.includes(value as NavigationVariant);
}

export function isSystemStatus(value: string): value is SystemStatus {
  return SYSTEM_STATUS_OPTIONS.includes(value as SystemStatus);
}

// Constantes adicionales para la aplicación
export const DEFAULT_ANIMATION_DURATION = 300;
export const DEFAULT_USER_NAME = "Futuro Explorador";
export const MAX_STARS_COUNT = 500;
export const MIN_STARS_COUNT = 50;

// Tipos para autenticación (compatibilidad hacia atrás)
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// types/starmap.ts - Tipos específicos para el mapa estelar

// Tipos principales para misiones del mapa estelar
export interface StarMapMission {
  id: string;
  name: string;
  description: string;
  planetType: 'earth' | 'mars' | 'moon' | 'europa' | 'paracas';
  position: { x: number; y: number };
  isLocked: boolean;
  isCompleted: boolean;
  nasaArticleId: string;
  connections: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  estimatedTime?: number; // en minutos
}

// Tipos para progreso del usuario
export interface UserProgress {
  level: number;
  completedMissions: string[];
  badges: Badge[];
  currentMission?: string;
  experience: number;
  totalMissionsCompleted: number;
}

// Tipos para badges/insignias
export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

// Tipos para cuestionarios
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  points: number;
}

export interface Quiz {
  id: string;
  missionId: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // en segundos
}

// Tipos para artículos de NASA
export interface NasaArticle {
  id: string;
  title: string;
  content: string;
  sections?: ArticleSection[];        // ← AGREGAR ESTA LÍNEA
  conclusions?: ArticleConclusion[];  // ← AGREGAR ESTA LÍNEA
  imageUrl?: string;
  videoUrl?: string;
  sourceUrl: string;
  publishedDate: Date;
  readingTime: number;
  tags: string[];
}

// Props para componentes del mapa estelar
export interface StarMapProps {
  onMissionSelect?: (missionId: string) => void;
  onNavigate?: (route: string) => void;
  userProgress?: UserProgress;
  className?: string;
}

export interface PlanetNodeProps {
  mission: StarMapMission;
  isSelected?: boolean;
  onClick: (missionId: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export interface UserProfileProps {
  level: number;
  userName: string;
  badges: Badge[];
  experience?: number;
  className?: string;
}

export interface MissionPanelProps {
  activeMissions: StarMapMission[];
  unlockedPowers: string[];
  className?: string;
}

export interface ConnectionLinesProps {
  missions: StarMapMission[];
  className?: string;
}

export interface NavigationBarProps {
  onNavigate: (route: string) => void;
  activeSection: string;
  className?: string;
}

// Tipos para el estado global del mapa estelar
export interface StarMapState {
  missions: StarMapMission[];
  selectedMission: string | null;
  userProgress: UserProgress;
  isLoading: boolean;
  error: string | null;
}

// Tipos para eventos del mapa estelar
export interface MissionSelectEvent {
  missionId: string;
  mission: StarMapMission;
  timestamp: Date;
}

export interface MissionCompleteEvent {
  missionId: string;
  score: number;
  timeSpent: number;
  badgesEarned: Badge[];
  timestamp: Date;
}

// Tipos para configuración de planetas
export interface PlanetConfig {
  type: 'earth' | 'mars' | 'moon' | 'europa' | 'paracas';
  color: string;
  icon: string;
  hasRing: boolean;
  atmosphereColor: string;
  size: 'small' | 'medium' | 'large';
}

// Constantes para planetas
export const PLANET_CONFIGS: Record<string, PlanetConfig> = {
  earth: {
    type: 'earth',
    color: '#00D4FF',
    icon: '🌍',
    hasRing: false,
    atmosphereColor: 'rgba(0, 212, 255, 0.3)',
    size: 'large'
  },
  mars: {
    type: 'mars',
    color: '#FF6B35',
    icon: '🔴',
    hasRing: false,
    atmosphereColor: 'rgba(255, 107, 53, 0.3)',
    size: 'medium'
  },
  moon: {
    type: 'moon',
    color: '#E0E0E0',
    icon: '🌙',
    hasRing: false,
    atmosphereColor: 'rgba(224, 224, 224, 0.3)',
    size: 'small'
  },
  europa: {
    type: 'europa',
    color: '#4ECDC4',
    icon: '🛰️',
    hasRing: true,
    atmosphereColor: 'rgba(78, 205, 196, 0.3)',
    size: 'medium'
  },
  paracas: {
    type: 'paracas',
    color: '#9B59B6',
    icon: '🪐',
    hasRing: true,
    atmosphereColor: 'rgba(155, 89, 182, 0.3)',
    size: 'large'
  }
};

// Tipos para animaciones
export interface AnimationConfig {
  duration: number;
  easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  delay?: number;
  iterations?: number | 'infinite';
}

// Tipos para posicionamiento
export interface Position {
  x: number;
  y: number;
  z?: number;
}

export interface ConnectionLine {
  fromMission: string;
  toMission: string;
  fromPosition: Position;
  toPosition: Position;
  isActive: boolean;
}

// Utilidades para validación de tipos
export function isValidPlanetType(type: string): type is PlanetConfig['type'] {
  return ['earth', 'mars', 'moon', 'europa', 'paracas'].includes(type);
}

export function isValidBadgeRarity(rarity: string): rarity is Badge['rarity'] {
  return ['common', 'rare', 'epic', 'legendary'].includes(rarity);
}

// Factory functions para crear objetos
export function createStarMapMission(
  id: string,
  name: string,
  description: string,
  planetType: PlanetConfig['type'],
  position: Position
): StarMapMission {
  return {
    id,
    name,
    description,
    planetType,
    position,
    isLocked: true,
    isCompleted: false,
    nasaArticleId: `nasa-article-${id}`,
    connections: [],
    difficulty: 'medium',
    estimatedTime: 15
  };
}

export function createBadge(
  id: string,
  name: string,
  description: string,
  icon: string,
  rarity: Badge['rarity'] = 'common'
): Badge {
  return {
    id,
    name,
    icon,
    description,
    rarity,
    unlockedAt: new Date()
  };
}

export function createUserProgress(): UserProgress {
  return {
    level: 1,
    completedMissions: [],
    badges: [],
    experience: 0,
    totalMissionsCompleted: 0
  };
}

// Constantes por defecto
export const DEFAULT_MISSION_TIME = 15;
export const DEFAULT_QUIZ_PASSING_SCORE = 70;
export const DEFAULT_QUIZ_TIME_LIMIT = 300; // 5 minutos
export const POINTS_PER_CORRECT_ANSWER = 10;
export const EXPERIENCE_PER_MISSION = 100;

export interface ArticleSection {
  icon: string;
  title: string;
  content: string | string[] | ArticleStep[];
  type?: 'text' | 'list' | 'steps' | 'table' | 'conclusion';
}

export interface ArticleStep {
  number: number;
  description: string;
}

export interface ArticleConclusion {
  icon: string;
  text: string;
}

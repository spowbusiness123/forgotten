import { logger } from '../utils/logger.js';

export const botConfig = {
  // =========================
  // СТАТУС БОТА (что видят пользователи под именем)
  // =========================
  // Варианты `status`:
  // - "online"    = зелёный круг
  // - "idle"      = жёлтая луна
  // - "dnd"       = красный кирпич ("не беспокоить")
  // - "invisible" = оффлайн
  presence: {
    // Текущий онлайн-статус в Discord
    status: "online",

    // Строки активности под именем бота
    // Маппинг типов Discord API:
    // 0 = Играет в
    // 1 = Стримит
    // 2 = Слушает
    // 3 = Смотрит
    // 4 = Пользовательский статус (Custom)
    // 5 = Соревнуется в
    activities: [
      {
        name: "Custom Status", // Требуется Discord API, в клиенте не отображается
        state: "Следит за сервером", // Это то, что реально видят пользователи
        type: 4,               // Custom
      },
    ],
  },

  // =========================
  // ПОВЕДЕНИЕ КОМАНД
  // =========================
  commands: {
    // ID владельцев бота (через запятую в env-переменной OWNER_IDS)
    owners: process.env.OWNER_IDS?.split(",").map((id) => id.trim()).filter(Boolean) || [],

    // Стандартный задержка между командами (в секундах)
    defaultCooldown: 3,

    // Если true, старые команды удаляются перед повторной регистрацией
    deleteCommands: false,

    // Опциональный ID тестового сервера
    testGuildId: process.env.TEST_GUILD_ID,

    // Когда true (или MAINTENANCE_MODE=true), только владельцы могут вызывать команды
    maintenanceMode: process.env.MAINTENANCE_MODE === "true",

    // Префикс для текстовых команд (например, "!" для "!ping")
    prefix: process.env.PREFIX || "!",
  },

  // =========================
  // СИСТЕМА ЗАЯВОК (APPLICATIONS)
  // =========================
  applications: {
    // Вопросы по умолчанию при заполнении заявки
    defaultQuestions: [
      { question: "Как вас зовут?", required: true },
      { question: "Сколько вам лет?", required: true },
      { question: "Почему вы хотите присоединиться?", required: true },
    ],

    // Цвета Embed-сообщений по статусу заявки
    statusColors: {
      pending: "#FFA500",
      approved: "#00FF00",
      denied: "#FF0000",
    },

    // Задержка перед повторной подачей заявки (в часах)
    applicationCooldown: 24,

    // Авто-удаление отклонённых заявок через N дней
    deleteDeniedAfter: 7,

    // Авто-удаление одобренных заявок через N дней
    deleteApprovedAfter: 30,

    // ID ролей, которым разрешено управлять заявками
    managerRoles: [], 
  },

  // =========================
  // ЦВЕТА EMBED И БРЕНДИНГ
  // =========================
  embeds: {
    colors: {
      // Основные цвета бренда
      primary: "#336699",
      secondary: "#2F3136",

      // Стандартные цвета статусов
      success: "#57F287",
      error: "#ED4245",
      warning: "#FEE75C",
      info: "#3498DB",

      // Нейтральные утилитарные цвета
      light: "#FFFFFF",
      dark: "#202225",
      gray: "#99AAB5",

      // Ярлыки палитры Discord
      blurple: "#5865F2",
      green: "#57F287",
      yellow: "#FEE75C",
      fuchsia: "#EB459E",
      red: "#ED4245",
      black: "#000000",

      // Цвета отдельных систем
      giveaway: {
        active: "#57F287",
        ended: "#ED4245",
      },
      ticket: {
        open: "#57F287",
        claimed: "#FAA61A",
        closed: "#ED4245",
        pending: "#99AAB5",
      },
      economy: "#F1C40F",
      birthday: "#E91E63",
      moderation: "#9B59B6",

      // Приоритеты тикетов
      priority: {
        none: "#95A5A6",
        low: "#3498db",
        medium: "#2ecc71",
        high: "#f1c40f",
        urgent: "#e74c3c",
      },
    },
    footer: {
      // Текст футера по умолчанию
      text: "Titan Bot",
      icon: null,
    },
    thumbnail: null,
    author: {
      name: null,
      icon: null,
      url: null,
    },
  },

  // =========================
  // ЭКОНОМИКА
  // =========================
  economy: {
    currency: {
      name: "монета",
      namePlural: "монет",
      symbol: "🪙",
    },

    startingBalance: 0,
    baseBankCapacity: 100000,
    dailyAmount: 100,

    workMin: 10,
    workMax: 100,

    begMin: 5,
    begMax: 50,

    cooldowns: {
      daily: 24 * 60 * 60 * 1000,
      work: 60 * 60 * 1000,
      crime: 2 * 60 * 60 * 1000,
      rob: 4 * 60 * 60 * 1000,
    },

    robSuccessRate: 0.4,
    robFailJailTime: 3600000,
  },

  // =========================
  // МАГАЗИН
  // =========================
  shop: {},

  // =========================
  // СИСТЕМА ТИКЕТОВ
  // =========================
  tickets: {
    defaultCategory: null,
    supportRoles: [],

    priorities: {
      none: {
        emoji: "⚪",
        color: "#95A5A6",
        label: "Нет",
      },
      low: {
        emoji: "🟢",
        color: "#2ECC71",
        label: "Низкий",
      },
      medium: {
        emoji: "🟡",
        color: "#F1C40F",
        label: "Средний",
      },
      high: {
        emoji: "🔴",
        color: "#E74C3C",
        label: "Высокий",
      },
      urgent: {
        emoji: "🚨",
        color: "#E91E63",
        label: "Срочный",
      },
    },

    defaultPriority: "none",
    archiveCategory: null,
    logChannel: null,
  },

  // =========================
  // РОЗЫГРЫШИ (GIVEAWAYS)
  // =========================
  giveaways: {
    defaultDuration: 86400000,
    minimumWinners: 1,
    maximumWinners: 10,
    minimumDuration: 300000,
    maximumDuration: 2592000000,
    allowedRoles: [],
    bypassRoles: [],
  },

  // =========================
  // ДНИ РОЖДЕНИЯ
  // =========================
  birthday: {
    defaultRole: null,
    announcementChannel: null,
    timezone: "Europe/Moscow",
  },

  // =========================
  // ВЕРИФИКАЦИЯ
  // =========================
  verification: {
    defaultMessage: "Нажмите кнопку ниже, чтобы пройти верификацию и получить доступ к серверу!",
    defaultButtonText: "Пройти верификацию",

    autoVerify: {
      defaultCriteria: "none",
      defaultAccountAgeDays: 7,
      serverSizeThreshold: 1000,
      minAccountAge: 1,
      maxAccountAge: 365,
      sendDMNotification: true,

      criteria: {
        account_age: "Возраст аккаунта должен быть старше указанного количества дней",
        server_size: "Все пользователи, если на сервере меньше 1000 участников",
        none: "Все пользователи автоматически"
      }
    },

    verificationCooldown: 5000,
    maxVerificationAttempts: 3,
    attemptWindow: 60000,

    maxCooldownEntries: 10000,
    maxAttemptEntries: 10000,
    cooldownCleanupInterval: 300000,
    maxAuditMetadataBytes: 4096,
    maxInMemoryAuditEntries: 1000,
    logAllVerifications: true,
    keepAuditTrail: true,
  },

  // =========================
  // ПРИВЕТСТВИЯ И ПРОЩАНИЯ
  // =========================
  welcome: {
    defaultWelcomeMessage:
      "Добро пожаловать, {user}, на сервер {server}! Теперь нас {memberCount} участников!",
    defaultGoodbyeMessage:
      "Пользователь {user} покинул сервер. Нас осталось {memberCount} участников.",
    defaultWelcomeChannel: null,
    defaultGoodbyeChannel: null,
  },

  // =========================
  // КАНАЛЫ-СЧЁТЧИКИ
  // =========================
  counters: {
    defaults: {
      name: "Счётчик {name}",
      description: "Счётчик сервера {name}",
      type: "voice",
      channelName: "{name}: {count}",
    },
    permissions: {
      deny: ["VIEW_CHANNEL"],
      allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
    },
    messages: {
      created: "✅ Создан счётчик **{name}**",
      deleted: "🗑️ Удалён счётчик **{name}**",
      updated: "🔄 Обновлён счётчик **{name}**",
    },
    types: {
      members: {
        name: "👥 Участники",
        description: "Всего участников на сервере",
        getCount: (guild) => guild.memberCount.toString(),
      },
      bots: {
        name: "🤖 Боты",
        description: "Всего ботов на сервере",
        getCount: (guild) =>
          guild.members.cache.filter((m) => m.user.bot).size.toString(),
      },
      members_only: {
        name: "👤 Люди",
        description: "Всего реальных пользователей (без ботов)",
        getCount: (guild) =>
          guild.members.cache.filter((m) => !m.user.bot).size.toString(),
      },
    },
  },

  // =========================
  // СИСТЕМНЫЕ СООБЩЕНИЯ
  // =========================
  messages: {
    noPermission: "У вас недостаточно прав для использования этой команды.",
    cooldownActive: "Пожалуйста, подождите {time} перед повторным использованием команды.",
    errorOccurred: "Произошла ошибка при выполнении этой команды.",
    missingPermissions: "У бота недостаточно прав для выполнения этого действия.",
    commandDisabled: "Эта команда отключена.",
    maintenanceMode: "Бот находится в режиме технического обслуживания.",
  },

  // =========================
  // ПЕРЕКЛЮЧАТЕЛИ МОДУЛЕЙ
  // =========================
  features: {
    economy: true,
    leveling: true,
    moderation: true,
    logging: true,
    welcome: true,
    tickets: true,
    giveaways: true,
    birthday: true,
    counter: true,
    verification: true,
    reactionRoles: true,
    joinToCreate: true,
    voice: true,
    search: true,
    tools: true,
    utility: true,
    community: true,
    fun: true,
    music: true,
  },
};

export function validateConfig(config) {
  const errors = [];

  if (process.env.NODE_ENV !== 'production') {
    logger.debug('Проверка переменных окружения:');
    logger.debug('DISCORD_TOKEN существует:', !!process.env.DISCORD_TOKEN);
    logger.debug('TOKEN существует:', !!process.env.TOKEN);
    logger.debug('CLIENT_ID существует:', !!process.env.CLIENT_ID);
    logger.debug('GUILD_ID существует:', !!process.env.GUILD_ID);
    logger.debug('POSTGRES_HOST существует:', !!process.env.POSTGRES_HOST);
    logger.debug('NODE_ENV:', process.env.NODE_ENV);
  }

  if (!process.env.DISCORD_TOKEN && !process.env.TOKEN) {
    errors.push("Требуется токен бота (переменная окружения DISCORD_TOKEN или TOKEN)");
  }

  if (!process.env.CLIENT_ID) {
    errors.push("Требуется Client ID (переменная окружения CLIENT_ID)");
  }

  if (process.env.NODE_ENV === 'production') {
    const hasConnectionUrl = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);

    if (!hasConnectionUrl) {
      if (!process.env.POSTGRES_HOST) {
        errors.push("В production требуется подключение к PostgreSQL (укажите DATABASE_URL/POSTGRES_URL или POSTGRES_HOST)");
      }
      if (!process.env.POSTGRES_USER) {
        errors.push("В production требуется пользователь PostgreSQL (укажите DATABASE_URL/POSTGRES_URL или POSTGRES_USER)");
      }
      if (!process.env.POSTGRES_PASSWORD) {
        errors.push("В production требуется пароль PostgreSQL (укажите DATABASE_URL/POSTGRES_URL или POSTGRES_PASSWORD)");
      }
    }
  }

  return errors;
}

const configErrors = validateConfig(botConfig);
if (configErrors.length > 0) {
  logger.error("Ошибки в конфигурации бота:", configErrors.join("\n"));
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}

export const BotConfig = botConfig;

const COMMAND_CATEGORY_FEATURE_MAP = {
  birthday: "birthday",
  community: "community",
  economy: "economy",
  fun: "fun",
  giveaway: "giveaways",
  jointocreate: "joinToCreate",
  leveling: "leveling",
  logging: "logging",
  moderation: "moderation",
  music: "music",
  reaction_roles: "reactionRoles",
  search: "search",
  serverstats: "counter",
  ticket: "tickets",
  tools: "tools",
  utility: "utility",
  verification: "verification",
  welcome: "welcome",
};

function normalizeCategoryKey(category) {
  return String(category || "").trim().toLowerCase().replace(/\s+/g, "_");
}

export function getCommandPrefix() {
  return botConfig.commands?.prefix ?? "!";
}

export function getBotOwners() {
  return (botConfig.commands?.owners ?? [])
    .map((id) => String(id).trim())
    .filter(Boolean);
}

export function isBotOwner(userId) {
  if (!userId) {
    return false;
  }

  return getBotOwners().includes(String(userId));
}

export function isMaintenanceMode() {
  return botConfig.commands?.maintenanceMode === true;
}

export function getBotMessage(key, replacements = {}) {
  let message = botConfig.messages?.[key] || key;

  for (const [placeholder, value] of Object.entries(replacements)) {
    message = message.replace(new RegExp(`\\{${placeholder}\\}`, "g"), String(value));
  }

  return message;
}

export function isFeatureEnabled(featureKey) {
  if (!featureKey) {
    return true;
  }

  return botConfig.features?.[featureKey] !== false;
}

export function isCommandCategoryEnabled(category) {
  const normalized = normalizeCategoryKey(category);

  if (!normalized || normalized === "core") {
    return true;
  }

  const featureKey = COMMAND_CATEGORY_FEATURE_MAP[normalized];
  if (!featureKey) {
    return true;
  }

  return isFeatureEnabled(featureKey);
}

export function getApplicationStatusColor(status) {
  const colors = botConfig.applications?.statusColors || {};
  const hex = colors[status];
  return hex ? getColor(hex) : getColor(status === "approved" ? "success" : status === "denied" ? "error" : "warning");
}

export function getDefaultApplicationQuestions() {
  return (botConfig.applications?.defaultQuestions || []).map((entry) =>
    typeof entry === "string" ? entry : entry.question,
  ).filter(Boolean);
}

export function getColor(path, fallback = "#99AAB5") {
  if (typeof path === "number") return path;
  if (typeof path === "string" && path.startsWith("#")) {
    return parseInt(path.replace("#", ""), 16);
  }
  const result = path
    .split(".")
    .reduce(
      (obj, key) => (obj && obj[key] !== undefined ? obj[key] : fallback),
      botConfig.embeds.colors,
    );
  
  if (typeof result === "string" && result.startsWith("#")) {
    return parseInt(result.replace("#", ""), 16);
  }
  return result;
}

export function getRandomColor() {
  const colors = Object.values(botConfig.embeds.colors).flatMap((color) =>
    typeof color === "string" ? color : Object.values(color),
  );
  return colors[Math.floor(Math.random() * colors.length)];
}

export default botConfig;

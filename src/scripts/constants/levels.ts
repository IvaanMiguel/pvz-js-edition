import { PlantId } from './plants/plants'
import { ZombieId } from './zombie/ids'

export const Levels = [
  {
    hordes: [
      {
        hordeSize: 10,
        killsBeforeHorde: 10,
        zombiesPerSpawn: [1, 2],
        zombies: [{ type: ZombieId.BASIC_ZOMBIE, weight: 1 }],
        hordeZombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.25 }
        ]
      },
      {
        hordeSize: 15,
        killsBeforeHorde: 30,
        zombiesPerSpawn: [1, 2, 3],
        zombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.4 }
        ],
        hordeZombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.6 }
        ]
      }
    ],
    plants: [PlantId.SUNFLOWER, PlantId.PEASHOOTER]
  },
  {
    hordes: [
      {
        hordeSize: 10,
        killsBeforeHorde: 10,
        zombiesPerSpawn: [1, 2],
        zombies: [{ type: ZombieId.BASIC_ZOMBIE, weight: 1 }],
        hordeZombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.5 }
        ]
      },
      {
        hordeSize: 10,
        killsBeforeHorde: 30,
        zombiesPerSpawn: [1, 2],
        zombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.2 }
        ],
        hordeZombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.1 },
          { type: ZombieId.BUCKETHEAD_ZOMBIE, weight: 0.1 }
        ]
      },
      {
        hordeSize: 10,
        killsBeforeHorde: 55,
        zombiesPerSpawn: [2, 3],
        zombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.15 },
          { type: ZombieId.BUCKETHEAD_ZOMBIE, weight: 0.25 }
        ],
        hordeZombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.1 },
          { type: ZombieId.BUCKETHEAD_ZOMBIE, weight: 0.1 }
        ]
      }
    ],
    plants: [PlantId.SUNFLOWER, PlantId.PEASHOOTER, PlantId.WALLNUT]
  },
  {
    hordes: [
      {
        hordeSize: 10,
        killsBeforeHorde: 10,
        zombiesPerSpawn: [1, 2],
        zombies: [{ type: ZombieId.BASIC_ZOMBIE, weight: 1 }],
        hordeZombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.5 }
        ]
      },
      {
        hordeSize: 10,
        killsBeforeHorde: 30,
        zombiesPerSpawn: [1, 2],
        zombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.2 }
        ],
        hordeZombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.1 },
          { type: ZombieId.BUCKETHEAD_ZOMBIE, weight: 0.1 }
        ]
      },
      {
        hordeSize: 10,
        killsBeforeHorde: 55,
        zombiesPerSpawn: [2, 3],
        zombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.15 },
          { type: ZombieId.BUCKETHEAD_ZOMBIE, weight: 0.25 }
        ],
        hordeZombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.1 },
          { type: ZombieId.BUCKETHEAD_ZOMBIE, weight: 0.1 },
        ]
      },
      {
        hordeSize: 25,
        killsBeforeHorde: 75,
        zombiesPerSpawn: [2, 3],
        zombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.15 },
          { type: ZombieId.BUCKETHEAD_ZOMBIE, weight: 0.25 }
        ],
        hordeZombies: [
          { type: ZombieId.BASIC_ZOMBIE, weight: 1 },
          { type: ZombieId.CONEHEAD_ZOMBIE, weight: 0.2 },
          { type: ZombieId.BUCKETHEAD_ZOMBIE, weight: 0.2 },
          { type: ZombieId.ZOMBIE_YETI, weight: 0 }
        ]
      }
    ],
    plants: [PlantId.SUNFLOWER, PlantId.PEASHOOTER, PlantId.WALLNUT, PlantId.REPEATER, PlantId.POTATO_MINE]
  }
]

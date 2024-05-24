import { ZombieId } from './zombie/ids'

export const Hordes = [
  {
    hordeSize: 10,
    killsBeforeHorde: 10,
    zombiesPerSpawn: [1, 2],
    zombies: [
      {
        type: ZombieId.BASIC_ZOMBIE,
        weight: 1
      }
    ],
    hordeZombies: [
      {
        type: ZombieId.BASIC_ZOMBIE,
        weight: 1
      },
      {
        type: ZombieId.CONEHEAD_ZOMBIE,
        weight: 0.25
      }
    ]
  },
  {
    hordeSize: 15,
    killsBeforeHorde: 30,
    zombiesPerSpawn: [1, 3],
    zombies: [
      {
        type: ZombieId.BASIC_ZOMBIE,
        weight: 1
      },
      {
        type: ZombieId.CONEHEAD_ZOMBIE,
        weight: 0.4
      }
    ],
    hordeZombies: [
      {
        type: ZombieId.BASIC_ZOMBIE,
        weight: 1
      },
      {
        type: ZombieId.CONEHEAD_ZOMBIE,
        weight: 0.6
      }
    ]
  }
]

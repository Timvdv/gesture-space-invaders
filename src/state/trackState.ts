import { StepType } from 'reactronica'
import { atom } from 'recoil'

const trackState = atom({
  key: 'trackState',
  default: [
    {
      id: 'base',
      range: [0, 24],
      steps: [
        {
          name: 'B3',
          duration: 4,
          velocity: 0.8,
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
          name: 'B2',
          duration: 4,
          velocity: 0.8,
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
          name: 'B1',
          duration: 4,
          velocity: 0.8,
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    },
    {
      id: 'Guitar',
      range: [0, 8],
      steps: [
        {
          name: 'G5',
          duration: 4,
          velocity: 0.5,
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    },
    {
      id: 'effects',
      range: [0, 16],
      notes: [null, 'E1', 'E2', 'E3', 'E4'],
      steps: [
        {
          name: 'random',
          duration: 8,
          velocity: 1,
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ] as StepType[],
    },
  ],
})

export default trackState

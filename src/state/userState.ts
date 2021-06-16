import { atom } from 'recoil'

const userState = atom({
  key: 'userState',
  default: {
    // Left, top, right, bottom
    bbox: [
      275.3668022155762,
      26.878674030303955,
      146.06801986694336,
      198.66280317306519,
    ],
    class: 5,
    label: 'face',
    score: '0.96',
  },
})

export default userState

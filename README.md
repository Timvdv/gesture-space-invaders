# Gesture controlled space invaders

Use your hand to controll the spaceship and point your finger to shoot down the aliens

(This is still a work in progress)

## Read more in my blogpost

I am currently writing a blogpost about this repository "What I learned from over-engineering the game space invaders" it will highlight some of the decisions made and whether it's a good idea or not.

Note: this repository is mostly for experimental and research purpose. I would not recommend using any of this in production.

## Technologies used

- **[React](https://reactjs.org/) / [NextJS](https://nextjs.org/)**

  A framework for React that enables server side rendering along with some other goodies, I’d highly recommend it

- **[NextJS Boilerplate](https://github.com/Timvdv/next-boilerplate) (my own boilerplate to quickly get started with a NextJS project)**

  A boilerplate that I build around NextJS to incorporate prettier, all sorts of code linting, Huskey and storybook to preview each component

- **[Recoil](https://recoiljs.org/)**

  I used recoil to manage the global state I prefer this over react context because they made a really nice api to query and edit state while still being performant. This is one of those libraries I would like to introduce in every project (pro tip: usually not the smartest idea)

- **[Reactronica](https://reactronica.com/)**

  I wanted to give the game some sounds and found this really cool library that lets you play around with sound like it’s a react component instead of using the audio api directly

- **[React Konva](https://github.com/konvajs/react-konva)**

  Since we need canvas, I discovered this library which can talk to the canvas like it’s a react component and is supposed to make my life easier

- [**React Spring**](https://react-spring.io/)

  A library used for complex animations, I can also really recommend this for whenever you need to do some special animations in react

- **[Handtrack.js](https://victordibia.com/handtrack.js/#/)**

  I thought it would be fun to add some fun interaction in the game so I used a handtracking library which acts as a controller for the game.

Check out the rest in the package.json

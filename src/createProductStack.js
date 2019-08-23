/* eslint-disable typescript-filenames/no-js-extension */
/* TODO: Port this file to TypeScript */

import Matter from "matter-js";

const productImages = {
  product0:
    "https://dsc-cms.imgix.net/v1/qpbrd0hcmuyw/epyiSrwNeww2spbCPksHf/b3660cdff83db25aaf484d0fc27edf64/MRZ-6H-CURRENT.png?w=0.05&auto=format",
  product1:
    "https://dsc-cms.imgix.net/v1/qpbrd0hcmuyw/3SYmsJeMYSH4hMdHS12xEI/5215bb3b5fb393a376214e92f8b6158b/GK-DSS-CURRENT.png?w=0.05&auto=format",
  product2:
    "https://dsc-cms.imgix.net/v1/qpbrd0hcmuyw/AZ4ZGLXPuvOucHJTydEM8/c37beafa410f38257d521f5af793b670/SUP-GEL-5Z-CURRENT.png?w=0.05&auto=format",
  product3:
    "https://dsc-cms.imgix.net/v1/qpbrd0hcmuyw/2Pm1pQ34gsDQYPlPZcTcTf/73ec249d59279607c95c6be5d3044d3f/BRS-2AL-2-CURRENT.png?w=0.05&auto=format,",
  product4:
    "https://dsc-cms.imgix.net/v1/qpbrd0hcmuyw/4LP4Abja9EFEG1qjNwMdLM/b7856249fdc74e41c200af9afe7ac28b/WHBC-AL-10Z-CURRENT.png?w=0.05&auto=format",
  product5:
    "https://dsc-cms.imgix.net/v1/qpbrd0hcmuyw/705JjwWNbWC4ZbzPHNRrhd/31baffc5fc5d45e7e921e0e2293ad4e1/WSP-10Z-CURRENT.png?w=0.05&auto=format",
  product6:
    "https://dsc-cms.imgix.net/v1/qpbrd0hcmuyw/6ribl488Z02sHrggaZMEhl/9e935e88a42ab4cfbbe73d7bab342156/WFC-HG-4Z-2-CURRENT.png?w=0.05&auto=format",
  product7:
    "https://dsc-cms.imgix.net/v1/qpbrd0hcmuyw/5tsNBv3XEUcVu52sthw83t/c5bf470fe86d5f80c24c3028da823409/DSD-3Z-CURRENT.png?w=0.05&auto=format",
  product8:
    "https://dsc-cms.imgix.net/v1/qpbrd0hcmuyw/7aYuuxzeQ4pCuqXKHoKyR1/b57d6c1d72167ecb773a84b99cfc74cb/ESB-6Z-CURRENT.png?w=0.05&auto=format",
  product9:
    "https://dsc-cms.imgix.net/v1/qpbrd0hcmuyw/21fhQpqeL7aHR8HoGTFdpn/fb7b7e4976932741bce0c5f7b41624c4/MRZ-6B-BM2-CURRENT.png?w=0.05&auto=format"
};

export const createProductStack = () => {
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const Runner = Matter.Runner;
  const Composites = Matter.Composites;
  const MouseConstraint = Matter.MouseConstraint;
  const Mouse = Matter.Mouse;
  const World = Matter.World;
  const Bodies = Matter.Bodies;

  // create engine
  const engine = Engine.create();
  const world = engine.world;

  // create renderer
  const render = Render.create({
    element: document.querySelector(".matter-component"),
    engine: engine,
    options: {
      background: "#f9f7f6",
      showAngleIndicator: false,
      wireframes: false
    }
  });

  Render.run(render);

  // create runner
  const runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies
  const offset = 20;
  const options = {
    isStatic: true,
    render: {
      fillStyle: "#ff6000"
    }
  };

  world.bodies = [];

  // these static walls will not be rendered in this sprites example, see options
  World.add(world, [
    Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
    Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
    Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
    Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
  ]);

  const productsPerRow = 4;
  const productsPerColumn = 10;
  const stack = Composites.stack(
    20,
    20,
    productsPerColumn,
    productsPerRow,
    0,
    0,
    (x, y) => {
      const randomProductNumber = Math.floor(Math.random() * 10);
      const product = productImages[`product${randomProductNumber}`];
      return Bodies.rectangle(x, y, 64, 80, {
        render: {
          sprite: {
            texture: product
            // xScale: 0.5,
            // yScale: 0.5,
          }
        }
      });
    }
  );

  World.add(world, stack);

  // add mouse control
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
  });

  // context for MatterTools.Demo
  return {
    engine,
    runner,
    render,
    canvas: render.canvas,
    stop: () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    }
  };
};

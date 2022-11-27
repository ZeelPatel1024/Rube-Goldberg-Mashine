var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
  
  //for pendulum
  let angle;
  let bob;
  let len;
  let origin;
  let angleV = 0;
  let angleA = 0;
  let gravity = 0.0005;
  let pendCir;
  
  //distance
  let initalDist;

  let cir1,cir2,cir3,cir4,cir5,cir6,cir7,cir8;
  const circles = [];

  let followBall4 = true;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  engine = Engine.create();
  world = engine.world;

  let options = {
    isStatic:true
  }
  
  cam = createCamera();
  // cam.setPosition(imgBlock1.position.x,ball4.position.y,800);
  engine.world.gravity.y = 1;

  TwoSetUpDrawBallTower();
  setUpPendulum();
  drawCircles();
  // Body.applyForce( ball4, {x: ball4.body.position.x, y: ball4.body.position.y}, {x: 0.05, y: 0});
  Body.setVelocity( ball4.body, {x: 7, y: -8});
  Engine.run(engine);
  // World.add(world, [platform,wall1,wall2,ball]);


  }
  
  function draw() {

    background(000);
    pendulumStuff();

    drawObjects();

    calcDistance();

  

  }

  function drawCircles(){
    for (var i = 0; i < 8; i++){
      circles.push(new Ball(world, {x:Math.random()*100, y: 180, r: 10, color: 'blue'}) );
    }
  }

  function pendulumStuff(){
 // Body.setVelocity( ball4.body, {x: 5, y: -5});
    let force = gravity*sin(angle);
    angleA = -1 * force;
    angleV += angleA;
    angle += angleV;

    // console.log(angle);
    bob.x = len * sin(angle) + origin.x;
    bob.y = len * cos(angle) + origin.y;

    stroke(255);
    strokeWeight(4);
    line(origin.x,origin.y,bob.x,bob.y);
    // fill(127);
    circle(bob.x,bob.y,30);
    // ellipseMode(CORNERS);
    // Matter.Engine.update(engine);
    // cam.setPosition(imgBlock1.body.position.x,imgBlock1.body.position.y,900);

     if(followBall4){
      cam.setPosition(ball4.body.position.x,ball4.body.position.y,900);
    }else{
      cam.setPosition(circles[1].body.position.x,circles[1].body.position.y,400);

    }

  }

  function TwoSetUpDrawBallTower(){
   

    // platform = new Box(-500,250,100,5, {isStatic: true});
    platform = new Block(world, {x: -650, y: 280, w:80, h:5, color: 'white'}, {isStatic: true});
    imgBlock1 = new Block(world, {x: 600, y: -600, w:5, h:5, color: 'white'}, {isStatic: true});

    //second platform plus walls
    platform2 = new Block(world, {x: -400, y: 230, w:80, h:5, color: 'white'}, {isStatic: true});
    wall1 = new Block(world, {x: -440, y: 220, w:5, h:10, color: 'white'}, {isStatic: true});
    wall2 = new Block(world, {x: -360, y: 220, w:5, h:10, color: 'white'}, {isStatic: true});

    platform3 = new Block(world, {x: -90, y: 200, w:110, h:5, color: 'white'}, {isStatic: true});
    craterWall1 = new Block(world, {x: -35, y: 205, w:5, h:15, color: 'white'}, {isStatic: true});
    craterWall2 = new Block(world, {x: 35, y: 215, w:140, h:5, color: 'white'}, {isStatic: true});//bottom of tube

    craterWall3 = new Block(world, {x: -7, y: 15, w:5, h:400, color: 'white'}, {isStatic: true});
    craterWall4 = new Block(world, {x: 100, y: 50, w:5, h:320, color: 'white'}, {isStatic: true});
    tubeWall5 = new Block(world, {x: 190, y: -185, w:400, h:10, color: 'white'}, {isStatic: true});
    tubeWall6 = new Block(world, {x: 275, y: -110, w:355, h:10, color: 'white'}, {isStatic: true});
    tubeWall7 = new Block(world, {x: 390, y: -330, w:10, h:300, color: 'white'}, {isStatic: true});
    tubeWall8 = new Block(world, {x: 450, y: -290, w:10, h:380, color: 'white'}, {isStatic: true});

    //after tube
    landingPlatform = new Block(world, {x: 500, y: -590, w:300, h:10, color: 'white'}, {isStatic: true,angle: -(PI / 6),friction:0});
    landingPlatform2 = new Block(world, {x: 680, y: -780, w:300, h:10, color: 'white'}, {isStatic: true,angle: (PI / 5),friction:0});



    ball4 = new Ball(world, { x: -650, y: 270, r: 10, color: 'cyan' }, {friction:0});
    ball5 = new Ball(world, { x: -80, y: 190, r: 10, color: 'red' }, {friction:0});

    // ball4 = new Ball(world, { x: -650, y: 270, r: 10, color: 'cyan' }, {friction:0});

  
  }
  function setUpPendulum(){
    angle = -1*PI/2;
    bob = createVector(-500,-100);
    len = 120;
    origin = createVector(-400,90);
    pendCir = Bodies.circle(-300,-300,10);
  }

  function calcDistance(){
    initalDist = dist(ball4.body.position.x,ball4.body.position.y,bob.x,bob.y);
    let wallDist = dist(ball4.body.position.x,ball4.body.position.y,wall2.body.position.x,wall2.body.position.y);
    let cratDist = dist(ball5.body.position.x,ball5.body.position.y,craterWall2.body.position.x,craterWall2.body.position.y);
    let upperWallDist = dist(circles[0].body.position.x,circles[0].body.position.y,tubeWall5.body.position.x,tubeWall5.body.position.y)
    let sideWallDist = dist(circles[0].body.position.x,circles[0].body.position.y,tubeWall8.body.position.x,tubeWall8.body.position.y)
    let landPlat2Dist = dist(circles[0].body.position.x,circles[0].body.position.y,landingPlatform2.body.position.x,landingPlatform2.body.position.y)

    // console.log(upperWallDist);

    // if(landPlat2Dist < 150){
    //   cam.setPosition(imgBlock1.body.position.x,imgBlock1.body.position.y,900);
    // }else{
    //   cam.setPosition(imgBlock1.body.position.x,imgBlock1.body.position.y,900);
    // }

    if(sideWallDist < 150){
      console.log("acheived");
      engine.world.gravity.y = -1;      
      engine.world.gravity.x = 0;

    }

    if(upperWallDist < 250){
      engine.world.gravity.x = 0.8;
    }

    if(cratDist <56){
      // gravity = -3
      engine.world.gravity.y = -0.8;
      followBall4 = false;
      // ball4.body.gravity = 3;

      // craterWall2.fillStyle = 'red';
    }

    if(wallDist < 32){
      wall2.body.position.y = 0;
    }
    
    if(initalDist < 32){
      Body.setVelocity( ball4.body, {x: 7, y: -8});
    }
  }

  function drawObjects(){
    platform.draw();
    imgBlock1.draw();
    platform2.draw();
    platform3.draw();

    ball4.draw();
    wall1.draw();
    wall2.draw();
    for (var i =0; i<circles.length;i++){
      circles[i].draw();
    }
    ball5.draw();
    craterWall1.draw();
    craterWall2.draw();
    craterWall3.draw();
    craterWall4.draw();
    tubeWall5.draw();
    tubeWall6.draw();
    tubeWall7.draw();
    tubeWall8.draw();

    landingPlatform.draw();
    landingPlatform2.draw();
    // for (var i =0; i<circles.length;i++){
    //   circles[i].draw();
    // }

    // bigWall.draw();


    // Body.setVelocity( platform.body, {x: 105, y: -35});



  }




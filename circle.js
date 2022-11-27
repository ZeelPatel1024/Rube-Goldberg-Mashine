class Circle{
    constructor(x,y,r){
        this.body = Matter.Bodies.Circle(x,y,r);
        // Matter.World.add(world, this.body);
        this.x = x;
        this.y = y;
        this.r = r;
     
        

        // Body.applyForce( this, {x: this.position.x, y: this.position.y}, {x: 0, y: -0.30});
        // Body.applyForce( this, {x: this.position.x, y: this.position.y}, {x: 0.05, y: 0});
        
    }

    show(){
        const pos = this.body.position;
        // const angle = this.body.angle;
        // push();
        // translate(pos.x,pos.y);
        // rotate(angle);
        fill(285);
        circle(this.x,this.y,this.r);
        // pop();
    }
}
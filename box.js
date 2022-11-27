class Box{
    constructor(x,y,w,h){
        this.body = Matter.Bodies.rectangle(x,y,w,h);
        Matter.World.add(world, this.body);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        // this.isStatic = true;
        

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
        rect(this.x,this.y,this.w,this.h);
        // pop();
    }
}
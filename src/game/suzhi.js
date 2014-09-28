define(['util','colors'], function(util,colors){

	var GRAVITY = 0.25,
		X_THRUST = 10,
		Y_THRUST = 50,
		MAX_Y_VELOCITY = 7;

	function Suzhi(options){
		this.x = 0;
		this.y = 0;
		this.size = 20;
		this.yVelocity = 0;
		this.init(options.canvas);
	}

	Suzhi.prototype = {
		init : function(canvas){
			this.x = canvas.width / 2;
			this.y = canvas.height / 2;
			this.cH = canvas.height;
			this.cW = canvas.width;
		},
		jump : function(forcePoint){
			var xForce, yForce, xVel, yVel;
			yForce = forcePoint.y - this.y;
			xForce = forcePoint.x - this.x;

			if(yForce >= 0){
				yVel = ( (Y_THRUST * yForce) / this.cH );
				xVel = ( (X_THRUST * xForce) / this.cW );
				this.xVelocity = -xVel;
				this.yVelocity = -Math.min(yVel, MAX_Y_VELOCITY);
				this.inMotion = true;
			}
		},
		stop : function(){
			this.inMotion = false;
		},
		update : function(){
			if(this.inMotion){
				this.yVelocity += GRAVITY;
				this.y += this.yVelocity;
				this.x += this.xVelocity;
			}
		},
		draw : function(ctx){
			ctx.save();
			ctx.fillStyle = colors.suzhi;
			ctx.arc(this.x,this.y,this.size, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.restore();
		},
		position : function(){
			return {
				top : this.y - this.size,
				bottom : this.y + this.size,
				left : this.x - this.size,
				right : this.x + this.size
			}
		}
	}

	return Suzhi;

});
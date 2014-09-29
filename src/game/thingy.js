define(['util', 'colors'], function(util,colors){

	var coords = util.sprites;

	var config = {
		smiley : {
			role : 'goody',
			coords : coords.smiley,
			value : 5,
			color: colors.goody
		}, laughy : {
			role : 'goody',
			coords : coords.laughy,
			value : 50,
			color: colors.goody
		}, holy : {
			role : 'goody',
			coords : coords.holy,
			value : 200,
			color: colors.goody
		}, geary : {
			role : 'baddie',
			coords : coords.geary['1'],
			coordsOdd : coords.geary['1'],
			coordsEven : coords.geary['2'],
			value : -5,
			color: colors.baddie
		}, sunny : {
			role : 'baddie',
			coords : coords.sunny['1'],
			coordsOdd : coords.sunny['1'],
			coordsEven : coords.sunny['2'],
			value : -50,
			color: colors.baddie
		}, rady : {
			role : 'baddie',
			coords : coords.rady['1'],
			coordsOdd : coords.rady['1'],
			coordsEven : coords.rady['2'],
			value : -100,
			color: colors.baddie
		}
	}, margin = 30;

	function Thingy(options){
		this.type = options.type;
		this.value = config[this.type].value;
		this.coords = config[this.type].coords;
		this.coordsOdd = config[this.type].coordsOdd;
		this.coordsEven = config[this.type].coordsEven;
		this.color = config[this.type].color;
		this.role = config[this.type].role;
		this.x = options.position.x;
		this.y = options.position.y;
		this.width = this.coords[2];
		this.height = this.coords[3];
		this.xVelocity = 1;
		this.yVelocity = 1;
		this.cH = options.canvas.height;
		this.cW = options.canvas.width;
		this.lifeTime = 500;
		this.sprite = options.sprite;
		this.animFrames = 0;
	}

	Thingy.prototype = {

		_hitTheWall : function(){
			if(this.x <= 0){
				this.xVelocity = Math.abs(this.xVelocity);
			}
			if(this.x >= (this.cW - margin)){
				this.xVelocity = -Math.abs(this.xVelocity);
			}
			if(this.y <= margin){
				this.yVelocity = Math.abs(this.yVelocity);
			}
			if(this.y >= (this.cH - margin)){
				this.yVelocity = -Math.abs(this.yVelocity);
			}
		},

		_randomMotion : function(frames){
			if(frames % 100 == 0){
				if(util.randomNumber(10,50) > 25){
					this.xVelocity = -this.xVelocity;
				}else{
					this.yVelocity = -this.yVelocity;
				}	
			}
		},

		_isCollided : function(suzhi){
			var pos = suzhi.position(),
				o1 = {
					x : this.x - 18, // bounding box
					y : this.y - 15, // bouding box
					h : 20,
					w : 20
				}, o2 = {
					x : pos.left,
					y : pos.top,
					h : pos.bottom - pos.top,
					w : pos.right - pos.left
				};
			if(util.collided(o1, o2)){
				suzhi.gotThingy(this.value);
				this.isCollided = true;
				this.lifeTime = 30;
			}
		},

		update : function(frames, suzhi){
			this.x += this.xVelocity;
			this.y += this.yVelocity;			
			this._randomMotion(frames);
			this._hitTheWall();
			if(!this.isCollided){
				this._isCollided(suzhi);
			}
			this.lifeTime -= 1;
			if(this.lifeTime <= 30){
				this.isDying = true;
			}
			if(this.lifeTime <=0){
				this.isCaptured = true;
				this.lifeTime = 0;
			}
			if(this.role === 'baddie'){
				if(this.animFrames >= 10){
					this.animFrames = 0;
					this.coords =  frames % 2 === 0 ? this.coordsEven : this.coordsOdd;	
				}else{
					this.animFrames++;
				}
				
			}
		},
		draw : function(ctx){
			var tx,ty,sign;
			ctx.save();
			util.drawSprite(ctx, this.sprite, this.coords, this.x, this.y);
			ctx.fillStyle = this.color;
			ctx.font = '7pt Courier';
			sign = this.value < 0 ? '' : '+';
			tx = this.x + (this.width / 2) - 10;
			ty = this.y + (this.height + 10);
			ctx.fillText(sign + this.value,tx,ty);
			ctx.restore();


		}
	}

	return Thingy;

});
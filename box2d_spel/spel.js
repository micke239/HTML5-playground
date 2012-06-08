var context;
var world;
var spelArea;
var timeStep;
var velocityIterations;
var positionIterations;
var dbgDraw;
var drawScale;
var force;
var mouseLoc;
var drawArrowBool = false;
var spelarPos;
var projectiles;

window.onload = function(){
	//Gets the canvas in which we should draw
	if (!document.getElementById("spelArea")) return false;
	spelArea = document.getElementById("spelArea");	
	if (!spelArea.getContext('2d')) return false;
	context = spelArea.getContext('2d');
	
	mouseLoc = new b2Vec2();
	
	//sets the event listeners	
    spelArea.onmousedown = mouseClick;
    spelArea.touchstart = mouseClick;
	spelArea.onmouseup = mouseUp;
	spelArea.onmousemove = mouseMove;
    document.onkeydown = key_event;
    
    projectiles = new Array();
    
    world = createWorld();
    
	//some boxes
	newBox(18,2);
	newBox(17,2);
	newBox(16,2);
	newBox(15,2);
	newBox(14,2);
	newBox(13,2);
	newBox(12,2);
	newBox(11,2);
	newBox(10,2);
	newBox(9,2);

	step();
}

function key_event(e){
    if (e.which == 69){
        var loc = projectiles[0].GetPosition();
        console.log(loc.x + ", " + loc.y);
        var aabb = new b2AABB();
        aabb.lowerBound.Set(loc.x - 1, loc.y - 1);
        aabb.upperBound.Set(loc.x + 1, loc.y + 1);
        console.log (aabb);
        var callback = function (fixture) {
            var body = fixture.m_body;
            if (body.m_type != b2Body.b2_staticBody && 
                    ((body.m_flags & b2Body.e_bulletFlag) == 0)) {
                world.DestroyBody(body);
            }
            return true;
        }
            
        world.QueryAABB(callback, aabb);
        world.DestroyBody(projectiles[0]);
        projectiles.shift();
    }
}
/*
function GetBodyAtMouse(event, includeStatic) {
    if (!(includeStatic)) includeStatic = false;

	var mousePVec = new b2Vec2();
	mousePVec.Set(event.x, event.y);
	var aabb = new b2AABB();
	aabb.minVertex.Set(event.x - 1, event.y - 1);
	aabb.maxVertex.Set(event.x + 1, event.y + 1);
	var k_maxCount = 10;
	var shapes = new Array();
	var count = world.Query(aabb,shapes,k_maxCount);
	var body = null;
	for (var i = 0; i < count; i++) {
		if (!shapes[i].GetBody().IsStatic()) {
			body=shapes[i].GetBody();
			break;
		}
	}
	return body;
}*/

function mouseUp(e){
	drawArrowBool = false;
	
    var projectile = createProjectile();
    projectiles.push(projectile);
    /*
	//This is the projectile coming out when shooting
	var bodyDef = new b2BodyDef();
	bodyDef.position.Set(3, 3.25);
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.bullet = true;
	var boll = world.CreateBody(bodyDef);
	var bollShape = new b2CircleShape();
	bollShape.m_radius = 0.12;
	var fixtureDef = new b2FixtureDef();
	fixtureDef.shape = bollShape;
	fixtureDef.density = 1.5;
	fixtureDef.friction = 0.3;
	fixtureDef.restitution = 0.3;
	boll.CreateFixture(fixtureDef);
    */
	
	//this is the force of the throw with in-game coordinates
	//the force is multiplied by four, 'cause that gives a good result
	var throwVec = new b2Vec2(force.x/(drawScale.x*4), force.y/(drawScale.y*4));
	
	projectile.ApplyImpulse(throwVec, projectile.GetPosition());
}

//on mousemove update coordinates
function mouseMove(e){
	var coords = getCanvasCoords(e);
	mouseLoc.x = coords.x - 30;
	mouseLoc.y = coords.y - 30;
}

//on mouseclick set drawing of arrow to true
function mouseClick(e){
	var coords = getCanvasCoords(e);
	mouseLoc.x = coords.x - 30;
	mouseLoc.y = coords.y - 30;
	drawArrowBool = true;
}

//PROJECTILE
function createProjectile(){
    var bodyDef = new b2BodyDef();
    bodyDef.position.Set(3,3.25);
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.bullet = true;
    
    var projectile = world.CreateBody(bodyDef);
    var circle = new b2CircleShape();
    circle.m_radius = 0.15;
    
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = circle;
    fixtureDef.density = 1;
    fixtureDef.friction = 0.3;
    fixtureDef.restitution = 0.3;
    
    projectile.CreateFixture(fixtureDef);
    projectile.CreateFixture(createEdge(0.1, 0, 0, 0.3));
    projectile.CreateFixture(createEdge(0, 0.3, -0.1, 0));    
    projectile.CreateFixture(createEdge(0, -0.3, 0.1, 0));
    projectile.CreateFixture(createEdge(-0.1, 0, 0, -0.3));
    
    return projectile;
}

function createEdge(x1, y1, x2, y2){
    var edge = new b2PolygonShape();
    edge.SetAsEdge(new b2Vec2(x1, y1), new b2Vec2(x2, y2));
    
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = edge;
    fixtureDef.density = 0.3;
    fixtureDef.friction = 0.3;
    fixtureDef.restitution = 0.3;
    
    return fixtureDef;
}


/**
 * Creates the world with the specified number.
 * TODO: worldNumber handeling.
 *
 * @param worldNumber The number of the world to be initiated.
 */
function createWorld(worldNumber) {
	worldHeight = 12.8;
	worldWidth = 19.2;
	
	//
	drawScale = new b2Vec2();
	drawScale.x = spelArea.width/worldWidth;
	drawScale.y = spelArea.height/worldHeight;
	
	//
	force = new b2Vec2();
	
	//världen
	var gravity = new b2Vec2(0,-9.81);
	var doSleep = true;
	var world = new b2World(gravity, doSleep);
	world.SetWarmStarting(true);
	
	//statisk kropp; marken
	var groundBodyDef = new b2BodyDef();
	groundBodyDef.position.Set(worldWidth/2, -9);
	var groundBody = world.CreateBody(groundBodyDef);
	var groundBox = new b2PolygonShape();
	groundBox.SetAsBox(worldWidth/2, 10);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.shape = groundBox;
	fixtureDef.restitution = 0.3;
	groundBody.CreateFixture(fixtureDef);
	
	//spelaren
	var playerDef = new b2BodyDef();
	playerDef.position.Set(3, 2);
	var player = world.CreateBody(playerDef);
	player.active = true;
	
	//world update frequency & iterations
	timeStep = 1/60;
	velocityIterations = 200;
	positionIterations = 200;
	
	//this is the object that handles the view
	dbgDraw = new b2DebugDraw();
	dbgDraw.SetDrawScale(drawScale.x, drawScale.y);
	dbgDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit | b2DebugDraw.e_centerOfMassBit);
	dbgDraw.SetSprite(context);
	world.SetDebugDraw(dbgDraw);
	
	return world;
}

//GAME LOOP
// Take a time step with the specified frequency and iterations
function step(){
	//step
	world.Step(timeStep, velocityIterations, positionIterations);
	world.ClearForces;
	
	//draw
	world.DrawDebugData();
	if (drawArrowBool){
		drawArrow(context, 3*drawScale.x, spelArea.height-(3*drawScale.y), mouseLoc.x, mouseLoc.y);
	}
	
	//implode
	//checkAndImplode();
	
	//loop
	setTimeout('step()', 10);	
}

//ARROW
//Draw an arrow between the giving coordinates.
//max range is currently 6m and min range is 1m
function drawArrow(ctx, fromx, fromy, tox, toy){
	var xDistance = ((tox > fromx)? tox - fromx : fromx - tox);
	var yDistance = ((toy > fromy)? toy - fromy : fromy - toy);
	
	var inGameLength = Math.sqrt((xDistance/drawScale.x)*(xDistance/drawScale.x)
				     + (yDistance/drawScale.y)*(yDistance/drawScale.y));
	
	if ( inGameLength > 6) {
		var prop = 6/inGameLength;

		//update distance
		xDistance = xDistance*prop;
		yDistance = yDistance*prop;
		
		tox = (tox > fromx)? fromx + xDistance : fromx - xDistance;
		toy = (toy > fromy)? fromy + yDistance : fromy - yDistance;
	} else if (inGameLength < 1) {
		var prop = 1/inGameLength;
		
		//update distance
		xDistance = xDistance*prop;
		yDistance = yDistance*prop;
		
		tox = (tox > fromx)? fromx + xDistance : fromx - xDistance;
		toy = (toy > fromy)? fromy + yDistance : fromy - yDistance;
	}
	
	force.x = (tox < fromx)? -xDistance : xDistance;
	force.y = (toy > fromy)? -yDistance : yDistance;
	
	var length = Math.sqrt(xDistance*xDistance + yDistance*yDistance);
		
	var barb = 15;
	var angle1 = Math.acos(xDistance/length) + (20/180)*Math.PI;
	var angle2 = Math.acos(xDistance/length) - (20/180)*Math.PI;
        
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
       
        var x1=0, y1=0, x2=0, y2=0;
        
        if(tox >= fromx && toy <= fromy){
	        x1 = tox - barb*Math.cos(-angle1);
	        y1 = toy - barb*Math.sin(-angle1);
	        
	        x2 = tox - barb*Math.cos(-angle2);
	        y2 = toy - barb*Math.sin(-angle2);
        } else if (tox >= fromx && toy >= fromy){
        	x1 = tox - barb*Math.cos(angle1);
	        y1 = toy - barb*Math.sin(angle1);
	        
	        x2 = tox - barb*Math.cos(angle2);
	        y2 = toy - barb*Math.sin(angle2);
        } else if (tox <= fromx && toy <= fromy){
        	x1 = tox + barb*Math.cos(angle1);
	        y1 = toy + barb*Math.sin(angle1);
	        
	        x2 = tox + barb*Math.cos(angle2);
	        y2 = toy + barb*Math.sin(angle2);
        } else if (tox <= fromx && toy >= fromy){
	        x1 = tox + barb*Math.cos(-angle1);
	        y1 = toy + barb*Math.sin(-angle1);
	        
	        x2 = tox + barb*Math.cos(-angle2);
	        y2 = toy + barb*Math.sin(-angle2);
        }

        ctx.lineTo(x1, y1);
        
        ctx.moveTo(tox, toy);
        ctx.lineTo(x2, y2);
	
	ctx.fillStyle="black";
	ctx.stroke();
}
function checkAndImplode(){
	var bodies = new Array();
	var aabb = new b2AABB();
	aabb.lowerBound()
}

/**
 * JavaScript only. Used to get correct mouse coords in all browsers..
 **/
function getCanvasCoords(e){

	var posx = 0;
	var posy = 0;
	
	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}

	var canvasCoord = new b2Vec2(posx + spelArea.offsetLeft, posy + spelArea.offsetTop)
	
	return canvasCoord;
}

function newBox(x, y){
	var bodyDef = new b2BodyDef();
	bodyDef.position.Set(x,y);
	bodyDef.type = b2Body.b2_dynamicBody;
	var body = world.CreateBody(bodyDef);
	var box = new b2PolygonShape();
	box.SetAsBox(0.3,0.3);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.shape = box;
	fixtureDef.density = 1;
	fixtureDef.friction = 0.3;
	body.CreateFixture(fixtureDef);	
}

/** ANVÄNDS EJ


function GetBodyAtMouse(event, includeStatic) {
    if (!(includeStatic)) includeStatic = false;

	var mousePVec = new b2Vec2();
	mousePVec.Set(event.x, event.y);
	var aabb = new b2AABB();
	aabb.minVertex.Set(event.x - 1, event.y - 1);
	aabb.maxVertex.Set(event.x + 1, event.y + 1);
	var k_maxCount = 10;
	var shapes = new Array();
	var count = world.Query(aabb,shapes,k_maxCount);
	var body = null;
	for (var i = 0; i < count; i++) {
		if (!shapes[i].GetBody().IsStatic()) {
			body=shapes[i].GetBody();
			break;
		}
	}
	return body;
}

function spawnCircle(x, y){
	var bodyDef = new b2BodyDef();
	bodyDef.position.Set(x,y);
	bodyDef.type = b2Body.b2_dynamicBody;
	var body = world.CreateBody(bodyDef);
	var circle = new b2CircleShape();
	circle.m_radius = 3;
	var fixtureDef = new b2FixtureDef();
	fixtureDef.shape = circle;
	fixtureDef.density = 1;
	fixtureDef.friction = 0.3;
	body.CreateFixture(fixtureDef);
}
function spawnSolidCircle(x, y){
	var bodyDef = new b2BodyDef();
	bodyDef.position.Set(x,y);
//	bodyDef.type = b2Body.b2_dynamicBody;
	var body = world.CreateBody(bodyDef);
	var circle = new b2CircleShape();
	circle.m_radius = 3;
	var fixtureDef = new b2FixtureDef();
	fixtureDef.shape = circle;
	fixtureDef.density = 1;
	fixtureDef.friction = 0.3;
	body.CreateFixture(fixtureDef);
}


*/
	/*//statiska kroppar; väggar
	var rightBodyDef = new b2BodyDef();
	var leftBodyDef = new b2BodyDef();
	rightBodyDef.position.Set(worldWidth+9,worldHeight/2);
	leftBodyDef.position.Set(-9, worldHeight/2);
	var leftWallBody = new_world.CreateBody(leftBodyDef);
	var rightWallBody = new_world.CreateBody(rightBodyDef);	
	var leftWallShape = new b2PolygonShape();
	var rightWallShape = new b2PolygonShape();
	rightWallShape.SetAsBox(10, worldHeight/2);
	leftWallShape.SetAsBox(10, worldHeight/2);
	var rightWallFixture = new b2FixtureDef();
	var leftWallFixture = new b2FixtureDef();
	rightWallFixture.shape = rightWallShape;
	leftWallFixture.shape = leftWallShape;
	rightWallFixture.restitution = 0.3;
	leftWallFixture.restitution = 0.3;
	leftWallBody.CreateFixture(leftWallFixture);
	rightWallBody.CreateFixture(rightWallFixture);*/
	
	/*//nått försök till bana
	var banBodyDef = new b2BodyDef();
	banBodyDef.position.Set(0,0);
	var banBody = new_world.CreateBody(banBodyDef);
	var banShape = new b2PolygonShape();
	var vertices = [new b2Vec2(87, 10), new b2Vec2(87, 28), new b2Vec2(72, 32), new b2Vec2(65, 11), new b2Vec2(81, 9)];
	banShape.SetAsArray(vertices, vertices.length);
	var fixture = new b2FixtureDef();
	fixture.shape = banShape;
	fixture.restitution = 0.3;
	fixture.friction = 1;
	var banShape2 = new b2PolygonShape();
	vertices = [new b2Vec2(76, 12), new b2Vec2(70, 29), new b2Vec2(38, 26), new b2Vec2(40, 16), new b2Vec2(61, 9)];
	banShape2.SetAsArray(vertices, vertices.length);
	var fixture2 = new b2FixtureDef();
	fixture2.shape = banShape2;
	fixture2.restitution = 0.3;
	fixture2.friction = 1;
	banBody.CreateFixture(fixture);
	banBody.CreateFixture(fixture2);
*/
	
/*	//dynamisk kropp
	var bodyDef = new b2BodyDef();
	bodyDef.position.Set(18,9);
	bodyDef.angle = Math.PI/4;
	bodyDef.type = b2Body.b2_dynamicBody;
	var body = world.CreateBody(bodyDef);
	var dynamiskKropp = new b2PolygonShape();
	dynamiskKropp.SetAsBox(1,1);
	fixtureDef = new b2FixtureDef();
	fixtureDef.shape = dynamiskKropp;
	fixtureDef.density = 1.0;
	fixtureDef.friction = 0.3;
	body.CreateFixture(fixtureDef);
*/
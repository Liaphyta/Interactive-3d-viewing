/*Source Interactive computer graphics a top-down approach with webgl book
As a guide for the implementation of these shaders i was using the above mentioned book.
For the purpose of this lab assignment i created 6 shaders where 3 of them are vertex shaders and 3 of them are fragment shaders.
For each type of shading and illumination i created pairs of vertex shader and fragment shader.
1. The gouraud vertex shader with diffuse illumination is below. 
*/
var vertexShaderCodeGouraudDiffuse = 
"attribute vec3 norm;\n"+
"attribute vec3 position;\n" +
"attribute vec3 vertColor;\n" +
"varying vec3 fragColor;\n" +
"uniform mat4 worldMatrix;\n" +
"uniform mat4 viewMatrix;\n" +
"uniform float Ka;\n"+
"uniform float Kd;\n"+
"uniform float Ks;\n" + 
"uniform float n;\n" + 
"varying vec3 vec3Pos;\n" + 
"uniform vec3 ambientColor;\n" + 
"uniform vec3 diffuseColor;\n" + 
"uniform vec3 specularColor;\n" + 
"uniform vec3 lightPosition;\n" + 
"uniform mat4 projectionMatrix;\n" +
"void main() {\n"+
"   vec4 vertPosMinusProj =worldMatrix * viewMatrix*  vec4(position,1.0);\n" + 
"   vec3Pos = vec3(vertPosMinusProj)/ vertPosMinusProj.w;\n" + 
"   vec3 N = normalize(norm);\n" + 
"   vec3 L = normalize(lightPosition - vec3Pos);\n" +
"   float diffuse = max(dot(N, L), 0.0);\n"+
"   fragColor=Ka*ambientColor+Kd*diffuse*diffuseColor;\n"+
"   gl_Position=  projectionMatrix *vertPosMinusProj;\n"+
"}\n";
/*
2. The gouraud vertex shader with specular illumination is below. 
*/
var vertexShaderCodeGouraudSpecular = 
"attribute vec3 norm;\n"+
"attribute vec3 position;\n" +
"attribute vec3 vertColor;\n" +
"varying vec3 fragColor;\n" +
"uniform mat4 worldMatrix;\n" +
"uniform mat4 viewMatrix;\n" +
"uniform float Ka;\n"+
"uniform float Kd;\n"+
"uniform float Ks;\n" + 
"uniform float n;\n" + 
"varying vec3 vec3Pos;\n" + 
"uniform vec3 ambientColor;\n" + 
"uniform vec3 diffuseColor;\n" + 
"uniform vec3 specularColor;\n" + 
"uniform vec3 lightPosition;\n" + 
"uniform mat4 projectionMatrix;\n" +
"varying float specular;\n" +
"void main() {\n"+
"   vec4 vertPosMinusProj =worldMatrix * viewMatrix*  vec4(position,1.0);\n" + 
"   vec3Pos = vec3(vertPosMinusProj)/ vertPosMinusProj.w;\n" + 
"   vec3 N = normalize(norm);\n" + 
"   vec3 L = normalize(lightPosition - vec3Pos);\n" +
"   float diffuse = max(dot(N, L), 0.0);\n"+
"   if(diffuse > 0.0) {\n"+
"   vec3 V = normalize(-vec3Pos);\n"+
"   vec3 reflected = reflect(-L, N);\n"+
"   float angle = max(dot(V, reflected), 0.0);\n"+
"   specular=pow(angle,n);\n"+
"   }\n"+
"   fragColor=Ka*ambientColor+Kd*diffuse*diffuseColor+Ks*specular*specularColor;\n"+
"   gl_Position=  projectionMatrix *vertPosMinusProj;\n"+
"}\n";
/*
3. The fragment shader for gouraud is shown below.
*/
var fragmentShaderCodeGouraud = 
"precision mediump float;\n" +
"varying vec3 fragColor;\n"+
"void main(){\n"+
"   gl_FragColor=vec4(fragColor,1.0);\n"+
"}\n";
/*
4. The vertex shader for phong is shown below.
*/
var vertexShaderCodePhong =
"attribute vec3 norm;\n"+
"attribute vec3 position;\n" +
"uniform mat4 worldMatrix;\n" +
"uniform mat4 viewMatrix;\n" +
"uniform mat4 projectionMatrix;\n" +
"varying vec3 vec3Pos;\n" +
"varying vec3 normalSurface;\n" + 
"void main(){\n"+
"   vec4 vertPosMinusProj =worldMatrix * viewMatrix*  vec4(position,1.0);\n"+
"   vec3Pos = vec3(vertPosMinusProj)/ vertPosMinusProj.w;\n" + 
"   normalSurface=norm;\n"+
"   gl_Position=projectionMatrix *vertPosMinusProj;\n"+
"}\n";
/*
5. The fragment shader for phong with diffuse illumination is shown below.
*/
var fragmentShaderCodePhongDiffuse=
"precision mediump float;\n" +
"varying vec3 vec3Pos;\n" +
"uniform float Ka;\n"+
"uniform float Kd;\n"+
"uniform float Ks;\n" + 
"uniform float n;\n" +
"varying vec3 normalSurface;\n" + 
"uniform vec3 ambientColor;\n" + 
"uniform vec3 diffuseColor;\n" + 
"uniform vec3 specularColor;\n" + 
"uniform vec3 lightPosition;\n" + 
"void main(){\n"+
"   vec3 N = normalize(normalSurface);\n" + 
"   vec3 L = normalize(lightPosition - vec3Pos);\n"+
"   float diffuse = max(dot(N, L), 0.0);\n"+
"   gl_FragColor=vec4(Ka*ambientColor+Kd*diffuse*diffuseColor,1.0);\n"+
"}\n";
/*
6. The fragment shader for phong with specular illumination is shown below.
*/
var fragmentShaderCodePhongSpecular = 
"precision mediump float;\n" +
"varying vec3 vec3Pos;\n" +
"uniform float Ka;\n"+
"uniform float Kd;\n"+
"uniform float Ks;\n" + 
"uniform float n;\n" +
"varying vec3 normalSurface;\n" + 
"uniform vec3 ambientColor;\n" + 
"uniform vec3 diffuseColor;\n" + 
"uniform vec3 specularColor;\n" + 
"uniform vec3 lightPosition;\n" + 
"void main(){\n"+
"   vec3 N = normalize(normalSurface);\n" + 
"   vec3 L = normalize(lightPosition - vec3Pos);\n"+
"   float diffuse = max(dot(N, L), 0.0);\n"+
"   float specular;\n" +
"   if(diffuse > 0.0) {\n"+
"   vec3 V = normalize(-vec3Pos);\n"+
"   vec3 R = reflect(-L, N);\n"+
"   float angle = max(dot(V, R), 0.0);\n"+
"   specular=pow(angle,n);\n"+
"   }\n"+
"   gl_FragColor=vec4(Ka*ambientColor+Kd*diffuse*diffuseColor+Ks*specular*specularColor,1.0);\n"+
"}\n";

var colorss;
var gl;
var program;
var arrayOfShapes = new Array(9);
var angle=0;
var identityMatrix = new Float32Array(16);
glMatrix.mat4.identity(identityMatrix);
var isNumberFrom1To9Clicked=false;
var numberOfShapeClicked;
var isCButtonClicked=false;
let v = 1.0;
var colorsss=[0.0,0.0,1.0]
var Ka=1.0;
var Kd=1.0;
var Ks=1.0;
var n =3.0;
var specularColor=[1.0,1.0,1.0];
var ambientColor=[0.0,0.0,0.0];
var diffuseColor=[0.0,0.7,0.5];
var lightPosition=[0.0,10.0,0.0];
var vertexShader;
var fragmentShader;
var isLButtonClicked=false;

function start() {
    initializeGL();
}
//Initialize the enviorment
function initializeGL() {

    let canvas = document.getElementById("canvas");
    gl =canvas.getContext("webgl");
    if(!gl)
    throw new Error('WebGL not supported');
    gl.clearColor(148/255,0,211/255,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    initializeShaders(vertexShaderCodeGouraudDiffuse,fragmentShaderCodeGouraud);
}
//Initializing shaders 
function initializeShaders(vertexShaderCode,fragmentShaderCode) {
vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader,vertexShaderCode);
gl.compileShader(vertexShader);
// console.log(gl.getShaderInfoLog(vertexShader));

fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader,fragmentShaderCode);
gl.compileShader(fragmentShader);
// console.log(gl.getShaderInfoLog(fragmentShader));
program =gl.createProgram();
gl.attachShader(program,vertexShader);
gl.attachShader(program,fragmentShader);
gl.linkProgram(program);

initializeObjects();
}
function changeShaders(vertexShaderNew,fragmentShaderNew){
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    initializeShaders(vertexShaderNew,fragmentShaderNew);
}
//Initializing Objects
function initializeObjects() {
    for(i=0;i<9;i++){
        
        arrayOfShapes[i]=new ObjCone();
        proccessObjFile(arrayOfShapes[i]);
        colorss=new Float32Array(arrayOfShapes[i].indices.length);
        for(j=0;j<(arrayOfShapes[i].indices.length);j+=3){
           colorss[j]=0.0;
           colorss[j+1]=0.0;
           colorss[j+2]=1.0;
        }

        //Basic Initializations
       
        arrayOfShapes[i].indicesBufferCord=gl.createBuffer();
        arrayOfShapes[i].positionLocation =gl.getAttribLocation(program,"position");
        arrayOfShapes[i].vertexBuffer=gl.createBuffer();
        arrayOfShapes[i].colorLocation=gl.getAttribLocation(program,"vertColor");
        arrayOfShapes[i].normalsLocation=gl.getAttribLocation(program,"norm");
        arrayOfShapes[i].normalsBuffer=gl.createBuffer();
        arrayOfShapes[i].colorBuffer=gl.createBuffer();
        arrayOfShapes[i].indexBuffer=gl.createBuffer();
        arrayOfShapes[i].kaLocation=gl.getUniformLocation(program,"Ka");
        arrayOfShapes[i].kdLocation=gl.getUniformLocation(program,"Kd");
        arrayOfShapes[i].ksLocation=gl.getUniformLocation(program,"Ks");
        arrayOfShapes[i].nLocation=gl.getUniformLocation(program,"n");
        arrayOfShapes[i].diffuseLocation=gl.getUniformLocation(program,"diffuseColor");
        arrayOfShapes[i].ambientLocation=gl.getUniformLocation(program,"ambientColor");
        arrayOfShapes[i].specularLocation=gl.getUniformLocation(program,"specularColor");
        arrayOfShapes[i].lightLocation=gl.getUniformLocation(program,"lightPosition");
        //Matrices Initializations
        arrayOfShapes[i].worldMatrix=glMatrix.mat4.create();
        arrayOfShapes[i].worldMatrixCoordinates=gl.getUniformLocation(program,"worldMatrix");

        arrayOfShapes[i].viewMatrix=glMatrix.mat4.create();
        arrayOfShapes[i].viewMatrixCoordinates=gl.getUniformLocation(program,"viewMatrix");
        /*Source (https://www.youtube.com/watch?v=L6Z0PLhZots)
        Timestamp: (17:05)
        Lines cited: 166-172
        I got the idea from the tutorial for the WebGL, as the i is incrementing we are pushing objects to the left.
        Additionally if the i is even the object will be in the first row, if not it will be in the second row.
        */
        if(i%2 == 0){
            glMatrix.mat4.translate(arrayOfShapes[i].viewMatrix,arrayOfShapes[i].viewMatrix,glMatrix.vec3.fromValues(-7+i*2,2,-4));
        }
        else 
        {
            glMatrix.mat4.translate(arrayOfShapes[i].viewMatrix,arrayOfShapes[i].viewMatrix,glMatrix.vec3.fromValues(-7+i*2,-2,-4)); 
        }
        arrayOfShapes[i].projectionMatrix=glMatrix.mat4.create();
        arrayOfShapes[i].projectionMatrixCoordinates=gl.getUniformLocation(program,"projectionMatrix");
        glMatrix.mat4.perspective(arrayOfShapes[i].projectionMatrix,glMatrix.glMatrix.toRadian(45),1000/500,0.1,1000.0);
        glMatrix.mat4.translate(arrayOfShapes[i].projectionMatrix,arrayOfShapes[i].projectionMatrix,glMatrix.vec3.fromValues(0,0,-20));
    }
    drawShapes();
}
//All of the logic for clicking the keyboard is in this function.We are adding keylistener for the keydown which  means when some key 
//is pressed it will be triggered.
document.addEventListener('keydown', function(event) { 
    if(event.keyCode == 76){ // L is pressed
        isLButtonClicked=!isLButtonClicked;
    }
    if(event.keyCode == 85)  //Gouraud/diffuse is selected 
    {
        changeShaders(vertexShaderCodeGouraudDiffuse,fragmentShaderCodeGouraud);
    }
   
    if(event.keyCode == 73) //Gouraud/specular is selected
    {  
        changeShaders(vertexShaderCodeGouraudSpecular,fragmentShaderCodeGouraud);
    }
    if(event.keyCode == 79) //Phong/diffuse is selected
    {
        changeShaders(vertexShaderCodePhong,fragmentShaderCodePhongDiffuse);
    }
    if(event.keyCode == 80) //Phong/specular is selected
    {
        changeShaders(vertexShaderCodePhong,fragmentShaderCodePhongSpecular);
    }
    if(event.keyCode == 48) { // 0 is clicked
        isNumberFrom1To9Clicked=false;
    }
    if(event.keyCode == 67) //c is clicked
    {   
        if(isCButtonClicked)
        {
            isNumberFrom1To9Clicked=false;
            isLButtonClicked=false;
        }
        isCButtonClicked=!isCButtonClicked;
    }
    if(event.keyCode>=49 && event.keyCode<=57)  // 1-9 is clicked
    {
        isNumberFrom1To9Clicked=true;
        numberOfShapeClicked=event.keyCode-49;
    }
    if(event.keyCode == 37){  //Arrow left is clicked 
        if(isLButtonClicked)
        {
            lightPosition[0]-=1.0;
        }
        else if(isNumberFrom1To9Clicked && !isCButtonClicked)
        {
            glMatrix.mat4.translate(arrayOfShapes[numberOfShapeClicked].worldMatrix,arrayOfShapes[numberOfShapeClicked].worldMatrix,glMatrix.vec3.fromValues(-1,0,0));
        }
        else if(!isNumberFrom1To9Clicked && !isCButtonClicked)
        {
            for(i=0;i<arrayOfShapes.length;i++)
                glMatrix.mat4.translate(arrayOfShapes[i].worldMatrix,arrayOfShapes[i].worldMatrix,glMatrix.vec3.fromValues(-1,0,0));
        }
        else 
        {   
             /*Source (https://www.youtube.com/watch?v=L6Z0PLhZots)
            Lines cited: 216-226
            We are creating the cameraMatrix and we rotate around Y so we can get the feeling that camera is moving on the x axis,
            then we are multiplying with the projectionMatrix of the object and then in each turn we are adding 5 to the Z coordinate to
            get the feeling of the moving in depth.
            */
            let cameraMatrix = glMatrix.mat4.create();
            glMatrix.mat4.rotateY(cameraMatrix,cameraMatrix,0.05*Math.sin(v));
            glMatrix.mat4.translate(cameraMatrix,cameraMatrix,[0,0,5]);
            let cameraViewMatrix=glMatrix.mat4.create();
            glMatrix.mat4.invert(cameraViewMatrix,cameraMatrix);
            let viewProjectionMatrix=glMatrix.mat4.create();
            glMatrix.mat4.multiply(viewProjectionMatrix,arrayOfShapes[0].projectionMatrix,cameraViewMatrix);
            for(i=0;i<arrayOfShapes.length;i++)
            {
                glMatrix.mat4.translate(arrayOfShapes[i].projectionMatrix,viewProjectionMatrix,[0,0,5]);
            }


        }

    }
    if(event.keyCode == 39){  //Arrow right is clicked
        if(isLButtonClicked)
        {
            lightPosition[0]+=1.0;
        } 
        else if(isNumberFrom1To9Clicked  && !isCButtonClicked)
        {
            glMatrix.mat4.translate(arrayOfShapes[numberOfShapeClicked].worldMatrix,arrayOfShapes[numberOfShapeClicked].worldMatrix,glMatrix.vec3.fromValues(1,0,0));
        }
        else if (!isNumberFrom1To9Clicked && !isCButtonClicked)
        {
            for(i=0;i<arrayOfShapes.length;i++)
            glMatrix.mat4.translate(arrayOfShapes[i].worldMatrix,arrayOfShapes[i].worldMatrix,glMatrix.vec3.fromValues(1,0,0));
        }
        else 
        {   
             /*Source (https://www.youtube.com/watch?v=L6Z0PLhZots)
            Lines cited: 250-260
            We are creating the cameraMatrix and we rotate around Y so we can get the feeling that camera is moving on the x axis,
            then we are multiplying with the projectionMatrix of the object and then in each turn we are adding 5 to the Z coordinate to
            get the feeling of the moving in depth.We are doing sin from -v to go in the opposite direction.
            */
            let cameraMatrix = glMatrix.mat4.create();
            glMatrix.mat4.rotateY(cameraMatrix,cameraMatrix,0.05*Math.sin(-v));
            glMatrix.mat4.translate(cameraMatrix,cameraMatrix,[0,0,5]);
            let cameraViewMatrix=glMatrix.mat4.create();
            glMatrix.mat4.invert(cameraViewMatrix,cameraMatrix);
            let viewProjectionMatrix=glMatrix.mat4.create();
            glMatrix.mat4.multiply(viewProjectionMatrix,arrayOfShapes[0].projectionMatrix,cameraViewMatrix);
            for(i=0;i<arrayOfShapes.length;i++)
            {
                glMatrix.mat4.translate(arrayOfShapes[i].projectionMatrix,viewProjectionMatrix,[0,0,5]);
            }


        }
    
    }
    if(event.keyCode == 38){ //Arrow up is clicked
        if(isLButtonClicked)
        {
            lightPosition[1]+=1.0;
        }
        else if(isNumberFrom1To9Clicked  && !isCButtonClicked)
        {
            glMatrix.mat4.translate(arrayOfShapes[numberOfShapeClicked].worldMatrix,arrayOfShapes[numberOfShapeClicked].worldMatrix,glMatrix.vec3.fromValues(0,1,0));
        }
        else if(!isNumberFrom1To9Clicked && !isCButtonClicked)
        {
            for(i=0;i<arrayOfShapes.length;i++)
            glMatrix.mat4.translate(arrayOfShapes[i].worldMatrix,arrayOfShapes[i].worldMatrix,glMatrix.vec3.fromValues(0,1,0));
        }
        else 
        {
            let cameraMatrix = glMatrix.mat4.create();
            glMatrix.mat4.rotateX(cameraMatrix,cameraMatrix,0.05*Math.sin(-v));
            glMatrix.mat4.translate(cameraMatrix,cameraMatrix,[0,0,5]);
            let cameraViewMatrix=glMatrix.mat4.create();
            glMatrix.mat4.invert(cameraViewMatrix,cameraMatrix);
            let viewProjectionMatrix=glMatrix.mat4.create();
            glMatrix.mat4.multiply(viewProjectionMatrix,arrayOfShapes[0].projectionMatrix,cameraViewMatrix);
            for(i=0;i<arrayOfShapes.length;i++)
            {
                glMatrix.mat4.translate(arrayOfShapes[i].projectionMatrix,viewProjectionMatrix,[0,0,5]);
            }
        }
        event.preventDefault(); //When clicking arrow up to not scroll up  on the page
    }
        if(event.keyCode == 40){ //Arrow down is clicked
            if(isLButtonClicked)
            {
                lightPosition[1]-=1.0;
            }
            else if(isNumberFrom1To9Clicked  && !isCButtonClicked)
            {
                glMatrix.mat4.translate(arrayOfShapes[numberOfShapeClicked].worldMatrix,arrayOfShapes[numberOfShapeClicked].worldMatrix,glMatrix.vec3.fromValues(0,-1,0));
            }
            else if(!isNumberFrom1To9Clicked && !isCButtonClicked)
            {
                for(i=0;i<arrayOfShapes.length;i++)
                glMatrix.mat4.translate(arrayOfShapes[i].worldMatrix,arrayOfShapes[i].worldMatrix,glMatrix.vec3.fromValues(0,-1,0));
            }
            else 
            {
                let cameraMatrix = glMatrix.mat4.create();
                glMatrix.mat4.rotateX(cameraMatrix,cameraMatrix,0.05*Math.sin(v));
                glMatrix.mat4.translate(cameraMatrix,cameraMatrix,[0,0,5]);
                let cameraViewMatrix=glMatrix.mat4.create();
                glMatrix.mat4.invert(cameraViewMatrix,cameraMatrix);
                let viewProjectionMatrix=glMatrix.mat4.create();
                glMatrix.mat4.multiply(viewProjectionMatrix,arrayOfShapes[0].projectionMatrix,cameraViewMatrix);
                for(i=0;i<arrayOfShapes.length;i++)
                {
                    glMatrix.mat4.translate(arrayOfShapes[i].projectionMatrix,viewProjectionMatrix,[0,0,5]);
                }
            }
            event.preventDefault(); //When clicking arrow down to not scroll down  on the page
        }
        if(event.keyCode == 188){ //, is clicked
            if(isLButtonClicked){
                lightPosition[2]+=1.0;
            }
            else if(isNumberFrom1To9Clicked)
            {
                glMatrix.mat4.translate(arrayOfShapes[numberOfShapeClicked].worldMatrix,arrayOfShapes[numberOfShapeClicked].worldMatrix,glMatrix.vec3.fromValues(0,0,1));
            }
            else 
            {
                for(i=0;i<arrayOfShapes.length;i++)
                glMatrix.mat4.translate(arrayOfShapes[i].worldMatrix,arrayOfShapes[i].worldMatrix,glMatrix.vec3.fromValues(0,0,1));
            }
        }
        if(event.keyCode == 190){ //. is clicked
            if(isLButtonClicked)
            {
                lightPosition[2]-=1.0;
            }
            else if(isNumberFrom1To9Clicked)
            {
                glMatrix.mat4.translate(arrayOfShapes[numberOfShapeClicked].worldMatrix,arrayOfShapes[numberOfShapeClicked].worldMatrix,glMatrix.vec3.fromValues(0,0,-1));
            }
            else 
            {
                for(i=0;i<arrayOfShapes.length;i++)
                glMatrix.mat4.translate(arrayOfShapes[i].worldMatrix,arrayOfShapes[i].worldMatrix,glMatrix.vec3.fromValues(0,0,-1));
            }
        }      
    
});
/*
In this function we are drawing the shapes.
*/
function drawShapes(){
    gl.clearColor(148/255,0,211/255,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for(i=0;i<arrayOfShapes.length;i++){
        
        gl.enableVertexAttribArray(arrayOfShapes[i].colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER,arrayOfShapes[i].colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,colorss,gl.STATIC_DRAW);
        gl.vertexAttribPointer(arrayOfShapes[i].colorLocation,3, gl.FLOAT,gl.FALSE,3* Float32Array.BYTES_PER_ELEMENT,0* Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(arrayOfShapes[i].positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER,arrayOfShapes[i].vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(arrayOfShapes[i].coordinates),gl.STATIC_DRAW);
        gl.vertexAttribPointer(arrayOfShapes[i].positionLocation,3,gl.FLOAT,gl.FALSE,3 * Float32Array.BYTES_PER_ELEMENT,0);
        gl.useProgram(program);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,arrayOfShapes[i].indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(arrayOfShapes[i].indices),gl.STATIC_DRAW);
        // console.log(arrayOfShapes[i].coordinates.length);
        // console.log(arrayOfShapes[i].normals.length)
        gl.enableVertexAttribArray(arrayOfShapes[i].normalsLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER,arrayOfShapes[i].normalsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(arrayOfShapes[i].normals),gl.STATIC_DRAW);
        gl.vertexAttribPointer(arrayOfShapes[i].normalsLocation,3,gl.FLOAT,gl.FALSE,3* Float32Array.BYTES_PER_ELEMENT,0);
        gl.uniform1f(arrayOfShapes[i].kaLocation,Ka);
        gl.uniform1f(arrayOfShapes[i].kdLocation,Kd);   
        gl.uniform1f(arrayOfShapes[i].ksLocation,Ks);
        gl.uniform1f(arrayOfShapes[i].nLocation,n);
        gl.uniform3fv(arrayOfShapes[i].diffuseLocation,diffuseColor);
        gl.uniform3fv(arrayOfShapes[i].specularLocation,specularColor);
        gl.uniform3fv(arrayOfShapes[i].ambientLocation,ambientColor);
        gl.uniform3fv(arrayOfShapes[i].lightLocation,lightPosition);
        gl.uniformMatrix4fv(arrayOfShapes[i].worldMatrixCoordinates,false,arrayOfShapes[i].worldMatrix);
        gl.uniformMatrix4fv(arrayOfShapes[i].viewMatrixCoordinates,false,arrayOfShapes[i].viewMatrix);
        gl.uniformMatrix4fv(arrayOfShapes[i].projectionMatrixCoordinates,false,arrayOfShapes[i].projectionMatrix);

        gl.drawElements(gl.TRIANGLES,arrayOfShapes[i].indices.length,gl.UNSIGNED_SHORT,0);
    }
}
    function loop() { 
        drawShapes();
        requestAnimationFrame(loop);
    }
        requestAnimationFrame(loop);
    /*
    This function is for proccessing OBJ files where i am dividing the lines by its purpose.v ----- for vertices, vn ----- for normals
    and f ---- for faces.
    */
    function proccessObjFile(theObject){
        var temp1 = new Array();
        temp1 = theObject.coneFile.split('\n');

        for (k = 0; k < temp1.length; k++) {
            temp1[k]=temp1[k].trim();
        }
        var vertices = new Array();
        var normalsV = new Array();
        var faces = new Array();
        var j = 0;
        var k = 0;
        var g = 0;
        for (s = 0; s < temp1.length; s++) {
            if (temp1[s].startsWith("v ")) {
                var tempVertices = temp1[s].split(" ");
                for (var p = 1; p < tempVertices.length; p++) {
                    vertices[j] = parseFloat(tempVertices[p]);
                    j++;
                }
            }
            else if (temp1[s].startsWith("vn")) {
                var tempVertices1 = temp1[s].split(" ");
                for (var p = 1; p < tempVertices1.length; p++) {
                    normalsV[k] = parseFloat(tempVertices1[p]);
                    k++;
                }
            }
            else if (temp1[s].startsWith("f")) {
                var tempVertices2 = temp1[s].split(" ");
                for (var p = 1; p < tempVertices2.length; p++) {
                    faces[g] = parseInt(tempVertices2[p].split("//")[0]);
                    g++;
                }
            }
        }

        for(x=0;x<faces.length;x++){
            faces[x]--;
        }
        for(x=1;x<vertices.length;x+=3)
        {
            vertices[x]-=2.0;
        }
        theObject.coordinates=vertices;
        theObject.normals=normalsV;
        theObject.indices=faces;

    }

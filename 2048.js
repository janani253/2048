var randx,randy,randno;
var vals=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var score=0;
var prevvals=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

//Count no of empty elements
function countEmpty() {
 count=0;
 for(i=0;i<4;i++)
  for(j=0;j<4;j++)
   if(vals[i][j]==0) count++;
 return count;
}

function cpvals()
{
 for(i=0;i<4;i++)
  for(j=0;j<4;j++)
   prevvals[i][j]=vals[i][j];
}

function cmpvals()
{
 for(i=0;i<4;i++)
  for(j=0;j<4;j++)
   if(prevvals[i][j]!=vals[i][j]) return 0;
 return 1;
}

// Generate a random no
function genRandNo(factor) {
 var randno=Math.floor(Math.random()*10)%factor;
 randno*=2;
 return randno;
}

// Generate random coordinates
function genRandXY() {
 randx=Math.floor(Math.random()*10)%4;
 randy=Math.floor(Math.random()*10)%4;
 if(vals[randx][randy]!=0) genRandXY();
}

function fillRandNo() {
 count=countEmpty();
 if(count!=0) {
  randno=genRandNo(3);
  genRandXY();
  vals[randx][randy]=randno;
  if(randno!=0) writeNewNum(randx,randy,randno);
 }
}

function writeAllNum() {
 for(i=0;i<4;i++)
  for(j=0;j<4;j++)
   if(vals[i][j]!=0) writeNum(i,j,vals[i][j]);
   else hide0(i,j);
}

function hide0(x,y) {
 posclass="pos"+x+y;
 document.getElementById(posclass).innerHTML="";
 document.getElementById(posclass).className="smallframe "+posclass;
}

function writeNewNum(x,y,no) {
 if(no!=0) {
 if(no<10) { sizeclass="newnum1"; }
 else if(no<100) { sizeclass="newnum2"; }
 else if(no<1000) { sizeclass="newnum3"; }
 else { sizeclass="newnum4"; }

 posclass="pos"+x+y;
 document.getElementById(posclass).className="smallframe "+posclass+" "+sizeclass;
 document.getElementById(posclass).innerHTML=no;
}
}

function writeNum(x,y,no) {
 if(no!=0) {
 if(no<10) { sizeclass="num1"; }
 else if(no<100) { sizeclass="num2"; }
 else if(no<1000) { sizeclass="num3"; }
 else { sizeclass="num4"; }

 posclass="pos"+x+y;
 document.getElementById(posclass).className="smallframe "+posclass+" "+sizeclass;
 document.getElementById(posclass).innerHTML=no;
}
}

function moveNum(x1,y1,x2,y2,no) {
 if(no!=0) {
 if(no<10) { sizeclass="num1"; }
 else if(no<100) { sizeclass="num2"; }
 else if(no<1000) { sizeclass="num3"; }
 else { sizeclass="num4"; }

 if(x1!=x2) { moveclass="mvx"+x1+x2;}
 else if(y1!=y2) { moveclass="mvy"+y1+y2;}
 posclass="pos"+x2+y2;
 document.getElementById(posclass).innerHTML=no;
 document.getElementById(posclass).className="smallframe "+posclass+" "+sizeclass+" "+moveclass;
}
}

function moveLeft()
{
 for(i=0;i<4;i++)  
  for(j=0;j<4;j++)
   for(k=j+1;k<4;k++)
   {
    if(vals[j][i]==0) 
    {
     vals[j][i]=vals[k][i];
     moveNum(k,i,j,i,vals[k][i]);
     
     vals[k][i]=0;
     hide0(k,i);
    }  
    else if(vals[j][i]==vals[k][i]) 
    {
     vals[j][i]+=vals[k][i];
     score+=vals[j][i];
     moveNum(k,i,j,i,vals[k][i]);
     moveNum(k,i,j,i,vals[j][i]);
     vals[k][i]=0;
     hide0(k,i);
    // writeNum(j,i,vals[j][i]);
     break;    
    }
    else if(vals[k][i]!=0) break;
   }   
}

function moveUp()
{
 for(j=0;j<4;j++)
  for(i=0;i<4;i++)
   for(k=i+1;k<4;k++)
   {
    if(vals[j][i]==0) 
    {
     vals[j][i]=vals[j][k];
     moveNum(j,k,j,i,vals[j][k]);
     vals[j][k]=0;
     hide0(j,k);
    }  
    else if(vals[j][i]==vals[j][k]) 
    {
     vals[j][i]+=vals[j][k];
     score+=vals[j][i];
     moveNum(j,k,j,i,vals[j][k]);
     moveNum(j,k,j,i,vals[j][i]);
     vals[j][k]=0;
     hide0(j,k);
     //writeNum(j,i,vals[j][i]);
     break;    
    }
    else if(vals[j][k]!=0) break;
   }   
}

function moveRight()
{
 for(i=0;i<4;i++)
  for(j=3;j>=0;j--)
   for(k=j-1;k>=0;k--)
   {
    if(vals[j][i]==0) 
    {
     vals[j][i]=vals[k][i];
     moveNum(k,i,j,i,vals[k][i]);
     vals[k][i]=0;
     hide0(k,i);
    }  
    else if(vals[j][i]==vals[k][i]) 
    {
     vals[j][i]+=vals[k][i];
     score+=vals[j][i];
     moveNum(k,i,j,i,vals[k][i]);
     moveNum(k,i,j,i,vals[j][i]);
     vals[k][i]=0;
     hide0(k,i);
     //writeNum(j,i,vals[j][i]);
     break;    
    }
    else if(vals[k][i]!=0) break;
   }   
}

function moveDown()
{
 for(j=0;j<4;j++)
  for(i=3;i>=0;i--)
   for(k=i-1;k>=0;k--)
   {
    if(vals[j][i]==0) 
    {
     vals[j][i]=vals[j][k];
     score+=vals[j][i];
     moveNum(j,k,j,i,vals[j][k]);
     vals[j][k]=0;
     hide0(j,k);
    }  
    else if(vals[j][i]==vals[j][k]) 
    {
     vals[j][i]+=vals[j][k];
     moveNum(j,k,j,i,vals[j][k]);
     moveNum(j,k,j,i,vals[j][i]);
     vals[j][k]=0;
     hide0(j,k);
     break;    
    }
    else if(vals[j][k]!=0) break;
   }   
}

function keypress(e) {
 cpvals();
 if(e.keyCode==37) moveLeft();
 else if(e.keyCode==38) moveUp();
 else if(e.keyCode==39) moveRight();
 else if(e.keyCode==40) moveDown();
 n=genRandNo(3)/2;
 if(n==1) { fillRandNo(3); } 
 else if(n==2) { fillRandNo(3); fillRandNo(3); }
 if((cmpvals()!=0) && (countEmpty()==0)) alert("Game Over!\nYour Score: "+score);
// writeAllNum();
}

/*
@title: Gravity is a Thing
@description: "Gravity is a Thing" is a puzzle platformer game where players navigate through levels by jumping on boxes to reach a trophy. The challenge is to avoid orange lava boxes, which reset the level upon contact, and use strategic jumps to overcome obstacles.
@author: Will_Rigney
@tags: ['puzzle']
@addedOn: 2022-09-30
*/

//W to jump
//A to move left
//D to move right
//S to move down
//J to restart
//Press I while on the trophy to move on to the next level 
//Get to the trophey by jumping on the boxes
//orange boxes are lava and if you fall in the level is restet 



const melody = tune`
201.34228187919464: b4^201.34228187919464,
201.34228187919464: d5^201.34228187919464,
201.34228187919464: a4^201.34228187919464,
201.34228187919464: f5^201.34228187919464,
201.34228187919464: b4^201.34228187919464,
201.34228187919464: e4^201.34228187919464,
201.34228187919464: g4^201.34228187919464,
201.34228187919464: d4^201.34228187919464,
201.34228187919464: b4^201.34228187919464,
201.34228187919464: e4^201.34228187919464,
201.34228187919464: e5^201.34228187919464,
201.34228187919464: g5^201.34228187919464,
201.34228187919464: d5^201.34228187919464,
201.34228187919464: b5^201.34228187919464,
201.34228187919464: e5^201.34228187919464,
201.34228187919464: b4~201.34228187919464,
201.34228187919464: d5~201.34228187919464,
201.34228187919464: a4~201.34228187919464,
201.34228187919464: f5~201.34228187919464,
201.34228187919464: b4~201.34228187919464,
201.34228187919464: e4~201.34228187919464,
201.34228187919464: g4~201.34228187919464,
201.34228187919464: d4~201.34228187919464,
201.34228187919464: b4~201.34228187919464,
201.34228187919464: e4~201.34228187919464,
201.34228187919464: e5/201.34228187919464,
201.34228187919464: g5/201.34228187919464,
201.34228187919464: d5/201.34228187919464,
201.34228187919464: b5/201.34228187919464,
201.34228187919464: e5/201.34228187919464,
402.6845637583893`;
const player = "q";
const wall = 'w';
const platforms = "e";
const finish = "r";
const youWin = 't';
const downArrow = 'u';
const upArrow = 'i';
const rightArrow = 'o';
const leftArrow = 'p';
const lava = 'a';
const level1 = 's'; 
const level2 = 'd';
const one = 'f';
const two = 'g';
const three = 'h';
const four = 'j';
const five = 'k';
const invisible = 'l';
const six = 'z';

//maps and sprites
setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
.....C....C.....
.....C0022C.....
...0000222222...
....02222222....
.....202202.....
.....888888.....
....88C88C88....
....88C88C88....
.....888888.....`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ finish, bitmap`
....000000000...
....066666660...
....066666660...
.000066666660000
.066066666660660
.066066666660660
.006066666660600
..0006666666000.
....006666600...
.....0066600....
......00600.....
.......060......
.......060......
......00600.....
.....0666660....
.....0000000....`],
  [ youWin, bitmap`
................
................
................
0...0..00..0..0.
.0.0..0..0.0..0.
..0...0..0.0..0.
..0...0..0.0..0.
..0....00...00..
................
................
0...0.000.0...0.
0...0..0..00..0.
0...0..0..0.0.0.
0...0..0..0.0.0.
0.0.0..0..0..00.
.0.0......0...0.`],
  [ downArrow, bitmap`
......000.......
......000.......
......000.......
......000.......
......000.......
......000.......
......000.......
......000.......
...000000000....
..00000000000...
...000000000....
....0000000.....
.....00000......
......000.......
.......0........
................`],
  [ upArrow, bitmap`
................
................
........0.......
.......000......
......00000.....
.....0000000....
....000000000...
.....0000000....
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......
.......000......`],
  [ rightArrow, bitmap`
................
................
................
................
.........0......
........000.....
........0000....
0000000000000...
00000000000000..
0000000000000...
........0000....
........000.....
.........0......
................
................
................`],
  [ leftArrow, bitmap`
................
................
................
................
......0.........
.....000........
....0000........
...0000000000000
..00000000000000
...0000000000000
....0000........
.....000........
......0.........
................
................
................`],
  [ lava, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [ level1, bitmap`
................
................
................
0....0000..0...0
0....0.....0...0
0....0.....0...0
0....0......0.0.
0....0000...0.0.
0....0......0.0.
0....0......0.0.
0....0......0.0.
0000.0000....0..
................
................
................
................`],
  [ level2, bitmap`
................
................
................
0000.0..........
0....0..........
0....0..........
0....0..........
0....0..........
000..0..........
0....0..........
0....0..........
0000.0000.......
................
................
................
................`],
  [ one, bitmap`
................
................
................
.00.............
0.0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
00000...........
................
................
................
................`],
  [ two, bitmap`
................
................
................
.000............
0...0...........
....0...........
....0...........
..00............
.0..............
0...............
0...............
00000...........
................
................
................
................`],
  [ three, bitmap`
................
................
................
000.............
...0............
...0............
...0............
000.............
...0............
...0............
...0............
000.............
................
................
................
................`],
  [ four, bitmap`
................
................
................
................
0..0............
0..0............
0..0............
0000............
...0............
...0............
...0............
...0............
................
................
................
................`],
  [ five, bitmap`
................
................
................
................
00000...........
0...............
0...............
0000............
....0...........
....0...........
0...0...........
.000............
................
................
................
................`],
  [ invisible, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
1111111111111111`],
  [ six, bitmap`
................
................
................
.0000...........
0....0..........
0...............
0...............
000000..........
0....0..........
0....0..........
0....0..........
.0000...........
................
................
................
................`]
);

const levels = [map`
...sd.f...
..........
..........
....lll..r
q.l.www..w
llwaaaaaaa`,
                map`
...sd.g...
.....l.llr
...l.w.www
..lw......
qlw.......
lwaaaaaaaa`,
                map`
...sd.h...
...ll..l..
...ww..w.r
..l......w
q.w.......
llaaaaaaaa`,
                map`
...sd.j.lr
....w.u.ww
...la..laa
...w...waa
q.la..laaa
llwlllwaaa`,
                map`
.....sdlklllll.
...l..wwwwwwww.
l..w...........
w..l..........r
...w..l.......w
......w..l.....
.........w..l..
q.ll...llll.w..
lawwaaawwwwaaaa`,
                map`
..........sd.zl..........r
.......l..wwwww..l........
....l..w.........w..l....l
....w...............w..l.w
..l.......lllll........w..
..w......lwwwwwl..........
l.....l..w.....w..l.......
w..l..w...........w..l....
...w......lllll......w..l.
.......l..wwwww..l......w.
....l..w.........w..l..lw.
ql..w...............w..ww.
lwaaaaaaaaaaaaaaaaaaaaawaa`,
                map`
tqtqtqtqtq
qtqtqtqtqt
tqtqtqtqtq
qtqtqtqtqt
tqtqtqtqtq
qtqtqtqtqt`]
let level = 0;
setMap(levels[0]);

let deaths = 0;
let jumps = 2;

//movement

onInput("w", () => {
    if (jumps > 0){
    getFirst(player).y -=2;
    jumps -= 1;
    }
})
  
onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("j", () => {
  setMap(levels[level]);
  deaths++;
  jumps = 2;
});
setSolids([player, wall, youWin]);


//Gravity 

const jump = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;

    getFirst(player).y--;


    await wait(100);
  }, Promise.resolve());

  await resetGravity();
};
setInterval(() => {
  if (getFirst(player).y === 10) return;

  getFirst(player).y++;
}, 200);

//complete level
onInput("i", () => {
  let finishLocation = tilesWith(finish, player).length;
  let playerLocation = tilesWith(player).length;
  if (finishLocation === playerLocation){
      level++;
      setMap(levels[level]);
      jumps = 2;
  }
})

//lava 
afterInput(() => {
  let lavaLocation = tilesWith(lava, player).length;
  let playerLocation = tilesWith(player).length;
  if (lavaLocation === playerLocation){
      setMap(levels[level]);
      deaths++
      jumps = 2;
  }
})

//double jump (maybe make a jump cooldown)
afterInput(() => {
  let invisibleLocation = tilesWith(invisible, player).length; 
  let playerLocation = tilesWith(player).length;
  if (invisibleLocation === 1){
    jumps = 2;
  }
})

//death counter
afterInput(() => {
  addText("Deaths: " + deaths , {
    x: 0,
    y: 15, 
    color: color`3`
  })
})

//jump counter 
afterInput(() => {
  addText("Jumps: " + jumps , {
    x: 12,
    y: 15, 
    color: color`3`
  })
})

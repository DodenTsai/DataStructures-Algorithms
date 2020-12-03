/**
 * @param {Robot} robot
 * @return {void}
 */
var cleanRoom = function(robot) {
  // 初始化一个 set 结构来存储清扫过的坐标
  var boxSet =  new Set();
  // 初始化机器人的朝向
  var dir = 0;
  // 进入 dfs
  dfs(robot, boxSet, 0, 0, 0);

  // 定义 dfs  
  function dfs (robot, boxSet, i, j, dir) {
    // 记录当前格子的坐标
    var box = i + '+' + j;
    // 如果已经打扫过，那么跳过
    if (boxSet.has(box)) return;
    // 打扫当前这个格子
    robot.clean();  
    // 记住这个格子
    boxSet.add(box);

    // 四个方向试探
    for (let k = 0; k < 4; k++) {
      // 如果接下来前进的目标方向不是障碍物（也就意味着可以打扫）
      if (robot.move()) {
        // 从当前格子出发，试探上右左下
        let x = i, y = j;
        // 处理角度和坐标的对应关系
        switch (dir) {
          case 0:   
            x = i - 1;
            break;
          case 90: 
            y = j + 1; 
            break;
          case 180: 
            x = i + 1;  
            break;  
          case 270: 
            y = j - 1;
            break;   
          default:
            break;
        }
        dfs(robot, boxSet, x, y, dir);
        // 一个方向的dfs结束了，意味着撞到了南墙，此时我们需要回溯到上一个格子 
        robot.turnLeft();
        robot.turnLeft();
        robot.move();
        robot.turnRight();
        robot.turnRight();
      }
      // 转向 
      robot.turnRight();
      dir += 90;
      dir %= 360;
    }
  }
}
const $ = (e) => document.querySelector(e);

const flow = new Flow();

let loaded = true;
let save = localStorage.getItem("flow-save");
if (save != null) {
  loaded = false;
  save = JSON.parse(save);
  for (let b in save.boxes) {
    let box = flow.addBox(save.boxes[b].type, b);
    box.out = save.boxes[b].out;
    box.in = save.boxes[b].in;
    box.x = save.boxes[b]._x;
    box.y = save.boxes[b]._y;
    box.value = save.boxes[b].value;
    let input = box.el.querySelector("input");
    if (input) {
      input.value = save.boxes[b].value;
      flow.resizeInput(input);
    }
  }
  for (let b in flow.boxes) {
    flow.boxes[b].out.forEach((id) => {
      let arrow = flow.addArrow(flow.boxes[b].id, save.arrows[id].outN, flow.boxes[b].el.querySelector(".dotrow.bottom").children[save.arrows[id].outN], id);
      arrow.in = save.arrows[id].in;
    });
  }
  flow.activeArrow = undefined;
  for (let b in flow.boxes) {
    flow.updateArrows(flow.boxes[b].id);
  }
} else {
  let center = window.innerWidth / 2;

  let start = flow.addBox("start");
  let end = flow.addBox("end");

  start.x = end.x = center - 100;
  start.y = 90;
  end.y = 400;
}


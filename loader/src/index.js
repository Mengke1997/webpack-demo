// require('inline1-loader!inline2-loader!./title')
// console.log(11);
// let arrow = () => {
//   console.log('arrow')
// }
// arrow()


let logoSrc=require('./images/6.jpeg')
let image=new Image()
image.src=logoSrc
document.body.appendChild(image)